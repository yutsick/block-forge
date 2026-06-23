/**
 * Adds a "Checklist" style variation to the core List block.
 *
 * The editor then shows Default / Checklist in the block's Styles panel.
 * Picking "Checklist" adds the `is-style-checklist` class, which the
 * stylesheet (build/style.css) turns into the Movendi ring-check markers.
 *
 * Plain enqueued script (no build step) — depends on wp-blocks + wp-dom-ready.
 */
( function ( wp ) {
	if ( ! wp || ! wp.blocks || ! wp.domReady ) {
		return;
	}

	wp.domReady( function () {
		wp.blocks.registerBlockStyle( 'core/list', {
			name: 'checklist',
			label: 'Checklist',
		} );
	} );
} )( window.wp );
