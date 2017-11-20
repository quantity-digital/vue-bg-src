import Vue from 'vue/dist/vue.esm';
import VueBgSrc from '../dist/vue-bg-src';

const mediaQueries = {
	md: '(min-width: 500px)',
	lg: '(min-width: 1000px)',
};

Vue.use( VueBgSrc, { mediaQueries });
 
// Init Vue!
new Vue({
	el: '#demo',
});
