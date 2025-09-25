// Import dan export semua assets menggunakan ES modules
import bgImg from './bg.jpg';
import logoImg from './logo.png';
import myAdventureBg from './myadvanture-bg.jpg';
import reactSvg from './react.svg';

// Export sebagai named exports untuk mudah digunakan
export { bgImg, logoImg, myAdventureBg, reactSvg };

// Export sebagai object untuk kemudahan akses
export const assets = {
  bg: bgImg,
  logo: logoImg,
  myAdventureBg: myAdventureBg,
  react: reactSvg,
};

// Export default berisi semua assets
export default {
  bg: bgImg,
  logo: logoImg,
  myAdventureBg: myAdventureBg,
  react: reactSvg,
};
