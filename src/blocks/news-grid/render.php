<?php
$section_title  = $attributes['sectionTitle'] ?? '';
$more_label     = $attributes['moreLinkLabel'] ?? '';
$more_url       = $attributes['moreLinkUrl'] ?? '';
$articles       = $attributes['articles'] ?? [];
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <section class="w-full py-14 px-8">
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

            <!-- Articles grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <?php foreach ( $articles as $article ) : ?>
                <article class="flex flex-col gap-3">
                    <?php if ( ! empty( $article['imageUrl'] ) ) : ?>
                    <a href="<?php echo esc_url( $article['url'] ); ?>"
                        class="block overflow-hidden rounded-xl aspect-[4/3]">
                        <img src="<?php echo esc_url( $article['imageUrl'] ); ?>"
                            alt="<?php echo esc_attr( $article['imageAlt'] ); ?>"
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </a>
                    <?php endif; ?>

                    <div class="flex items-center gap-2">
                        <?php if ( ! empty( $article['category'] ) ) : ?>
                        <span
                            class="type-label text-banner-heading"><?php echo esc_html( $article['category'] ); ?></span>
                        <?php endif; ?>
                        <?php if ( ! empty( $article['date'] ) ) : ?>
                        <span class="type-caption text-banner-text">· <?php echo esc_html( $article['date'] ); ?></span>
                        <?php endif; ?>
                    </div>

                    <?php if ( ! empty( $article['title'] ) ) : ?>
                    <h3 class="type-h3 text-banner-heading leading-snug">
                        <a href="<?php echo esc_url( $article['url'] ); ?>" class="hover:underline">
                            <?php echo esc_html( $article['title'] ); ?>
                        </a>
                    </h3>
                    <?php endif; ?>

                    <?php if ( ! empty( $article['excerpt'] ) ) : ?>
                    <p class="type-body text-banner-text"><?php echo esc_html( $article['excerpt'] ); ?></p>
                    <?php endif; ?>
                </article>
                <?php endforeach; ?>
            </div>

        </div>
    </section>
</div>