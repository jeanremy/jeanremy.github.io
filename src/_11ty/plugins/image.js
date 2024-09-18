export default {
		// which file extensions to process
		extensions: "html",

		// Add any other Image utility options here:

		// optional, output image formats
		formats: ["webp"],

		// optional, output image widths
    widths: [320, 640],
		outputDir: 'assets/img/',

		// optional, attributes assigned on <img> override these values.
		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
      sizes: '(max-width: 640px) 320px, 640px',
		},
	}
