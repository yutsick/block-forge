<?php
$section_title       = $attributes['sectionTitle'] ?? '';
$section_description = $attributes['sectionDescription'] ?? '';
$more_label          = $attributes['moreLinkLabel'] ?? '';
$more_url            = $attributes['moreLinkUrl'] ?? '';
$anchor_id           = $attributes['anchorId'] ?? '';
$number_of_posts     = intval( $attributes['numberOfPosts'] ?? 3 );
$post_type           = sanitize_key( $attributes['postType'] ?? 'post' );
$offset              = intval( $attributes['offset'] ?? 0 );
$selected_post_ids   = array_map( 'intval', (array) ( $attributes['selectedPostIds'] ?? [] ) );

$section_title_style       = block_forge_inline_style( $attributes['sectionTitleStyle'] ?? [] );
$section_description_style = block_forge_inline_style( $attributes['sectionDescriptionStyle'] ?? [] );
$more_link_style           = block_forge_inline_style( $attributes['moreLinkStyle'] ?? [] );
$is_review                 = ( 'review' === $post_type );

/**
 * Build the list of post IDs to display.
 *
 *  - No selected posts → straight date-DESC query with offset.
 *  - Selected posts only, count ≥ numberOfPosts → show the first
 *    `numberOfPosts` of the selection (manual order preserved).
 *  - Selected posts, count < numberOfPosts → show the selection FIRST
 *    in manual order, then fill the remainder (numberOfPosts − selected)
 *    with the latest posts by date DESC, excluding the already-selected
 *    IDs, honouring the offset.
 */
if ( empty( $selected_post_ids ) ) {
    $query_args = [
        'post_type'      => $post_type,
        'posts_per_page' => $number_of_posts,
        'post_status'    => 'publish',
        'orderby'        => 'date',
        'order'          => 'DESC',
        'offset'         => $offset,
    ];
    $query = new WP_Query( $query_args );
} else {
    // Cap the manual selection to the requested grid size.
    $manual_ids = array_slice( $selected_post_ids, 0, $number_of_posts );
    $remaining  = $number_of_posts - count( $manual_ids );

    $final_ids = $manual_ids;

    if ( $remaining > 0 ) {
        $fill_query = new WP_Query(
            [
                'post_type'      => $post_type,
                'posts_per_page' => $remaining,
                'post_status'    => 'publish',
                'orderby'        => 'date',
                'order'          => 'DESC',
                'offset'         => $offset,
                'post__not_in'   => $manual_ids,
                'fields'         => 'ids',
                'no_found_rows'  => true,
            ]
        );
        $final_ids = array_merge( $manual_ids, $fill_query->posts );
    }

    $query = new WP_Query(
        [
            'post_type'      => $post_type,
            'post_status'    => 'publish',
            'post__in'       => $final_ids,
            'orderby'        => 'post__in',
            'posts_per_page' => count( $final_ids ),
            'ignore_sticky_posts' => true,
            'no_found_rows'  => true,
        ]
    );
}
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <section <?php if ( $anchor_id ) echo 'id="' . esc_attr( $anchor_id ) . '"'; ?> class="w-full py-14 px-4 md:px-8"
        data-aos="fade-up">
        <div class="max-w-[1120px] mx-auto">

            <!-- Section header -->
            <?php
            // Tighter bottom margin on the header row when a description follows.
            $header_mb_class = $section_description
                ? 'mb-4'
                : ( $is_review ? 'mb-6' : 'mb-[47px]' );
            ?>
            <div class="flex  justify-between <?php echo esc_attr( $header_mb_class ); ?>">
                <?php if ( $section_title ) : ?>
                <h2 class="type-label text-black"
                    <?php if ( $section_title_style ) echo 'style="' . esc_attr( $section_title_style ) . '"'; ?>>
                    <?php echo wp_kses( $section_title, [] ); ?>
                </h2>
                <?php endif; ?>
                <?php if ( $more_label && $more_url ) : ?>
                <a href="<?php echo esc_url( $more_url ); ?>"
                    class="hidden lg:flex type-regular-link hover:underline items-center gap-1 md:mt-2.5"
                    <?php if ( $more_link_style ) echo 'style="' . esc_attr( $more_link_style ) . '"'; ?>>
                    <?php echo wp_kses( $more_label, [] ); ?>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12.375L19.25 12.375" stroke="#27348B" stroke-width="1.8" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M12.5 19.125L19.25 12.375L12.5 5.625" stroke="#27348B" stroke-width="1.8"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </a>
                <?php endif; ?>
            </div>

            <?php if ( $section_description ) : ?>
            <p class="type-body font-ancizar-serif text-grey max-w-[760px] mb-8"
                <?php if ( $section_description_style ) echo 'style="' . esc_attr( $section_description_style ) . '"'; ?>>
                <?php echo wp_kses( $section_description, [ 'strong' => [], 'em' => [], 'b' => [], 'i' => [] ] ); ?>
            </p>
            <?php endif; ?>

            <!-- Articles grid -->
            <?php if ( $query->have_posts() ) : ?>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10">
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
                <article class="group flex flex-col gap-3">
                    <?php if ( $thumbnail_url ) : ?>
                    <a href="<?php echo esc_url( $permalink ); ?>"
                        class="block overflow-hidden rounded-xl <?php echo $is_review ? 'aspect-[352/264]' : 'aspect-[352/254]'; ?>">
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
                        <span class="type-caption text-base text-banner-text">
                            <?php echo esc_html(  $reviewer_position  ); ?></span>
                        <?php endif; ?>
                    </div>
                    <?php else : ?>
                    <div class="flex items-center gap-2">
                        <?php if ( $category_name ) : ?>
                        <span
                            class="uppercase font-semibold text-sm text-grey font-barlow-semicondensed tracking-[0.11em]"><?php echo esc_html( $category_name ); ?></span>
                        <?php endif; ?>
                        <?php if ( $date_display ) : ?>
                        <span class="type-body-sm text-grey "><?php echo $category_name ? '| ' : ''; ?><?php echo esc_html( $date_display ); ?></span>
                        <?php endif; ?>
                    </div>
                    <?php endif; ?>

                    <h3
                        class="font-barlow-semicondensed text-[32px] md:-mt-[10px] text-black group-hover:text-[#27348B] transition-colors font-semibold leading-snug tracking-[-0.01em]">
                        <a href="<?php echo esc_url( $permalink ); ?>" class="no-underline">
                            <?php the_title(); ?>
                        </a>
                    </h3>

                    <?php if ( $excerpt ) : ?>
                    <p class="type-body text-banner-text wrap-break-word"><?php echo wp_kses_post( $excerpt ); ?></p>
                    <?php endif; ?>
                </article>
                <?php endwhile; ?>
            </div>
            <?php if ( $more_label && $more_url ) : ?>
            <a href="<?php echo esc_url( $more_url ); ?>"
                class="lg:hidden flex type-regular-link w-full justify-center rounded-full h-10 border border-main items-center gap-1 mt-6"
                <?php if ( $more_link_style ) echo 'style="' . esc_attr( $more_link_style ) . '"'; ?>>
                <?php echo wp_kses( $more_label, [] ); ?>

            </a>
            <?php endif; ?>
            <?php else : ?>
            <p class="type-body-sm text-banner-text"><?php esc_html_e( 'No posts found.', 'block-forge' ); ?></p>
            <?php endif; ?>

            <?php wp_reset_postdata(); ?>

        </div>
    </section>
</div>