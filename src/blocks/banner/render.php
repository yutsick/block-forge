<?php
$background_color       = $attributes['backgroundColor'] ?? 'blue';
$image_url              = $attributes['imageUrl'] ?? '';
$image_alt              = $attributes['imageAlt'] ?? '';
$image_type_desktop     = $attributes['imageType'] ?? 'full';            // desktop
$image_type_mobile      = $attributes['imageTypeMobile'] ?? 'boxed';     // mobile
$image_position         = $attributes['imagePosition'] ?? 'left';
$title                  = $attributes['title'] ?? '';
$description            = $attributes['description'] ?? '';
$cta_type               = $attributes['ctaType'] ?? 'none';
$primary_button         = $attributes['primaryButton'] ?? [ 'label' => '', 'url' => '' ];
$secondary_button       = $attributes['secondaryButton'] ?? [ 'label' => '', 'url' => '' ];
$link_label             = $attributes['linkLabel'] ?? '';
$link_url               = $attributes['linkUrl'] ?? '';
$show_decoration        = $attributes['showDecoration'] ?? false;
$show_decoration_mobile = $attributes['showDecorationMobile'] ?? false;
$decoration_url         = $attributes['decorationUrl'] ?? '';
$decoration_mobile_url  = $attributes['decorationMobileUrl'] ?? '';
$decoration_position    = $attributes['decorationPosition'] ?? 'left';
$anchor_id              = $attributes['anchorId'] ?? '';

$title_style            = block_forge_inline_style( $attributes['titleStyle'] ?? [] );
$description_style      = block_forge_inline_style( $attributes['descriptionStyle'] ?? [] );
$primary_btn_style      = block_forge_inline_style( $attributes['primaryButtonStyle'] ?? [] );
$secondary_btn_style    = block_forge_inline_style( $attributes['secondaryButtonStyle'] ?? [] );
$link_style             = block_forge_inline_style( $attributes['linkStyle'] ?? [] );

$bg_colors = [
	'blue'  => 'bg-banner-blue',
	'peach' => 'bg-banner-peach',
	'pink'  => 'bg-banner-pink/60',
];

$bg_class         = $bg_colors[ $background_color ] ?? 'bg-banner-blue';
$is_image_left    = $image_position === 'left';
$is_full_desktop  = $image_type_desktop === 'full';
$is_full_mobile   = $image_type_mobile === 'full';
$decoration_side  = $decoration_position === 'right' ? 'right' : 'left';

// Mobile flex direction: image visually-first on desktop = image on TOP on mobile.
$mobile_dir = $is_image_left ? 'flex-col' : 'flex-col-reverse';

// Boxed-desktop flex direction (image goes left or right).
$desktop_dir = $is_image_left ? 'md:flex-row' : 'md:flex-row-reverse';

/*
 * Render the text content (title + description + buttons + link) into
 * a buffer so it can be re-used in both the mobile layout and the
 * desktop layout (full / boxed) without duplicating the markup.
 */
ob_start();
?>
<?php if ( $title ) : ?>
<h2 class="font-barlow-semicondensed -tracking-[0.01em] text-banner-heading text-[44px] md:text-[58px] font-semibold md:leading-[64px]"
	<?php if ( $title_style ) echo 'style="' . esc_attr( $title_style ) . '"'; ?>>
	<?php echo wp_kses_post( $title ); ?>
</h2>
<?php endif; ?>

<?php if ( $description ) : ?>
<p class="type-body text-grey"
	<?php if ( $description_style ) echo 'style="' . esc_attr( $description_style ) . '"'; ?>>
	<?php echo wp_kses_post( $description ); ?>
</p>
<?php endif; ?>

<?php if ( $cta_type === 'buttons' || $cta_type === 'both' ) : ?>
<div class="flex gap-4">
	<a href="<?php echo esc_url( $primary_button['url'] ); ?>"
		class="inline-flex items-center px-6 py-3 bg-banner-heading text-white rounded-full text-sm font-semibold no-underline"
		<?php if ( $primary_btn_style ) echo 'style="' . esc_attr( $primary_btn_style ) . '"'; ?>>
		<?php echo wp_kses( $primary_button['label'], [] ); ?>
	</a>
	<a href="<?php echo esc_url( $secondary_button['url'] ); ?>"
		class="inline-flex items-center px-6 py-3 border-2 border-banner-heading text-banner-heading rounded-full text-sm font-semibold no-underline"
		<?php if ( $secondary_btn_style ) echo 'style="' . esc_attr( $secondary_btn_style ) . '"'; ?>>
		<?php echo wp_kses( $secondary_button['label'], [] ); ?>
	</a>
</div>
<?php endif; ?>

<?php if ( $cta_type === 'link' || $cta_type === 'both' ) : ?>
<a href="<?php echo esc_url( $link_url ); ?>"
	class="flex items-center gap-2 type-regular-link no-underline"
	<?php if ( $link_style ) echo 'style="' . esc_attr( $link_style ) . '"'; ?>>
	<?php echo wp_kses( $link_label, [] ); ?>
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M4 12.375L19.25 12.375" stroke="#27348B" stroke-width="1.8" stroke-linecap="round"
			stroke-linejoin="round" />
		<path d="M12.5 19.125L19.25 12.375L12.5 5.625" stroke="#27348B" stroke-width="1.8"
			stroke-linecap="round" stroke-linejoin="round" />
	</svg>
</a>
<?php endif; ?>
<?php
$text_content_html = ob_get_clean();
?>
<div class="wp-block-block-forge-banner" data-aos="fade-up">
	<section <?php if ( $anchor_id ) echo 'id="' . esc_attr( $anchor_id ) . '"'; ?> class="w-full mx-auto">
		<div <?php echo get_block_wrapper_attributes( [ 'class' => 'relative overflow-hidden ' . $bg_class ] ); ?>>

			<?php if ( $decoration_url && $show_decoration ) : ?>
			<img src="<?php echo esc_url( $decoration_url ); ?>" alt="" aria-hidden="true"
				class="absolute bottom-0 <?php echo $decoration_side === 'right' ? 'right-0' : 'left-0'; ?> h-full object-contain pointer-events-none select-none z-0 hidden md:block" />
			<?php endif; ?>

			<?php if ( $decoration_mobile_url && $show_decoration_mobile ) : ?>
			<img src="<?php echo esc_url( $decoration_mobile_url ); ?>" alt="" aria-hidden="true"
				class="absolute bottom-0 right-0 h-full object-contain pointer-events-none select-none z-0 block md:hidden" />
			<?php endif; ?>

			<!-- ─── MOBILE LAYOUT (< md) ─────────────────────────────────────
			 * Vertical flex; image stacked on top or bottom depending on the
			 * desktop image-position attribute (kept consistent).
			 * ────────────────────────────────────────────────────────────── -->
			<div class="relative z-10 flex <?php echo esc_attr( $mobile_dir ); ?> md:hidden">
				<?php if ( $image_url ) : ?>
				<div class="relative z-20 w-full <?php echo $is_full_mobile
					? 'h-[320px] overflow-hidden'
					: 'flex items-center justify-center px-6 pt-8'; ?>">
					<?php if ( $is_full_mobile ) : ?>
					<img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $image_alt ); ?>"
						class="absolute inset-0 w-full h-full object-cover object-top" />
					<?php else : ?>
					<img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $image_alt ); ?>"
						class="relative z-20 w-full max-w-[400px] h-[300px] object-cover rounded-[8px]" />
					<?php endif; ?>
				</div>
				<?php endif; ?>

				<div class="flex flex-col gap-6 min-w-0 px-4 py-8 max-w-xl">
					<?php echo $text_content_html; ?>
				</div>
			</div>

			<?php if ( $is_full_desktop ) : ?>
			<!-- ─── DESKTOP — IMAGE FULL ─────────────────────────────────────
			 * IMAGE: absolute overlay (inset-0 over the bg wrapper), the
			 *        actual <img> is sized to 50% of the bg wrapper (= 50vw
			 *        since the wrapper is full-bleed) and anchored to its
			 *        side of the viewport.
			 * CONTENT: lives inside a 1120 max-width container, half-width,
			 *        positioned on the opposite side. Padded on the inner
			 *        side so the text doesn't kiss the image edge.
			 * ──────────────────────────────────────────────────────────── -->
			<?php if ( $image_url ) : ?>
			<div class="hidden md:block absolute inset-0 z-0">
				<img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $image_alt ); ?>"
					class="absolute top-0 h-full w-1/2 object-cover object-top <?php echo $is_image_left ? 'left-0' : 'right-0'; ?>" />
			</div>
			<?php endif; ?>

			<div class="hidden md:grid md:grid-cols-2 relative z-10 max-w-[1120px] mx-auto min-h-[500px]">
				<?php if ( $is_image_left ) : ?>
				<div aria-hidden="true"></div>
				<?php endif; ?>
				<div class="flex flex-col justify-center gap-8 py-14 <?php echo $is_image_left ? 'pl-12' : 'pr-12'; ?>">
					<?php echo $text_content_html; ?>
				</div>
				<?php if ( ! $is_image_left ) : ?>
				<div aria-hidden="true"></div>
				<?php endif; ?>
			</div>
			<?php else : ?>
			<!-- ─── DESKTOP — IMAGE BOXED ────────────────────────────────────
			 * Both image and content live inside the same 1120 flex row.
			 * ──────────────────────────────────────────────────────────── -->
			<div class="hidden md:flex relative z-10 max-w-[1120px] mx-auto md:gap-20 items-stretch min-h-[500px] <?php echo esc_attr( $desktop_dir ); ?>">
				<?php if ( $image_url ) : ?>
				<div class="relative z-20 md:flex-[3] md:max-w-1/2 flex items-center">
					<img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $image_alt ); ?>"
						class="relative z-20 w-[544px] h-[380px] object-cover rounded-[8px]" />
				</div>
				<?php endif; ?>

				<div class="md:flex-[2] flex flex-col justify-center gap-8 min-w-0 py-14 max-w-xl <?php echo $is_image_left ? 'md:mr-auto' : 'md:ml-auto'; ?>">
					<?php echo $text_content_html; ?>
				</div>
			</div>
			<?php endif; ?>

		</div>
	</section>
</div>
