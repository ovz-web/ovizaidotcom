const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

console.log('[VIDEOS] ffmpeg binary found at:', ffmpegPath);

const videosDir = path.resolve(__dirname, '../public/videos');

const videos = ['spec-01', 'spec-02'];

for (const name of videos) {
  const inputMp4 = path.join(videosDir, `${name}.mp4`);
  const backupMp4 = path.join(videosDir, `${name}-orig.mp4`);
  const outputMp4 = path.join(videosDir, `${name}-opt.mp4`);
  const outputWebm = path.join(videosDir, `${name}.webm`);

  if (!fs.existsSync(inputMp4)) {
    console.warn(`[VIDEOS] Skipping ${name}, file not found: ${inputMp4}`);
    continue;
  }

  // Backup original if not already backed up
  if (!fs.existsSync(backupMp4)) {
    fs.copyFileSync(inputMp4, backupMp4);
  }

  const origSize = (fs.statSync(backupMp4).size / (1024 * 1024)).toFixed(2);
  console.log(`\n[VIDEOS] Processing ${name} (Original: ${origSize} MB)...`);

  // 1. Encode H.264 MP4 with web-optimized CRF 28, faststart
  console.log(`[VIDEOS] Encoding ${name} to optimized H.264 MP4 (faststart)...`);
  const mp4Cmd = `"${ffmpegPath}" -y -i "${backupMp4}" -c:v libx264 -crf 28 -preset medium -maxrate 2000k -bufsize 4000k -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k -ac 2 "${outputMp4}"`;
  execSync(mp4Cmd, { stdio: 'inherit' });

  // 2. Encode VP9 WebM
  console.log(`[VIDEOS] Encoding ${name} to VP9 WebM...`);
  const webmCmd = `"${ffmpegPath}" -y -i "${backupMp4}" -c:v libvpx-vp9 -crf 32 -b:v 1500k -deadline good -cpu-used 2 -c:a libopus -b:a 96k -ac 2 "${outputWebm}"`;
  execSync(webmCmd, { stdio: 'inherit' });

  // Replace original with optimized mp4
  fs.renameSync(outputMp4, inputMp4);

  const newMp4Size = (fs.statSync(inputMp4).size / (1024 * 1024)).toFixed(2);
  const webmSize = (fs.statSync(outputWebm).size / (1024 * 1024)).toFixed(2);
  console.log(`[VIDEOS] ${name} Done: MP4: ${newMp4Size} MB, WebM: ${webmSize} MB (Original was ${origSize} MB)`);
}

// Clean up backups to not bloat git repository
for (const name of videos) {
  const backupMp4 = path.join(videosDir, `${name}-orig.mp4`);
  if (fs.existsSync(backupMp4)) {
    fs.unlinkSync(backupMp4);
  }
}

console.log('\n[VIDEOS] All video compressions completed successfully!');
