async function getTtfFont(family, axes, value) {
  const familyParam = axes.join(',') + '@' + value.join(',');
  // Get css style sheet with user agent Mozilla/5.0 Firefox/1.0 to ensure non-variable TTF is returned
  const cssCall = await fetch(`https://fonts.googleapis.com/css2?family=${family}:${familyParam}&display=swap`, {
      headers: {
          'User-Agent': 'Mozilla/5.0 Firefox/1.0',
      },
  });

  const css = await cssCall.text();
  const ttfUrl = css.match(/url\(([^)]+)\)/)?.[1];

  return await fetch(ttfUrl).then(res => res.arrayBuffer());
}


export default async function() {
  
  return  {
    outputDir: 'assets/og-images',
    urlPath: 'assets/og-images',
    satoriOptions: {
      fonts: [
        {
          name: 'AlbertSans', 
          data: await getTtfFont('Albert+Sans', ['wght'], ['700']),
        },
      ],
    }
  }
}
