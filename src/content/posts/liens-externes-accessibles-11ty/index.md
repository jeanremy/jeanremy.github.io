---
title: Des liens externes accessibles avec 11ty
description: Pourquoi j'ai changé ma façon de faire pour signaler les liens externes
created_at: 2025-01-19
templateEngineOverride: md
---

Pour différencier les liens internes des liens externes sur ce blog, j’utilisais un caractère de flèche sortant vers le coin haut à droite: ↗.

Ce caractère était inséré de la façon suivante en CSS ^[En relisant ce morceau de code, je m'aperçois que la technique n'était pas parfaite. D'une part, les liens peuvent aussi commencer par //, mais surtout mon contenu inséré ne comportait pas de texte alternatif (que j'aurais pu ajouter de cette manière content: "↗" / "Nouvelle fenêtre";).]:

```css
&[href^="http"]:after {
  content: "↗";
  font-size: 0.8em;
  vertical-align: baseline;
  margin-left: 0.2rem;
}
```

Je ciblais tous les liens commençant par http. Les liens internes de mon blog utilisant une url relative (commençant par /), ils étaient donc bien ignorés.

L’information ajoutée en CSS me semblait suffisamment anecdotique pour ne pas enfreindre la [règle 10.2 du RGAA](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#10.2) (sans en être tout à fait sûr).

La lecture d’un [échange sur Mastodon](https://eldritch.cafe/@juliemoynat/113792038893626015) m’a amené à m’interroger sur ma manière de faire.

D’abord, l’affichage d’une flèche accolée aux liens signifie le plus souvent que l’on ouvre une nouvelle fenêtre.
Or, je ne force pas les ouvertures de nouvelle fenêtre (avec `target=”_blank”`). Il existe des [raisons valides de le faire](https://css-tricks.com/use-target_blank/), mais aucune n'entre en jeu sur ce blog.
La signification de ma flèche risquait donc d’être incomprise.

Ensuite, ce contenu reste porteur d’information. À la réflexion, la règle du RGAA me parait bien enfreinte. Le contenu est ajouté en CSS, la désactivation des feuilles de styles conduira donc à sa perte.

J’ai donc décidé de supprimer cette flèche sur tous les liens externes, mais de l’ajouter uniquement sur les liens ouvrant une nouvelle fenêtre. Bon, il n’y en a pas encore, mais peut-être un jour.  
Pour ça, j'ai suivi la manière recommandée par Julie Moynat dans son post sur Mastodon, à savoir comme suit:

```css
<a href="https://www.example.org" target="_blank" rel="noopener">
  Example
  <span class="sr-only"> - nouvelle fenêtre</span>
  <span title="nouvelle fenêtre" aria-hidden="true">↗</span>
</a>
```

L’autrice de ces lignes détaille clairement le pourquoi du comment dans [un article de blog](https://www.lalutineduweb.fr/lien-ouverture-nouvelle-fenetre-accessible/) que je conseille vivement (l’article et le blog).

J’en ai profité pour mettre tout ça dans un [plugin 11ty](https://www.npmjs.com/package/eleventy-plugin-accessible-external-links).

Peut-être en aurais-je besoin un jour, qui sait ?
