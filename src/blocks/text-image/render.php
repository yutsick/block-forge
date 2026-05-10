<?php
$title          = $attributes['title'] ?? '';
$description    = $attributes['description'] ?? '';
$link_label     = $attributes['linkLabel'] ?? '';
$link_url       = $attributes['linkUrl'] ?? '';
$image_url      = $attributes['imageUrl'] ?? '';
$image_alt      = $attributes['imageAlt'] ?? '';
$image_type     = $attributes['imageType'] ?? 'boxed';   // full | boxed
$image_position = $attributes['imagePosition'] ?? 'right'; // left | right
$bg_color       = $attributes['backgroundColor'] ?? 'white';

$bg_classes = [
    'white' => 'bg-white',
    'peach' => 'bg-banner-peach',
    'blue'  => 'bg-banner-blue',
    'pink'  => 'bg-banner-pink',
];
$bg_class = $bg_classes[ $bg_color ] ?? 'bg-white';

// On desktop: flex-row-reverse puts image on the right when it's first in DOM.
// On mobile: flex-col always shows image first (it's first in DOM).
$row_class = $image_position === 'right' ? 'md:flex-row-reverse' : 'md:flex-row';
?>

<div <?php echo get_block_wrapper_attributes(); ?>>

    <?php if ( $image_type === 'full' ) : ?>
    <!-- ── FULL bleed layout ──────────────────────────────── -->
    <section class="w-full flex flex-col <?php echo $row_class; ?> min-h-[400px]">

        <!-- Image column (full bleed) -->
        <div class="relative flex-[3] min-h-[280px] overflow-hidden">
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

        <!-- Text column -->
        <div class="flex-[2] <?php echo $bg_class; ?> flex items-center px-14 py-14">
            <div class="max-w-sm">
                <?php if ( $title ) : ?>
                <h2 class="type-h1 text-banner-heading mb-5"><?php echo wp_kses_post( $title ); ?></h2>
                <?php endif; ?>
                <?php if ( $description ) : ?>
                <p class="type-body text-banner-text mb-6"><?php echo wp_kses_post( $description ); ?></p>
                <?php endif; ?>
                <?php if ( $link_label && $link_url ) : ?>
                <a href="<?php echo esc_url( $link_url ); ?>"
                    class="inline-flex items-center gap-1 type-body font-semibold text-banner-heading hover:underline">
                    <?php echo esc_html( $link_label ); ?> →
                </a>
                <?php endif; ?>
            </div>
        </div>

    </section>

    <?php else : ?>
    <!-- ── BOXED layout ──────────────────────────────────── -->
    <section class="w-full <?php echo $bg_class; ?> py-14 px-8">
        <div class="max-w-6xl mx-auto flex flex-col <?php echo $row_class; ?> items-center gap-10 md:gap-16">

            <!-- Image column (boxed, rounded) -->
            <div class="w-full md:flex-1 shrink-0">
                <?php if ( $image_url ) : ?>
                <img
                    src="<?php echo esc_url( $image_url ); ?>"
                    alt="<?php echo esc_attr( $image_alt ); ?>"
                    class="w-full h-full max-h-[480px] object-cover rounded-2xl"
                />
                <?php else : ?>
                <div class="w-full aspect-[4/3] bg-banner-blue rounded-2xl"></div>
                <?php endif; ?>
            </div>

            <!-- Text column -->
            <div class="w-full md:flex-1 flex flex-col justify-center">
                <?php if ( $title ) : ?>
                <h2 class="type-h1 text-banner-heading mb-5"><?php echo wp_kses_post( $title ); ?></h2>
                <?php endif; ?>
                <?php if ( $description ) : ?>
                <p class="type-body-lg text-banner-text mb-6"><?php echo wp_kses_post( $description ); ?></p>
                <?php endif; ?>
                <?php if ( $link_label && $link_url ) : ?>
                <a href="<?php echo esc_url( $link_url ); ?>"
                    class="inline-flex items-center gap-1 type-body font-semibold text-banner-heading hover:underline">
                    <?php echo esc_html( $link_label ); ?> →
                </a>
                <?php endif; ?>
            </div>

        </div>
    </section>
    <?php endif; ?>

</div>
