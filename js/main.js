import { generateAds } from './data.js';
import { generateAdMarkup } from './generate-markup.js';

const ads = generateAds();

generateAdMarkup(ads[0]);
