# vue-bg-src
Simple Vue.js directive for defining responsive image backgrounds on an element similar to using srcset on an img tag. The background image is replaced based on a predefined set of media queries. 

## Features

- Very simple setup.
- No dependendcies.
- Fallback to low resolution image. 
- Works with IE 10+. 

## Installing

### With a module bundler (webpack, rollup, etc.)

```javascript
npm install vue-bg-src
```

Then initialize the plugin with your media queries

```javascript
// main.js
import VueBgSrc from 'vue-bg-src';

const mediaQueries = {
	md: '(min-width: 500px)',
	lg: '(min-width: 1000px)'
};

Vue.use( VueBgSrc, { mediaQueries: mediaQueries } );
```

### CDN

Include the vue-bg-src script. 

```html
<script src="https://unpkg.com/vue-bg-src@1.0.0"></script>
```

Then initialize the plugin.

```javascript
// main.js

const mediaQueries = {
	md: '(min-width: 500px)',
	lg: '(min-width: 1000px)'
};

Vue.use( VueBgSrc, { mediaQueries: mediaQueries } );
```

### Examples

Simply add `v-bg-set` on the element. Use the inline background for your low resolution fallback. 

```html
<div v-bg-set style="background-image('/my/image.png')"></div>
```

Then add the upscaled version of the image at your breakpoints like this: 

```html
<div v-bg-set style="background-image('/my/image.png')" data-bg-src-md="/my/medium-image.png" data-bg-src-lg="/my/large-image.png"></div>
```

**Have fun!**
