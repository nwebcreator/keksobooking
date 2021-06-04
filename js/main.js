import { generateAds } from './data.js';
import { generateAdMarkup } from './generate-markup.js';
import { setFormRules } from './form.js';

const ads = generateAds();

generateAdMarkup(ads[0]);

setFormRules();