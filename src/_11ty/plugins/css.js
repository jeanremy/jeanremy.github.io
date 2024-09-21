import postcss from "postcss";
import postcssImport from "postcss-import";
import postcssExtend from "postcss-extend";
import postcssEach from "postcss-each";
import postcssNested from "postcss-nested";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

export default function(eleventyConfig) {
  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async (inputContent, inputPath) => {
      if (inputPath !== "./src/assets/css/base.css") {
        return;
      }

      return async () => {
        let output = await postcss([
          postcssImport,
          postcssExtend,
          postcssEach,
          postcssNested,
          autoprefixer,
          cssnano,
        ]).process(inputContent, { from: inputPath });

        return output.css;
      };
    },
  });
}