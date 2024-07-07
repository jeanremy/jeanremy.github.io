import * as fs from 'fs';
import { OgImage } from '../../utils/ogimage';


export default {
  outputDir: 'public/og-images',
  urlPath: 'og-images',
  satoriOptions: {
    fonts: [
      {
        name: 'Albert',
        data: fs.readFileSync('./src/assets/fonts/IBMPlexMono-Medium.ttf'),
        weight: 700,
        style: 'normal',
      },
    ],
  },
  OgImage

}