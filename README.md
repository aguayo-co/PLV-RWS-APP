# Prilov-app 
> Prilov.com: Compra, Usa, Vende

## Build Setup
> Single page Aplication

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

## Dependencias

### Incluye PUG
- https://gist.github.com/levibostian/96cc285d4235d73f09cdc22f2590ccba
``` bash
npm install pug --save-dev
```

### Incluye Axios
-https://github.com/axios/axios
    npm install axios --save -dev

### Incluye Vee-Validate
-https://github.com/baianat/vee-validate
    npm install vee-validate --save -dev

### Incluye Vue-password
-https://github.com/skegel13/vue-password
    $ npm install vue-password --save -dev

# Rutas de archivos en node_custom_modules
    vue-password : node_modules\vue-password\dist archivo index.js
    vee-validate : node_modules\vee-validate\dist\locale archivo es.js
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