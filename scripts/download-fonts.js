const fs = require('fs');
const path = require('path');
const https = require('https');
const { promisify } = require('util');
const stream = require('stream');

const pipeline = promisify(stream.pipeline);

const fonts = [
  {
    name: 'Philosopher-Regular.woff2',
    url: 'https://fonts.gstatic.com/s/philosopher/v21/vEFV2_5QCwIS4_Dhez5jcWBhT0020NqfZ7c.woff2',
  },
  {
    name: 'Philosopher-Bold.woff2',
    url: 'https://fonts.gstatic.com/s/philosopher/v21/vEFV2_5QCwIS4_Dhez5jcWBqT0020NqfZ7c.woff2',
  },
];

async function downloadFonts() {
  const fontsDir = path.join(__dirname, '../public/fonts');

  // Create fonts directory if it doesn't exist
  if (!fs.existsSync(fontsDir)) {
    fs.mkdirSync(fontsDir, { recursive: true });
  }

  // Download each font
  for (const font of fonts) {
    const filePath = path.join(fontsDir, font.name);
    console.log(`Downloading ${font.name}...`);

    try {
      const response = await new Promise((resolve, reject) => {
        const req = https.get(font.url, resolve);
        req.on('error', reject);
      });

      if (response.statusCode !== 200) {
        throw new Error(`Failed to download ${font.name}: ${response.statusCode}`);
      }

      await pipeline(response, fs.createWriteStream(filePath));

      console.log(`Successfully downloaded ${font.name}`);
    } catch (error) {
      console.error(`Error downloading ${font.name}:`, error);
    }
  }
}

downloadFonts().catch(console.error);
