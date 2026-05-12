<?php
$image_url     = $attributes['imageUrl'] ?? '';
$image_alt     = $attributes['imageAlt'] ?? '';
$title         = $attributes['title'] ?? '';
$description   = $attributes['description'] ?? '';
$primary_btn   = $attributes['primaryButton'] ?? [ 'label' => '', 'url' => '' ];
$secondary_btn = $attributes['secondaryButton'] ?? [ 'label' => '', 'url' => '' ];
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <section class="relative w-full min-h-[600px] flex items-end overflow-hidden bg-banner-heading">

        <?php if ( $image_url ) : ?>
        <img
            src="<?php echo esc_url( $image_url ); ?>"
            alt="<?php echo esc_attr( $image_alt ); ?>"
            class="absolute inset-0 w-full h-full object-cover"
        />
        <?php endif; ?>

        <div class="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent"></div>

        <div class="relative z-10 w-full max-w-6xl mx-auto px-8 py-16">

            <?php if ( $title ) : ?>
            <h1 class="type-display text-white mb-4 max-w-2xl">
                <?php echo wp_kses_post( $title ); ?>
            </h1>
            <?php endif; ?>

            <?php if ( $description ) : ?>
            <p class="type-body-lg text-white/90 mb-8 max-w-lg">
                <?php echo wp_kses_post( $description ); ?>
            </p>
            <?php endif; ?>

            <?php if ( $primary_btn['label'] || $secondary_btn['label'] ) : ?>
            <div class="flex flex-wrap gap-4">
                <?php if ( $primary_btn['label'] ) : ?>
                <a href="<?php echo esc_url( $primary_btn['url'] ); ?>"
                    class="inline-flex items-center px-6 py-3 bg-white text-banner-heading rounded-full text-sm font-semibold hover:bg-banner-peach transition-colors">
                    <?php echo esc_html( $primary_btn['label'] ); ?>
                </a>
                <?php endif; ?>
                <?php if ( $secondary_btn['label'] ) : ?>
                <a href="<?php echo esc_url( $secondary_btn['url'] ); ?>"
                    class="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-full text-sm font-semibold hover:bg-white/10 transition-colors">
                    <?php echo esc_html( $secondary_btn['label'] ); ?>
                </a>
                <?php endif; ?>
            </div>
            <?php endif; ?>

        </div>
    </section>
</div>
