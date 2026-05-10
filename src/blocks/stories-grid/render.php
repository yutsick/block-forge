<?php
$section_title   = $attributes['sectionTitle'] ?? '';
$more_label      = $attributes['moreLinkLabel'] ?? '';
$more_url        = $attributes['moreLinkUrl'] ?? '';
$number_of_posts = intval( $attributes['numberOfPosts'] ?? 3 );
$post_type       = sanitize_key( $attributes['postType'] ?? 'post' );
$offset          = intval( $attributes['offset'] ?? 0 );

$query = new WP_Query( [
    'post_type'      => $post_type,
    'posts_per_page' => $number_of_posts,
    'offset'         => $offset,
    'post_status'    => 'publish',
    'orderby'        => 'date',
    'order'          => 'DESC',
] );
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
            <?php if ( $query->have_posts() ) : ?>
            <div class="grid grid-cols-1 md:grid-cols-<?php echo esc_attr( $number_of_posts ); ?> gap-6">
                <?php while ( $query->have_posts() ) : $query->the_post(); ?>
                <?php
                    $thumbnail_url = get_the_post_thumbnail_url( get_the_ID(), 'large' );
                    $categories    = get_the_category();
                    $category_name = ! empty( $categories ) ? $categories[0]->name : '';
                    $author_name   = get_the_author_meta( 'display_name', get_the_author_meta( 'ID' ) );
                ?>
                <article class="flex flex-col gap-4">

                    <!-- Image -->
                    <a href="<?php the_permalink(); ?>" class="block overflow-hidden rounded-2xl aspect-[4/3]">
                        <?php if ( $thumbnail_url ) : ?>
                        <img
                            src="<?php echo esc_url( $thumbnail_url ); ?>"
                            alt="<?php echo esc_attr( get_the_title() ); ?>"
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <?php else : ?>
                        <div class="w-full h-full bg-banner-blue flex items-center justify-center">
                            <span class="type-label text-banner-heading">movendi</span>
                        </div>
                        <?php endif; ?>
                    </a>

                    <!-- Meta -->
                    <div class="flex items-center gap-2">
                        <?php if ( $category_name ) : ?>
                        <span class="type-label text-banner-text"><?php echo esc_html( $category_name ); ?></span>
                        <?php endif; ?>
                        <span class="type-caption text-banner-text">· <?php echo get_the_date( 'j M Y' ); ?></span>
                    </div>

                    <!-- Title -->
                    <h3 class="type-h3 text-banner-heading leading-snug">
                        <a href="<?php the_permalink(); ?>" class="hover:underline">
                            <?php the_title(); ?>
                        </a>
                    </h3>

                    <!-- Excerpt -->
                    <p class="type-body text-banner-text"><?php echo wp_trim_words( get_the_excerpt(), 20 ); ?></p>

                </article>
                <?php endwhile; ?>
            </div>
            <?php else : ?>
            <p class="type-body text-banner-text"><?php esc_html_e( 'No posts found.', 'block-forge' ); ?></p>
            <?php endif; ?>

            <?php wp_reset_postdata(); ?>

        </div>
    </section>
</div>
