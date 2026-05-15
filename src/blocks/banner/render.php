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
$show_decoration        = $attributes['showDecoration'] ?? false;        // desktop
$show_decoration_mobile = $attributes['showDecorationMobile'] ?? false;  // mobile

$bg_colors = [
	'blue'  => 'bg-banner-blue',
	'peach' => 'bg-banner-peach',
	'pink'  => 'bg-banner-pink/60',
];

$bg_images = [
	'blue-left'  => 'bg-blue-left.png',
	'blue-right' => 'bg-blue-right.png',
	'peach-right' => 'bg-peach-right.png',
	'peach-left' => 'bg-peach-left.png',
	'pink-left'  => 'bg-pink-left.png',
];

$bg_class       = $bg_colors[ $background_color ] ?? 'bg-banner-blue';
$is_image_left  = $image_position === 'left';
$is_full_desktop = $image_type_desktop === 'full';
$is_full_mobile  = $image_type_mobile === 'full';

// Decoration image (single asset; visibility toggled per viewport).
$decoration_side = $is_image_left ? 'left' : 'right';
$decoration_key  = $background_color . '-' . $decoration_side;
$decoration_file = $bg_images[ $decoration_key ] ?? '';
$decoration_url  = $decoration_file ? plugin_dir_url( __FILE__ ) . 'images/' . $decoration_file : '';

// Decoration responsive visibility.
$decoration_visibility = '';
if ( $decoration_url ) {
	if ( $show_decoration && $show_decoration_mobile ) {
		$decoration_visibility = 'block';
	} elseif ( $show_decoration && ! $show_decoration_mobile ) {
		$decoration_visibility = 'hidden md:block';
	} elseif ( ! $show_decoration && $show_decoration_mobile ) {
		$decoration_visibility = 'block md:hidden';
	} else {
		$decoration_visibility = ''; // not rendered.
	}
}

// Mobile flex direction: keep the desktop-visually-first element on top.
// image-left desktop  → image first (source) + flex-col          → image on top mobile
// image-right desktop → image first (source) + flex-col-reverse  → text  on top mobile
$mobile_dir  = $is_image_left ? 'flex-col' : 'flex-col-reverse';
$desktop_dir = $is_image_left ? 'md:flex-row' : 'md:flex-row-reverse';
?>

<section class="w-full mx-auto" data-aos="fade-up">
    <div <?php echo get_block_wrapper_attributes( [ 'class' => 'relative overflow-hidden ' . $bg_class ] ); ?>>

        <?php if ( $decoration_visibility ) : ?>
        <img src="<?php echo esc_url( $decoration_url ); ?>" alt="" aria-hidden="true"
            class="absolute bottom-0 <?php echo $is_image_left ? 'left-0' : 'right-0'; ?> h-full object-cover md:object-contain pointer-events-none select-none z-0 <?php echo esc_attr( $decoration_visibility ); ?>" />
        <?php endif; ?>

        <div
            class="relative z-10 mx-auto flex <?php echo esc_attr( $mobile_dir . ' ' . $desktop_dir ); ?> items-stretch md:min-h-[500px]">

            <!-- ─── Image column (mobile only) ─────────────────────────────── -->
            <?php if ( $image_url ) : ?>
            <div class="md:hidden w-full <?php echo $is_full_mobile
				? 'relative h-[320px] overflow-hidden'
				: 'flex items-center justify-center px-6 pt-8'; ?>">
                <?php if ( $is_full_mobile ) : ?>
                <img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $image_alt ); ?>"
                    class="absolute inset-0 w-full h-full object-cover object-top" />
                <?php else : ?>
                <img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $image_alt ); ?>"
                    class="w-full max-w-[400px] h-[300px] object-cover rounded-2xl" />
                <?php endif; ?>
            </div>
            <?php endif; ?>

            <!-- ─── Image column (desktop only) ────────────────────────────── -->
            <?php if ( $image_url ) : ?>
            <div class="hidden md:flex <?php echo $is_full_desktop
				? 'relative md:flex-[3] md:max-w-[47%] overflow-hidden'
				: 'md:flex-[3] md:max-w-[47%] items-center justify-center mx-[48px]'; ?>">
                <?php if ( $is_full_desktop ) : ?>
                <img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $image_alt ); ?>"
                    class="absolute inset-0 w-full h-full object-cover object-top" />
                <?php else : ?>
                <img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $image_alt ); ?>"
                    class="w-[400px] h-[340px] object-cover rounded-2xl" />
                <?php endif; ?>
            </div>
            <?php endif; ?>

            <!-- ─── Text column ────────────────────────────────────────────── -->
            <div
                class="flex-1 md:flex-[2]  flex flex-col justify-center gap-6 md:gap-8 min-w-0 px-4 md:px-12 py-8 md:py-14 max-w-xl <?php echo $is_image_left ? 'md:mr-auto' : 'md:ml-auto'; ?>">

                <?php if ( $title ) : ?>
                <h2
                    class="font-barlow-semicondensed -tracking-[0.01em] text-banner-heading text-[44px] md:text-[58px] font-semibold md:leading-[64px]">
                    <?php echo wp_kses_post( $title ); ?>
                </h2>
                <?php endif; ?>

                <?php if ( $description ) : ?>
                <p class="type-body-lg text-grey">
                    <?php echo wp_kses_post( $description ); ?>
                </p>
                <?php endif; ?>

                <?php if ( $cta_type === 'buttons' ) : ?>
                <div class="flex gap-4">
                    <a href="<?php echo esc_url( $primary_button['url'] ); ?>"
                        class="inline-flex items-center px-6 py-3 bg-banner-heading text-white rounded-full text-sm font-semibold">
                        <?php echo esc_html( $primary_button['label'] ); ?>
                    </a>
                    <a href="<?php echo esc_url( $secondary_button['url'] ); ?>"
                        class="inline-flex items-center px-6 py-3 border-2 border-banner-heading text-banner-heading rounded-full text-sm font-semibold">
                        <?php echo esc_html( $secondary_button['label'] ); ?>
                    </a>
                </div>
                <?php endif; ?>

                <?php if ( $cta_type === 'link' ) : ?>
                <a href="<?php echo esc_url( $link_url ); ?>"
                    class="flex items-center gap-2 type-regular-link no-underline">
                    <?php echo esc_html( $link_label ); ?>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12.375L19.25 12.375" stroke="#27348B" stroke-width="1.8" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M12.5 19.125L19.25 12.375L12.5 5.625" stroke="#27348B" stroke-width="1.8"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </a>
                <?php endif; ?>

            </div>

        </div>
    </div>
</section>