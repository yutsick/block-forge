<?php
$background_color = $attributes['backgroundColor'] ?? 'blue';
$image_url = $attributes['imageUrl'] ?? '';
$image_alt = $attributes['imageAlt'] ?? '';
$image_type = $attributes['imageType'] ?? 'full';
$image_position = $attributes['imagePosition'] ?? 'left';
$title = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$cta_type = $attributes['ctaType'] ?? 'none';
$primary_button = $attributes['primaryButton'] ?? ['label' => '', 'url' => ''];
$secondary_button = $attributes['secondaryButton'] ?? ['label' => '', 'url' => ''];
$link_label = $attributes['linkLabel'] ?? '';
$link_url = $attributes['linkUrl'] ?? '';

$bg_colors = [
    'blue'  => 'bg-banner-blue',
    'peach' => 'bg-banner-peach',
    'pink'  => 'bg-banner-pink',
];

$bg_class = $bg_colors[ $background_color ] ?? 'bg-banner-blue';
$is_image_left = $image_position === 'left';
$is_image_full = $image_type === 'full';
?>
<section class="max-w-[1440px] w-full mx-auto">
    <div <?php echo get_block_wrapper_attributes(); ?>>
        <div
            class="relative flex items-center h-[500px] <?php echo $bg_class; ?> <?php echo $is_image_left ? 'flex-row pr-[160px]' : 'flex-row-reverse pl-[160px]'; ?>">

            <div
                class="shrink-0 flex items-center justify-center <?php echo $is_image_full ? 'h-full overflow-visible relative' : 'w-[400px] h-[340px] overflow-hidden rounded-2xl mx-[48px]'; ?>">
                <?php if ( $image_url ) : ?>
                <img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $image_alt ); ?>"
                    class="<?php echo $is_image_full ? 'h-full ' : 'w-full h-full object-cover'; ?>" />
                <?php endif; ?>
            </div>

            <div class="flex-1 flex flex-col gap-8 min-w-0 pb-8 pr-8">
                <?php if ( $title ) : ?>
                <h2
                    class="banner__title text-banner-heading text-[58px] font-semibold leading-[64px] tracking-[-0.58px]">
                    <?php echo wp_kses_post( $title ); ?>
                </h2>
                <?php endif; ?>

                <?php if ( $description ) : ?>
                <p class="banner__description text-banner-text text-[20px] leading-[28px] tracking-[-0.3px]">
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
                    class="inline-flex items-center gap-2 text-banner-heading text-xs font-semibold underline">
                    <?php echo esc_html( $link_label ); ?> →
                </a>
                <?php endif; ?>
            </div>

        </div>
    </div>
</section>