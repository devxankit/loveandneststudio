import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.join(__dirname, '../src/assets/images/about');

async function compressImages() {
    try {
        const files = fs.readdirSync(targetDir);

        for (const file of files) {
            if (file.match(/\.(jpg|jpeg|png)$/i)) {
                const filePath = path.join(targetDir, file);
                const stat = fs.statSync(filePath);

                // Only compress if larger than 500KB
                if (stat.size > 500 * 1024) {
                    console.log(`Compressing ${file} (${(stat.size / 1024 / 1024).toFixed(2)} MB)...`);

                    // PCR: Read file to buffer first to avoid file lock issues on Windows
                    const inputBuffer = fs.readFileSync(filePath);

                    const outputBuffer = await sharp(inputBuffer)
                        .resize({ width: 800, withoutEnlargement: true })
                        .jpeg({ quality: 80, mozjpeg: true })
                        .png({ quality: 80, compressionLevel: 8 })
                        .toBuffer();

                    fs.writeFileSync(filePath, outputBuffer);

                    const newStat = fs.statSync(filePath);
                    console.log(`  -> New size: ${(newStat.size / 1024).toFixed(2)} KB`);
                }
            }
        }
        console.log('Compression complete!');
    } catch (err) {
        console.error('Error compressing images:', err);
    }
}

compressImages();
