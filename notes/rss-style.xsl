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
        <link rel="stylesheet" href="/assets/css/base.css?"/>
      </head>
      <body class="page">
        <header class="page-header" role="banner">
  <div class="container">
    <p class="page__title">
      <a href="/" rel="me" title="jr retour à l'accueil">jr<span>.</span></a>
    </p>
    <nav class="page-header__menu" role="navigation" aria-label="Navigation principale">
      <ul>
        <li>
          <a href="/notes/"  aria-current="page">Notes</a>
        </li>
        <li>
          <a href="/a-propos/" >À propos</a>
        </li>
      </ul>
      
    </nav>
  </div>
</header>

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
        <footer class="page-footer" role="contentinfo">
  <div class="container">
    <div class="page-footer__menus">
      <ul class="page-footer__menu">
        <li>
          <a href="/mentions-legales/">Mentions légales</a>
        </li>
        <li>
          <a href="/plan-site/">Plan du site</a>
        </li>
        <li>
          <a href="/notes/rss.xml">RSS</a>
        </li>
      </ul>
      <div>
        <p>Dernière mise à jour le 18/12/2023</p>
        <ul class="page-footer__social">
          <li>
            <a rel="me" href="https://github.com/jeanremy" title="Lien vers le profil GitHub" >
              <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <title>Voir le profil GitHub</title>
                <path d="M10.7359 0.256348C5.06489 0.256348 0.47168 4.60731 0.47168 9.97375C0.47168 14.268 3.41236 17.9096 7.4898 19.1931C8.00298 19.2845 8.19118 18.9842 8.19118 18.7259C8.19118 18.4951 8.18258 17.8837 8.17838 17.0739C5.3232 17.6602 4.72104 15.7701 4.72104 15.7701C4.25402 14.6486 3.57915 14.349 3.57915 14.349C2.64939 13.7465 3.651 13.7587 3.651 13.7587C4.68169 13.8267 5.22313 14.7596 5.22313 14.7596C6.13835 16.2455 7.6258 15.8163 8.21258 15.5677C8.30498 14.9393 8.56928 14.511 8.86268 14.268C6.58313 14.0251 4.1873 13.1894 4.1873 9.46602C4.1873 8.40521 4.58504 7.53867 5.24366 6.8585C5.12819 6.61313 4.78177 5.6252 5.33347 4.28663C5.33347 4.28663 6.19309 4.02588 8.15608 5.28266C8.97728 5.06645 9.84968 4.95956 10.7222 4.9547C11.5946 4.95956 12.4671 5.06645 13.2882 5.28266C15.2384 4.02588 16.098 4.28663 16.098 4.28663C16.6497 5.6252 16.3033 6.61313 16.2007 6.8585C16.855 7.53867 17.2527 8.40521 17.2527 9.46602C17.2527 13.1991 14.8535 14.021 12.5697 14.2599C12.929 14.5514 13.2626 15.1474 13.2626 16.0576C13.2626 17.3581 13.2497 18.4028 13.2497 18.7186C13.2497 18.9736 13.4293 19.2773 13.9554 19.1801C18.0619 17.9055 21 14.2615 21 9.97375C21 4.60731 16.4042 0.256348 10.7359 0.256348Z" fill="white"/>
              </svg>

            </a>
          </li>
          <li>
            <a rel="me" href="https://mastodon.design/@jnrmprd" title="Lien vers le profil mastodon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <title>Voir le profil Mastodon</title>
                <path d="M18.6167 11.6171C18.3367 12.952 16.1767 14.4194 13.6467 14.7034C12.3367 14.8454 11.0467 14.9874 9.67673 14.9306C7.42673 14.8265 5.67668 14.4194 5.67668 14.4194V15.0064C5.99668 17.1081 7.89673 17.2312 9.70673 17.2975C11.5267 17.3448 13.1467 16.862 13.1467 16.862L13.2267 18.4241C13.2267 18.4241 11.9467 19.0678 9.67673 19.1909C8.42673 19.2572 6.86673 19.1625 5.05668 18.7175C1.13668 17.7235 0.45668 13.7567 0.35668 9.72362L0.34668 6.47636C0.34668 2.36755 3.17668 1.16521 3.17668 1.16521C4.62668 0.540366 7.08673 0.256348 9.64673 0.256348H9.70673C12.2667 0.256348 14.7267 0.540366 16.1767 1.16521C16.1767 1.16521 19.0067 2.36755 19.0067 6.47636C19.0067 6.47636 19.0467 9.51534 18.6167 11.6171ZM15.6767 6.79825C15.6767 5.77578 15.3767 4.98999 14.8267 4.37462C14.2667 3.77818 13.5267 3.46576 12.5967 3.46576C11.5367 3.46576 10.7267 3.85392 10.1767 4.63024L9.67673 5.46336L9.17673 4.63024C8.61673 3.85392 7.81673 3.46576 6.74673 3.46576C5.82668 3.46576 5.08668 3.77818 4.51668 4.37462C3.96668 4.98999 3.67668 5.77578 3.67668 6.79825V11.778H5.77668V6.94026C5.77668 5.93672 6.22668 5.40655 7.13673 5.40655C8.13673 5.40655 8.63673 6.02193 8.63673 7.23372V9.8751H10.7067V7.23372C10.7067 6.02193 11.2067 5.40655 12.2167 5.40655C13.1167 5.40655 13.5667 5.93672 13.5667 6.94026V11.778H15.6767V6.79825Z" fill="white"/>
              </svg>

            </a>
          </li>
        </ul>
      </div>

    </div>

  </div>
</footer>


      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>