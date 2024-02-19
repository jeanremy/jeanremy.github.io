---
title: Mise à jour de 11ty v3
description: Stabilité et simplicité
date: 2024-02-19
templateEngineOverride: md
---

Le générateur de site statique 11ty vient de sortir en version 3 alpha. Le changement principal est sa compatibilité avec ESM. Bien que touchant aux fondements d’11ty, la mise à jour est assez simple:

- Modifier le package.json pour y ajouter `"type": "module"`
- Utiliser les imports en lieu et places des require.
  Pour cela, il suffit de passer de cette façon d'écrire

```js
const posts = require('./posts')
module.exports = { posts }
```

à celle-ci:

```js
import posts from './posts.js'
export default { posts }
```

Le guide propose également [une mise à jour progressive](https://www.11ty.dev/blog/canary-eleventy-v3/).

> You can add `"type": "module"` to your `package.json` and rename your Node `.js` files to `.cjs` and be done with it. Later on, you can slowly upgrade to ESM syntax one JavaScript file at a time by renaming back from `.cjs` to `.js`. {lang="en"}

La mise à jour de ce site m'a pris quelques minutes. C'est ce qui fait (entre autres) la force d'11ty: sa simplicité et sa stabilité.
