<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="fr">
      <head>
        <title>
          RSS Feed |
          <xsl:value-of select="/atom:feed/atom:title"/>
        </title>
        <meta charset="utf-8"/>
        <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" href="/assets/css/base.css?{{assetHash}}"/>
      </head>
      <body class="page">
        {% include "partials/header.njk" %}
        <main class="main" role="main">
          <article class="article">
            <header class="article__header">
              <div class="container">
                <h1 class="article__title df aic">
                  <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 8 8" width="30" height="30" class="mr-3">
                    <title>RSS feed icon</title>
                    <rect fill="orange"  class="button" width="8" height="8" rx="1.5"/>
                    <circle fill="white" class="symbol" cx="2" cy="6" r="1"/>
                    <path  fill="white"  class="symbol" d="m 1,4 a 3,3 0 0 1 3,3 h 1 a 4,4 0 0 0 -4,-4 z"/>
                    <path  fill="white"  class="symbol" d="m 1,2 a 5,5 0 0 1 5,5 h 1 a 6,6 0 0 0 -6,-6 z"/>
                  </svg>

                  <xsl:value-of select="/atom:feed/atom:title"/>
                </h1>
              </div>
            </header>
            <section class="article__content">
              <div class="container">
                <div class="md">
                  <ul>

                    <xsl:for-each select="/atom:feed/atom:entry">
                      <li class="article-teaser">
                        <a>

                          <xsl:attribute name="href">
                            <xsl:value-of select="atom:link/@href"/>
                          </xsl:attribute>

                          <xsl:value-of select="atom:title"/>
                        </a>
                      </li>
                    </xsl:for-each>
                  </ul>
                </div>
              </div>
            </section>
          </article>
        </main>
        {% include "partials/footer.njk" %}

      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>