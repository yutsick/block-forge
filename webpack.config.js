const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const CopyPlugin = require( 'copy-webpack-plugin' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	plugins: [
		...defaultConfig.plugins,
		new CopyPlugin( {
			patterns: [
				{
					from: path.resolve( __dirname, 'src/blocks' ),
					to: path.resolve( __dirname, 'build/blocks' ),
					filter: ( resourcePath ) => /[/\\]images[/\\]/.test( resourcePath ),
					noErrorOnMissing: true,
				},
			],
		} ),
	],
};
