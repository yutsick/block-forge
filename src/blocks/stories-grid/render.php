<?php
$section_title = $attributes['sectionTitle'] ?? '';
$more_label    = $attributes['moreLinkLabel'] ?? '';
$more_url      = $attributes['moreLinkUrl'] ?? '';
$stories       = $attributes['stories'] ?? [];
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <section class="w-full py-14 px-8 bg-white">
        <div class="max-w-6xl mx-auto">

            <!-- Section header -->
            <div class="flex items-center justify-between mb-8">
                <?php if ( $section_title ) : ?>
                <h2 class="type-label text-banner-text"><?php echo esc_html( $section_title ); ?></h2>
                <?php endif; ?>
                <?php if ( $more_label && $more_url ) : ?>
                <a href="<?php echo esc_url( $more_url ); ?>"
                    class="type-caption text-banner-heading font-semibold hover:underline">
                    <?php echo esc_html( $more_label ); ?> →
                </a>
                <?php endif; ?>
            </div>

            <!-- Stories grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <?php foreach ( $stories as $story ) : ?>
                <article class="flex flex-col gap-4">

                    <!-- Portrait image -->
                    <?php if ( ! empty( $story['imageUrl'] ) ) : ?>
                    <a href="<?php echo esc_url( $story['url'] ?? '' ); ?>"
                        class="block overflow-hidden rounded-2xl aspect-[4/3]">
                        <img
                            src="<?php echo esc_url( $story['imageUrl'] ); ?>"
                            alt="<?php echo esc_attr( $story['imageAlt'] ?? '' ); ?>"
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </a>
                    <?php endif; ?>

                    <!-- Meta -->
                    <div class="flex items-center gap-2">
                        <?php if ( ! empty( $story['category'] ) ) : ?>
                        <span class="type-label text-banner-text"><?php echo esc_html( $story['category'] ); ?></span>
                        <?php endif; ?>
                        <?php if ( ! empty( $story['location'] ) ) : ?>
                        <span class="type-caption text-banner-text">· <?php echo esc_html( $story['location'] ); ?></span>
                        <?php endif; ?>
                    </div>

                    <!-- Quote title -->
                    <?php if ( ! empty( $story['title'] ) ) : ?>
                    <h3 class="type-h3 text-banner-heading leading-snug">
                        <a href="<?php echo esc_url( $story['url'] ?? '' ); ?>" class="hover:underline">
                            <?php echo esc_html( $story['title'] ); ?>
                        </a>
                    </h3>
                    <?php endif; ?>

                    <!-- Excerpt -->
                    <?php if ( ! empty( $story['excerpt'] ) ) : ?>
                    <p class="type-body text-banner-text"><?php echo esc_html( $story['excerpt'] ); ?></p>
                    <?php endif; ?>

                </article>
                <?php endforeach; ?>
            </div>

        </div>
    </section>
</div>
