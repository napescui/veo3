import { Router } from 'express';
import multer from 'multer';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const router = Router();

// Configure multer for video uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'));
    }
  }
});

const unlink = promisify(fs.unlink);

router.post('/merge-videos', upload.fields([
  { name: 'video1', maxCount: 1 },
  { name: 'video2', maxCount: 1 }
]), async (req, res) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  
  if (!files.video1?.[0] || !files.video2?.[0]) {
    return res.status(400).json({ error: 'Both video files are required' });
  }

  const video1Path = files.video1[0].path;
  const video2Path = files.video2[0].path;
  const outputPath = path.join('uploads', `merged-${Date.now()}.mp4`);
  
  try {
    // Create a concat file list for ffmpeg
    const concatListPath = path.join('uploads', `concat-${Date.now()}.txt`);
    const concatContent = `file '${path.resolve(video1Path)}'
file '${path.resolve(video2Path)}'`;
    
    fs.writeFileSync(concatListPath, concatContent);

    // Use ffmpeg to concatenate videos
    await new Promise<void>((resolve, reject) => {
      ffmpeg()
        .input(concatListPath)
        .inputOptions(['-f', 'concat', '-safe', '0'])
        .outputOptions([
          '-c', 'copy', // Copy streams without re-encoding for speed
          '-avoid_negative_ts', 'make_zero'
        ])
        .output(outputPath)
        .on('progress', (progress) => {
          console.log(`Processing: ${progress.percent}% done`);
        })
        .on('end', () => {
          console.log('Video merge completed');
          resolve();
        })
        .on('error', (err) => {
          console.error('FFmpeg error:', err);
          reject(err);
        })
        .run();
    });

    // Send the merged video file
    res.sendFile(path.resolve(outputPath), (err) => {
      if (err) {
        console.error('Error sending file:', err);
        return;
      }

      // Clean up temporary files
      Promise.all([
        unlink(video1Path),
        unlink(video2Path),
        unlink(concatListPath),
        unlink(outputPath)
      ]).catch(console.error);
    });

  } catch (error) {
    console.error('Video merge error:', error);
    
    // Clean up files on error
    Promise.all([
      unlink(video1Path),
      unlink(video2Path)
    ]).catch(console.error);

    res.status(500).json({ 
      error: 'Failed to merge videos',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;