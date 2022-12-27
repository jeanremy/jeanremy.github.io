---
title: Faire un subset de fonte avec Glyphhanger
description: Comment réduire la taille d'une fonte en ne gardant que les glyphes utiles
date: 2022-11-13
templateEngineOverride: md
---

Lorsque l'on utilise une police sur le web, il est rare que la totalité des glyphes soit utilisée.

Il est donc intéressant de pouvoir supprimer ces signes typographiques pour alléger le poids de la police.

![Une partie de la liste des glyphes utilisés dans la police Albert Sans](./src/assets/img/posts/albert-sans-glyphs.png)

La [librairie Glyphhanger](https://github.com/zachleat/glyphhanger) permet de réduire les fichiers en ôtant les caractères non présent dans une page (mais pas que).

Dans mon cas, j'ai créée une page non publiée, mais qui me permet d'afficher tous les caractères que je souhaite garder dans ma fonte:

_azertyuiopqsdfghjklmwxcvbnèéàçëêâäüûïîæôö?,.;:/+=%ù£`Ôûö\*$€@#&"'(§!ç))-#1234567890¹½¼²³¾⁴°\_~<>[]{} AZERTYUIOPQSDFGHJKLMWXCVBNÈÉÀÇËÊÂÄÜÛÆÏÎÔÖ_

Puis j'utilise ce script pour générer ma fonte ne comportant que ces glyphes:

```bash
> cd fontsDirectory
> glyphhanger http://localhost:8080/notes/styleguide --subset=AlbertSans-VariableFont_wght.ttf --formats=woff2
```

Un fichier est généré, il ne reste plus qu'à l'utiliser dans le CSS via ce genre de code:

```css
@font-face {
  font-family: "Albert Sans";
  src: url("../fonts/AlbertSans-VariableFont_wght-subset.woff2") format("woff");
}
```
