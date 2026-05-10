document.querySelectorAll( '.services-card' ).forEach( ( card ) => {
	const toggle  = card.querySelector( '.services-card__toggle' );
	const more    = card.querySelector( '.services-card__more' );
	const chevron = card.querySelector( '.services-card__chevron' );
	const label   = card.querySelector( '.services-card__toggle-label' );

	if ( ! toggle || ! more ) return;

	const showLabel = label?.textContent ?? 'Visa fler';
	const hideLabel = toggle.dataset.hideLabel ?? 'Visa färre';

	toggle.addEventListener( 'click', () => {
		const isExpanded = toggle.getAttribute( 'aria-expanded' ) === 'true';

		more.classList.toggle( 'hidden', isExpanded );
		toggle.setAttribute( 'aria-expanded', String( ! isExpanded ) );
		chevron?.classList.toggle( 'rotate-180', ! isExpanded );

		if ( label ) {
			label.textContent = isExpanded ? showLabel : hideLabel;
		}
	} );
} );
