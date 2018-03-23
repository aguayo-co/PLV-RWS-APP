# Prilov-app
> Prilov.com: Compra, Usa, Vende

## Build Setup
> Single page Application

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Sintaxis
https://eslint.org/

## Dependencias

### Axios
#### Installation
``` bash
npm install --save axios vue-axios
```
---
### Vuex
URL: https://vuex.vuejs.org/en/installation.html
#### Installation
``` bash
npm install vuex --save-dev
```
---
### Vue.js Server-Side Rendering
``` bash
npm install vue vue-server-renderer --save
```
---
### Incluye Vee-Validate
URL: https://github.com/baianat/vee-validate
#### Installation
``` bash
npm install vee-validate --save -dev
```
---

### Incluye Vue-password
URL: https://github.com/skegel13/vue-password
#### Installation
``` bash
npm install vue-password --save -dev
```
---
#### Rutas de archivos en node_custom_modules
    vue-password : node_modules\vue-password\dist archivo index.js
    vee-validate : node_modules\vee-validate\dist\locale archivo es.js

---
### Incluye PUG
URL: https://gist.github.com/levibostian/96cc285d4235d73f09cdc22f2590ccba
#### Installation
``` bash
npm install pug --save-dev
```
---
### Sticky
#### Uso:
* Menu Usuario
* Menu Main Mobile
#### URL:
https://www.npmjs.com/package/vue-sticky-js
#### Installation
``` bash
npm i -S vue-sticky-js
```
#### Directive
``` bash
v-sticky => Define a new sticky element
```
---
### vue-awesome-swiper
#### Uso:
Home Slider Prilovers
#### URL:
https://surmon-china.github.io/vue-awesome-swiper/
https://github.com/surmon-china/vue-awesome-swiper
#### Installation
``` bash
npm install vue-awesome-swiper --save
```
#### mount with component
``` bash
// require styles
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    swiper,
    swiperSlide
  }
}
```
### vue-flickity
#### Uso:
Componente para Slider
Mobile/desktop
#### URL:
https://github.com/drewjbartlett/vue-flickity
#### Installation
``` bash
npm install vue-flickity
```
