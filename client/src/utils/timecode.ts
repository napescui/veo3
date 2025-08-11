export function formatTimecode(seconds: number, fps: number = 30): string {
  const totalFrames = Math.floor(seconds * fps);
  const hours = Math.floor(totalFrames / (fps * 3600));
  const minutes = Math.floor((totalFrames % (fps * 3600)) / (fps * 60));
  const secs = Math.floor((totalFrames % (fps * 60)) / fps);
  const frames = totalFrames % fps;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`;
}

export function parseTimecode(timecode: string, fps: number = 30): number {
  const parts = timecode.split(':').map(Number);
  if (parts.length !== 4) return 0;
  
  const [hours, minutes, seconds, frames] = parts;
  return hours * 3600 + minutes * 60 + seconds + frames / fps;
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function secondsToFrames(seconds: number, fps: number): number {
  return Math.floor(seconds * fps);
}

export function framesToSeconds(frames: number, fps: number): number {
  return frames / fps;
}