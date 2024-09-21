import esbuild from 'esbuild'

export default function(eleventyConfig) {
  eleventyConfig.addTemplateFormats('js');

  eleventyConfig.addExtension('js', {
  	outputFileExtension: 'js',
  	compile: async (content, path) => {
  		if (path !== './src/assets/js/index.js') {
  			return;
  		}

  		return async () => {
  			let { outputFiles } = await esbuild.build({
  				target: 'es2020',
  				entryPoints: [path],
  				minify: true,
  				bundle: true,
  				write: false,
  			});

  			return outputFiles[0].text;
  		};
  	},
  });
}