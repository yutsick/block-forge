<?php
$image_url         = $attributes['imageUrl'] ?? '';
$image_alt         = $attributes['imageAlt'] ?? '';
$right_title       = $attributes['rightTitle'] ?? '';
$right_description = $attributes['rightDescription'] ?? '';
$button_label      = $attributes['buttonLabel'] ?? '';
$button_url        = $attributes['buttonUrl'] ?? '';
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <section class="w-full flex flex-col md:flex-row min-h-[360px]">

        <!-- Left: photo -->
        <div class="relative flex-[3] min-h-[260px] overflow-hidden">
            <?php if ( $image_url ) : ?>
            <img
                src="<?php echo esc_url( $image_url ); ?>"
                alt="<?php echo esc_attr( $image_alt ); ?>"
                class="absolute inset-0 w-full h-full object-cover"
            />
            <?php else : ?>
            <div class="absolute inset-0 bg-banner-blue"></div>
            <?php endif; ?>
        </div>

        <!-- Right: peach panel -->
        <div class="flex-[2] bg-banner-peach flex items-center px-14 py-14">
            <div class="max-w-sm">
                <?php if ( $right_title ) : ?>
                <h2 class="type-h2 text-banner-heading mb-5"><?php echo esc_html( $right_title ); ?></h2>
                <?php endif; ?>
                <?php if ( $right_description ) : ?>
                <p class="type-body text-banner-text mb-7"><?php echo esc_html( $right_description ); ?></p>
                <?php endif; ?>
                <?php if ( $button_label && $button_url ) : ?>
                <a href="<?php echo esc_url( $button_url ); ?>"
                    class="inline-flex items-center gap-1 text-banner-heading type-body font-semibold hover:underline">
                    <?php echo esc_html( $button_label ); ?> →
                </a>
                <?php endif; ?>
            </div>
        </div>

    </section>
</div>
