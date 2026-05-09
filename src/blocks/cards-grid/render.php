<?php
$section_title       = $attributes['sectionTitle'] ?? '';
$section_description = $attributes['sectionDescription'] ?? '';
$cards               = $attributes['cards'] ?? [];

$overlay_classes = [
    'peach' => 'bg-banner-peach',
    'blue'  => 'bg-banner-blue',
];
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <section class="w-full py-16 px-8">
        <div class="max-w-6xl mx-auto">

            <!-- Section header -->
            <?php if ( $section_title || $section_description ) : ?>
            <div class="mb-10">
                <?php if ( $section_title ) : ?>
                <h2 class="type-h2 text-banner-heading mb-4"><?php echo esc_html( $section_title ); ?></h2>
                <?php endif; ?>
                <?php if ( $section_description ) : ?>
                <p class="type-body-lg text-banner-text max-w-2xl"><?php echo esc_html( $section_description ); ?></p>
                <?php endif; ?>
            </div>
            <?php endif; ?>

            <!-- 2x2 cards grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <?php foreach ( $cards as $card ) :
                    $overlay = $overlay_classes[ $card['colorVariant'] ?? 'peach' ] ?? 'bg-banner-peach';
                ?>
                <a href="<?php echo esc_url( $card['linkUrl'] ?? '' ); ?>"
                    class="group relative overflow-hidden rounded-2xl min-h-[300px] flex flex-col justify-end">

                    <!-- Background image -->
                    <?php if ( ! empty( $card['imageUrl'] ) ) : ?>
                    <img
                        src="<?php echo esc_url( $card['imageUrl'] ); ?>"
                        alt="<?php echo esc_attr( $card['imageAlt'] ?? '' ); ?>"
                        class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <?php else : ?>
                    <div class="absolute inset-0 bg-gray-200"></div>
                    <?php endif; ?>

                    <!-- Colored label overlay at bottom -->
                    <div class="relative <?php echo esc_attr( $overlay ); ?> px-6 py-5 flex items-start justify-between gap-4">
                        <div>
                            <?php if ( ! empty( $card['title'] ) ) : ?>
                            <h3 class="type-h3 text-banner-heading mb-1"><?php echo esc_html( $card['title'] ); ?></h3>
                            <?php endif; ?>
                            <?php if ( ! empty( $card['description'] ) ) : ?>
                            <p class="type-body text-banner-text"><?php echo esc_html( $card['description'] ); ?></p>
                            <?php endif; ?>
                        </div>
                        <span class="shrink-0 mt-1 text-banner-heading text-xl font-bold">→</span>
                    </div>

                </a>
                <?php endforeach; ?>
            </div>

        </div>
    </section>
</div>
