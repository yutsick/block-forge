<?php
$section_title       = $attributes['sectionTitle'] ?? '';
$section_description = $attributes['sectionDescription'] ?? '';
$bg_color            = $attributes['backgroundColor'] ?? 'white';
$visible_links       = intval( $attributes['visibleLinks'] ?? 3 );
$cards               = $attributes['cards'] ?? [];

$bg_classes = [
    'white' => 'bg-white',
    'dark'  => 'bg-gray-900',
    'blue'  => 'bg-banner-blue',
    'peach' => 'bg-banner-peach',
];
$bg_class = $bg_classes[ $bg_color ] ?? 'bg-white';
$is_dark  = $bg_color === 'dark';

$heading_class     = $is_dark ? 'text-gray-100' : 'text-banner-heading';
$body_class        = $is_dark ? 'text-gray-400'  : 'text-banner-text';
$link_class        = $is_dark ? 'text-blue-400'  : 'text-banner-heading';
$btn_border_class  = $is_dark ? 'border-gray-600 text-gray-300 hover:border-gray-400' : 'border-gray-300 text-banner-heading hover:border-banner-heading';
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <section class="w-full <?php echo $bg_class; ?> py-14 px-8">
        <div class="max-w-6xl mx-auto">

            <!-- Section header -->
            <?php if ( $section_title || $section_description ) : ?>
            <div class="mb-10">
                <?php if ( $section_title ) : ?>
                <h2 class="type-h2 <?php echo $heading_class; ?> mb-4"><?php echo esc_html( $section_title ); ?></h2>
                <?php endif; ?>
                <?php if ( $section_description ) : ?>
                <p class="type-body-lg <?php echo $body_class; ?> max-w-3xl"><?php echo esc_html( $section_description ); ?></p>
                <?php endif; ?>
            </div>
            <?php endif; ?>

            <!-- 2×2 grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <?php foreach ( $cards as $card ) :
                    $links       = $card['links'] ?? [];
                    $visible     = array_slice( $links, 0, $visible_links );
                    $hidden      = array_slice( $links, $visible_links );
                    $show_label  = $card['showMoreLabel'] ?? 'Visa fler';
                    $has_more    = count( $hidden ) > 0;
                ?>
                <div class="services-card flex flex-col gap-4">

                    <!-- Image -->
                    <?php if ( ! empty( $card['imageUrl'] ) ) : ?>
                    <div class="overflow-hidden rounded-2xl aspect-[16/9]">
                        <img
                            src="<?php echo esc_url( $card['imageUrl'] ); ?>"
                            alt="<?php echo esc_attr( $card['imageAlt'] ?? '' ); ?>"
                            class="w-full h-full object-cover"
                        />
                    </div>
                    <?php else : ?>
                    <div class="rounded-2xl aspect-[16/9] bg-banner-blue"></div>
                    <?php endif; ?>

                    <!-- Title -->
                    <?php if ( ! empty( $card['title'] ) ) : ?>
                    <h3 class="type-h3 <?php echo $heading_class; ?>"><?php echo esc_html( $card['title'] ); ?></h3>
                    <?php endif; ?>

                    <!-- Description -->
                    <?php if ( ! empty( $card['description'] ) ) : ?>
                    <p class="type-body <?php echo $body_class; ?>"><?php echo esc_html( $card['description'] ); ?></p>
                    <?php endif; ?>

                    <!-- Visible links -->
                    <?php if ( $visible ) : ?>
                    <ul class="flex flex-col gap-2">
                        <?php foreach ( $visible as $link ) : ?>
                        <li>
                            <a href="<?php echo esc_url( $link['url'] ?? '' ); ?>"
                                class="inline-flex items-center gap-1 type-body <?php echo $link_class; ?> font-medium hover:underline">
                                <?php echo esc_html( $link['label'] ?? '' ); ?> →
                            </a>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                    <?php endif; ?>

                    <!-- Hidden links (revealed by toggle) -->
                    <?php if ( $has_more ) : ?>
                    <ul class="services-card__more hidden flex flex-col gap-2">
                        <?php foreach ( $hidden as $link ) : ?>
                        <li>
                            <a href="<?php echo esc_url( $link['url'] ?? '' ); ?>"
                                class="inline-flex items-center gap-1 type-body <?php echo $link_class; ?> font-medium hover:underline">
                                <?php echo esc_html( $link['label'] ?? '' ); ?> →
                            </a>
                        </li>
                        <?php endforeach; ?>
                    </ul>

                    <!-- Show more button -->
                    <button
                        type="button"
                        class="services-card__toggle self-start inline-flex items-center gap-2 px-4 py-2 rounded-full border <?php echo $btn_border_class; ?> type-caption font-semibold transition-colors"
                        aria-expanded="false"
                    >
                        <span class="services-card__toggle-label"><?php echo esc_html( $show_label ); ?></span>
                        <svg class="services-card__chevron w-4 h-4 transition-transform" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 6l4 4 4-4"/>
                        </svg>
                    </button>
                    <?php endif; ?>

                </div>
                <?php endforeach; ?>
            </div>

        </div>
    </section>
</div>
