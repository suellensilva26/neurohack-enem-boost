const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Cores
const colors = {
  black: '#000000',
  gold: '#FFD700'
};

// SVG base do ícone (círculo preto, aro dourado, texto NH dourado)
const iconSvg = `
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .circle { fill: ${colors.black}; }
      .text { font-size: 280px; font-weight: bold; fill: ${colors.gold}; font-family: Arial, sans-serif; }
    </style>
  </defs>
  <circle class="circle" cx="256" cy="256" r="256"/>
  <circle cx="256" cy="256" r="240" fill="none" stroke="${colors.gold}" stroke-width="8"/>
  <text class="text" x="256" y="340" text-anchor="middle">NH</text>
</svg>
`;

// Criar diretório /public/icons se não existir
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Lista de tamanhos/arquivos a gerar
const sizes = [
  // Android / Web
  { size: 192, name: 'nh-icon-192x192.png' },
  { size: 256, name: 'nh-icon-256x256.png' },
  { size: 512, name: 'nh-icon-512x512.png' },

  // iOS
  { size: 180, name: 'nh-icon-180x180.png' },
  { size: 152, name: 'nh-icon-152x152.png' },
  { size: 120, name: 'nh-icon-120x120.png' },

  // Desktop
  { size: 96, name: 'nh-icon-96x96.png' },
  { size: 64, name: 'nh-icon-64x64.png' },

  // Favicon
  { size: 32, name: 'favicon.png' },
  { size: 16, name: 'favicon-16x16.png' },

  // PWA Maskable (usa mesmo desenho, mas você pode ajustar safe area)
  { size: 192, name: 'nh-icon-192x192-maskable.png' },
  { size: 512, name: 'nh-icon-512x512-maskable.png' },

  // Arquivo base fornecido (512px)
  { size: 512, name: 'nh-icon-black-gold.png' },
];

(async () => {
  for (const { size, name } of sizes) {
    try {
      await sharp(Buffer.from(iconSvg))
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 1 },
        })
        .png()
        .toFile(path.join(iconsDir, name));
      console.log(`✅ Gerado: ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`❌ Erro ao gerar ${name}:`, error);
    }
  }

  console.log('\n✅ Todos os ícones foram gerados em /public/icons/');
})();