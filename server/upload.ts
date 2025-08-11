import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'uploads');
    try {
      await fs.mkdir(uploadPath, { recursive: true });
      cb(null, uploadPath);
    } catch (error) {
      cb(error, uploadPath);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024 * 1024 // 2GB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /\.(mp4|mov|avi|webm|mp3|wav|aac|png|jpg|jpeg|gif)$/i;
    if (allowedTypes.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'));
    }
  }
});

// File upload endpoint
router.post('/file', upload.single('media'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileInfo = {
      id: req.file.filename,
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      url: `/uploads/${req.file.filename}`,
      uploadedAt: new Date()
    };

    res.json(fileInfo);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Multiple files upload
router.post('/files', upload.array('media', 10), async (req, res) => {
  try {
    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const filesInfo = req.files.map(file => ({
      id: file.filename,
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
      url: `/uploads/${file.filename}`,
      uploadedAt: new Date()
    }));

    res.json(filesInfo);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Serve uploaded files
router.get('/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(process.cwd(), 'uploads', filename);
    
    // Check if file exists
    await fs.access(filePath);
    
    res.sendFile(filePath);
  } catch (error) {
    res.status(404).json({ error: 'File not found' });
  }
});

export default router;