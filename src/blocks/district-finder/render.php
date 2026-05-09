<?php
$image_url        = $attributes['imageUrl'] ?? '';
$image_alt        = $attributes['imageAlt'] ?? '';
$right_title      = $attributes['rightTitle'] ?? '';
$right_description = $attributes['rightDescription'] ?? '';
$button_label     = $attributes['buttonLabel'] ?? '';
$button_url       = $attributes['buttonUrl'] ?? '';
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <section class="w-full flex flex-col md:flex-row min-h-[420px]">

        <!-- Left: image with dark overlay -->
        <div class="relative flex-1 min-h-[280px] overflow-hidden">
            <?php if ( $image_url ) : ?>
            <img
                src="<?php echo esc_url( $image_url ); ?>"
                alt="<?php echo esc_attr( $image_alt ); ?>"
                class="absolute inset-0 w-full h-full object-cover"
            />
            <?php else : ?>
            <div class="absolute inset-0 bg-banner-blue"></div>
            <?php endif; ?>
            <div class="absolute inset-0 bg-black/20"></div>
        </div>

        <!-- Right: blue panel with content -->
        <div class="flex-1 bg-banner-heading flex items-center px-12 py-14">
            <div class="max-w-sm">
                <?php if ( $right_title ) : ?>
                <h2 class="type-h2 text-white mb-5"><?php echo esc_html( $right_title ); ?></h2>
                <?php endif; ?>
                <?php if ( $right_description ) : ?>
                <p class="type-body text-white/85 mb-8"><?php echo esc_html( $right_description ); ?></p>
                <?php endif; ?>
                <?php if ( $button_label && $button_url ) : ?>
                <a href="<?php echo esc_url( $button_url ); ?>"
                    class="inline-flex items-center px-6 py-3 bg-white text-banner-heading rounded-full text-sm font-semibold hover:bg-banner-peach transition-colors">
                    <?php echo esc_html( $button_label ); ?>
                </a>
                <?php endif; ?>
            </div>
        </div>

    </section>
</div>
