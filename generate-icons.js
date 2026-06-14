// Run once: node generate-icons.js
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = join(__dirname, 'src/assets/logo.png')
const pub = join(__dirname, 'public')

const BG = { r: 10, g: 10, b: 15, alpha: 1 }

async function makeIcon(size, filename) {
  // Fit logo into 75% of the icon size, centered on dark bg
  const logoW = Math.round(size * 0.80)
  const resized = await sharp(src).resize(logoW, null).toBuffer()
  const meta = await sharp(resized).metadata()

  const top = Math.round((size - meta.height) / 2)
  const left = Math.round((size - logoW) / 2)

  await sharp({
    create: { width: size, height: size, channels: 4, background: BG },
  })
    .composite([{ input: resized, top, left }])
    .png()
    .toFile(join(pub, filename))

  console.log(`✓ ${filename} (${size}×${size})`)
}

await makeIcon(512, 'icon-512.png')
await makeIcon(192, 'icon-192.png')
await makeIcon(180, 'apple-touch-icon.png')
console.log('All icons generated in /public')
