// Global defaults
const defaults = {
	mediaQueries: {},
	attributePrefix: 'data-bg-src',
};

// Vue plugin install function
function install( Vue, options ) {

	// Merge settings with defaults
	const globalSettings = { ...defaults, ...options };

	// Register a global custom directive called
	Vue.directive( 'bg-set', {

		inserted: function ( el ) {
			const mediaQueries = globalSettings.mediaQueries;
			const attributePrefix = globalSettings.attributePrefix;
			const attributes = getAttributesWithPrefix( attributePrefix, el.attributes );
		
			const bgOverride = getBgOverride({ attributes, mediaQueries, attributePrefix }); 
		
			if ( bgOverride ) {
				// peload image
				preloadImage( bgOverride, function() {
					el.style.backgroundImage = `url("${bgOverride}")`;
				});
			}
		},

	});

}

function getBgOverride({ attributes, mediaQueries, attributePrefix }) {
	// Abort if no window or matchMedia support
	if ( !( window && window.matchMedia ) ) {
		return null;
	}

	const matched = attributes.reduce( ( found, attr ) => {
		const name = attr.name.replace( `${attributePrefix}-`, '' );
		
		if ( name in mediaQueries && window.matchMedia( mediaQueries[ name ]).matches ) {
			return attr.value;
		}
		
		return found;
	}, null );
	
	return matched;
}

function getAttributesWithPrefix( prefix, attributes ) {
	const foundAttributes = [];
	
	for ( let i = 0; i < attributes.length; i++ ) {
		const attr = attributes[ i ];
		const reg = new RegExp( '^' + prefix );
		if ( reg.test( attr.name ) ) {
			foundAttributes.push({ 
				name: attr.name,
				value: attr.value,
			});
		}
	}

	return foundAttributes;
}
	
function preloadImage( src, cb ) {
	const image = new Image();
	image.onload = cb;
	image.src = src;
}

export default { install };
