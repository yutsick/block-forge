/**
 * Adds an inline "Arrow link" format to the rich-text toolbar.
 *
 * Select text (optionally also make it a normal link), then click the
 * Arrow link button. It wraps the selection in <span class="bf-arrow-link">,
 * which the stylesheet renders with the Movendi arrow + the services-block
 * hover behaviour (link nudges right, arrow nudges further, underline wipes in).
 *
 * Plain enqueued script (no build step). Depends on wp-rich-text,
 * wp-block-editor, wp-element, wp-i18n, wp-dom-ready.
 */
( function ( wp ) {
	if (
		! wp ||
		! wp.richText ||
		! wp.blockEditor ||
		! wp.element ||
		! wp.domReady
	) {
		return;
	}

	var NAME = 'block-forge/arrow-link';
	var __ = ( wp.i18n && wp.i18n.__ ) || function ( s ) { return s; };

	wp.domReady( function () {
		// Guard against double-registration on editor re-mounts.
		// getFormatType isn't exposed on the global in every build, so
		// only call it when it exists — otherwise just (re)register.
		if (
			typeof wp.richText.getFormatType === 'function' &&
			wp.richText.getFormatType( NAME )
		) {
			return;
		}

		try {
			wp.richText.registerFormatType( NAME, {
				title: __( 'Arrow link', 'block-forge' ),
				tagName: 'span',
				className: 'bf-arrow-link',
				edit: function ( props ) {
					return wp.element.createElement(
						wp.blockEditor.RichTextToolbarButton,
						{
							icon: 'arrow-right-alt',
							title: __( 'Arrow link', 'block-forge' ),
							isActive: props.isActive,
							onClick: function () {
								props.onChange(
									wp.richText.toggleFormat( props.value, {
										type: NAME,
									} )
								);
							},
						}
					);
				},
			} );
		} catch ( e ) {
			// Already registered (editor re-mount) or API mismatch — ignore.
		}
	} );
} )( window.wp );
