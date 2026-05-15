<?php
$section_title    = $attributes['sectionTitle'] ?? '';
$more_label       = $attributes['moreLinkLabel'] ?? '';
$more_url         = $attributes['moreLinkUrl'] ?? '';
$number_of_posts  = intval( $attributes['numberOfPosts'] ?? 3 );
$post_type        = sanitize_key( $attributes['postType'] ?? 'post' );
$offset           = intval( $attributes['offset'] ?? 0 );
$selected_post_ids = array_map( 'intval', (array) ( $attributes['selectedPostIds'] ?? [] ) );

$query_args = [
    'post_type'      => $post_type,
    'posts_per_page' => $number_of_posts,
    'post_status'    => 'publish',
    'orderby'        => 'date',
    'order'          => 'DESC',
];

if ( ! empty( $selected_post_ids ) ) {
    $query_args['post__in'] = $selected_post_ids;
    $query_args['orderby']  = 'post__in';
    $query_args['posts_per_page'] = count( $selected_post_ids );
} else {
    $query_args['offset'] = $offset;
}

$query = new WP_Query( $query_args );
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <section class="w-full py-14 px-8" data-aos="fade-up">
        <div class="max-w-[1120px] mx-auto">

            <!-- Section header -->
            <div class="flex  justify-between mb-8">
                <?php if ( $section_title ) : ?>
                <h2 class="type-label text-black"><?php echo esc_html( $section_title ); ?></h2>
                <?php endif; ?>
                <?php if ( $more_label && $more_url ) : ?>
                <a href="<?php echo esc_url( $more_url ); ?>"
                    class="hidden lg:flex type-regular-link hover:underline items-center gap-1 md:mt-2.5">
                    <?php echo esc_html( $more_label ); ?>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12.375L19.25 12.375" stroke="#27348B" stroke-width="1.8" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M12.5 19.125L19.25 12.375L12.5 5.625" stroke="#27348B" stroke-width="1.8"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </a>
                <?php endif; ?>
            </div>

            <!-- Articles grid -->
            <?php if ( $query->have_posts() ) : ?>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <?php while ( $query->have_posts() ) : $query->the_post(); ?>
                <?php
                    $post_id           = get_the_ID();
                    $permalink         = get_permalink();
                    $thumbnail_url     = get_the_post_thumbnail_url( $post_id, 'large' );
                    $thumbnail_alt     = get_post_meta( get_post_thumbnail_id( $post_id ), '_wp_attachment_image_alt', true );
                    $categories        = get_the_category();
                    $category_name     = ! empty( $categories ) ? $categories[0]->name : '';
                    $date_display      = get_the_date( 'j M Y' );
                    $excerpt           = get_the_excerpt();
                    $is_review         = ( 'review' === $post_type );
                    $reviewer_name     = $is_review ? (string) get_post_meta( $post_id, '_movendi_reviewer_name', true ) : '';
                    $reviewer_position = $is_review ? (string) get_post_meta( $post_id, '_movendi_reviewer_position', true ) : '';
                ?>
                <article class="flex flex-col gap-3">
                    <?php if ( $thumbnail_url ) : ?>
                    <a href="<?php echo esc_url( $permalink ); ?>"
                        class="block overflow-hidden rounded-xl aspect-[4/3]">
                        <img src="<?php echo esc_url( $thumbnail_url ); ?>"
                            alt="<?php echo esc_attr( $thumbnail_alt ?: get_the_title() ); ?>"
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </a>
                    <?php endif; ?>

                    <?php if ( $is_review ) : ?>
                    <div class="flex items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_16655_300)">
                                <path
                                    d="M10 15.9287C14.1421 15.9287 17.5 12.5708 17.5 8.42871C17.5 4.28658 14.1421 0.928711 10 0.928711C5.85786 0.928711 2.5 4.28658 2.5 8.42871C2.5 12.5708 5.85786 15.9287 10 15.9287Z"
                                    stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M10 10.9287C11.7259 10.9287 13.125 9.5296 13.125 7.80371C13.125 6.07782 11.7259 4.67871 10 4.67871C8.27411 4.67871 6.875 6.07782 6.875 7.80371C6.875 9.5296 8.27411 10.9287 10 10.9287Z"
                                    stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M4.98438 14.0044C6.39062 11.2341 9.77656 10.1286 12.5461 11.5348C13.6102 12.0755 14.475 12.9395 15.0156 14.0044"
                                    stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_16655_300">
                                    <rect width="20" height="20" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                        <?php if ( $reviewer_name ) : ?>
                        <span
                            class="uppercase font-barlow-semicondensed text-sm font-semibold tracking-[0.03em] text-black"><?php echo esc_html( strtoupper( $reviewer_name ) ); ?></span>
                        <?php endif; ?>
                        <?php if ( $reviewer_position ) : ?>
                        <span class="type-caption text-sm text-banner-text">
                            <?php echo esc_html( strtoupper( $reviewer_position ) ); ?></span>
                        <?php endif; ?>
                    </div>
                    <?php else : ?>
                    <div class="flex items-center gap-2">
                        <?php if ( $category_name ) : ?>
                        <span
                            class="uppercase font-semibold text-sm text-grey font-barlow-semicondensed tracking-[0.11em]"><?php echo esc_html( $category_name ); ?></span>
                        <?php endif; ?>
                        <?php if ( $date_display ) : ?>
                        <span class="type-body text-grey ">|
                            <?php echo esc_html( $date_display ); ?></span>
                        <?php endif; ?>
                    </div>
                    <?php endif; ?>

                    <h3
                        class="font-barlow-semicondensed text-[32px] text-black font-semibold leading-snug tracking-[-0.01em]">
                        <a href="<?php echo esc_url( $permalink ); ?>" class="no-underline hover:underline">
                            <?php the_title(); ?>
                        </a>
                    </h3>

                    <?php if ( $excerpt ) : ?>
                    <p class="type-body-lg text-banner-text"><?php echo esc_html( $excerpt ); ?></p>
                    <?php endif; ?>
                </article>
                <?php endwhile; ?>
            </div>
            <?php if ( $more_label && $more_url ) : ?>
            <a href="<?php echo esc_url( $more_url ); ?>"
                class="lg:hidden flex type-regular-link w-full justify-center rounded-full h-10 border border-main items-center gap-1 mt-6">
                <?php echo esc_html( $more_label ); ?>

            </a>
            <?php endif; ?>
            <?php else : ?>
            <p class="type-body text-banner-text"><?php esc_html_e( 'No posts found.', 'block-forge' ); ?></p>
            <?php endif; ?>

            <?php wp_reset_postdata(); ?>

        </div>
    </section>
</div>