/* eslint-disable */

var mediaQueries = {
	md: '(min-width: 500px)',
	lg: '(min-width: 1000px)'
};

Vue.use( VueBgSrc, { mediaQueries });

// Init Vue!
new Vue({
	el: '#demo',
});
