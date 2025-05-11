---
title: Intervalles unicode et unités CSS
description: xxx
created_at: 2025-05-11
templateEngineOverride: md
---

Je me suis retrouvé recemment face à un bug étrange. Sur ce site, j'utilise deux subsets de police: l'un comprenant tous les caractères latin, l'autre contenant l'intégralité des caractères de la police.

Il est possible de d'assigner une police de caractères à un intervalle de glyphes via la propriété CSS `unicode-range`. Lorsqu'un des glyphes dans cette liste sera rencontré dans la page, la police associée sera téléchargée par le navigateur.

Cela permet de ne télécharger la police ne comprenant que les caractères de la page. Toutefois, si un utilisateur arrive via Google Translate par exemple, la police suivante sera téléchargée et les caractères seront affichés avec la bonne police.

Cette technique peut être utilisée de la manière suivante

```css
/* Police de fallback */
* @font-face {
  font-family: "Albert Sans";
  src: url("/assets/fonts/AlbertSans-full.woff2") format("woff2"), url("/assets/fonts/AlbertSans-full.woff")
      format("woff");
}

@font-face {
  font-family: "Albert Sans";
  src: url("/assets/fonts/AlbertSans-subset.woff2") format("woff2"), url("/assets/fonts/AlbertSans-subset.woff")
      format("woff");
  unicode-range: U+20-5F, U+61-7A, U+7C, U+A0, U+A7, U+A9, U+AB, U+B2-B3, U+BB,
    U+C0, U+C2, U+C6-CB, U+CE-CF, U+D4, U+D9, U+DB-DC, U+E0, U+E2, U+E6-EB,
    U+EE-EF, U+F4, U+F9, U+FB-FC, U+FF, U+152-153, U+178, U+2B3, U+2E2,
    U+1D48-1D49, U+2010-2011, U+2013-2014, U+2019, U+201C-201D, U+2020-2021,
    U+2026, U+202F-2030, U+20AC, U+2212;
}
```

Tout fonctionnait à merveille jusqu'à ce que j'utilise la propriété suivante:

```
h1 {
	max-width: 67ch;
}
```

Au moment où j'utilise cette propriété, Firefox télécharge toutes les polices. Or, il ne devrait en télécharger que celle contenant les glyphes de la page.

## Que se passe-t-il lorsque l'on utilise ch ?

Avec CSS, on peut utiliser des unités relatives à la taille de la police: `em`, `rem`, `ch`, `cap`, `ex`, et `ic`. J'utilise par exemple ch pour limiter la longueur d'un titre afin d'optimiser sa lisibilité.

```css
h1 {
  max-width: 67ch;
}
```

Parmi ces unités, il y en a deux qui se basent sur un caractère précis. `ch`utilise 0 (unicode U+0030) et `ic` l'idéogramme (U+6C34). Lorsque l'on utilise ces unités, la navigateur va prendre un caractère précis et mesurer sa taille avec la police.

Dans le cas de `ch`, le navigateur va donc avoir besoin du, qui fait partie de l'intervalle Latin, il va donc télécharger la police associée.
Si l'intervalle n'avait pas contenu le 0, il aurait téléchargé la police de fallback.

Sur Google et Safari, le comportement est celui attendu, seule la première police est téléchargée. Sur Firefox en revanche, les deux polices sont téléchargées.

## Un bug chez Firefox

Après quelques hésitations, j'ouvre un ticket auprès de l'équipe de Firefox qui confirme que le bug existe bien. Firefox considère les unités basées sur la taille de police de manière globale. Quand l'une des unités suivantes est décelée (`ch` et `ic`), Firefox vérifie si un des glyphes nécéssaires à chaque unité est présent. S'il en manque un, il va télécharger toutes les polices pour couvrir tous les intervales.

Le bug est corrigé dans la version 139 de Firefox. Merci à l'équipe de Firefox pour leur réactivité et leurs explications !

## Des unicode range partout

Le bug suivant m'a amené à réévaluer ma méthode. Par exemple, je charge la police de fallback Albert Sans sans restriction. Si un utilisateur chinois tente de traduire mon site, il téléchargera la police mais elle ne sera pas utilisée, car elle ne contient aucun idéogramme. Il faudrait donc à minima associer systématiquement tous les glyphes contenus dans la police via un intervalle.

J'opte donc donc pour la stratégie suivante qui répond à des situations précises:

1. Un subset comprenant tous les caractères contenus dans mes pages: le cas le plus courant, un lecteur qui consulte le site dans sa version originale.
2. (optionnel) Un subset avec les caractères restant de la police. Un cas à part: un utilisateur qui traduit le site, mais dans une langue comprenant des caractères contneus dans la police, mais qui je n'aurais pas en français (une tilde espagnole, un double s allemand, etc)
3. Une police de fallback système: pour les cas où un utilisateur traduit le site, mais sa traduction contient des caractères qui ne sont pas dans la police. Dans ce cas, je veux me rapprocher de la police par défaut avec [Fallback Font Generator](https://screenspan.net/fallback)

Faire un script qui lance glyphhanger en mode spider, qui chope les glyphe, et écrit le css dans un fichier à part, que je mettrai en dernier.
Et si possible un script qui déduit les caractères restant dans la police et fait le deuxième subset.
