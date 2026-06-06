<?php
$section_title       = $attributes['sectionTitle'] ?? '';
$section_description = $attributes['sectionDescription'] ?? '';
$bg_color            = $attributes['backgroundColor'] ?? 'white';
$vertical_spacing    = $attributes['verticalSpacing'] ?? 'both';
$visible_links       = intval( $attributes['visibleLinks'] ?? 3 );
$cards               = $attributes['cards'] ?? [];

$spacing_classes = [
    'both'   => 'py-8 md:py-14',
    'top'    => 'pt-8 md:pt-14',
    'bottom' => 'pb-8 md:pb-14',
    'none'   => '',
];
$spacing_class = $spacing_classes[ $vertical_spacing ] ?? 'py-8 md:py-14';

$section_title_style       = block_forge_inline_style( $attributes['sectionTitleStyle'] ?? [] );
$section_description_style = block_forge_inline_style( $attributes['sectionDescriptionStyle'] ?? [] );
$card_title_style          = block_forge_inline_style( $attributes['cardTitleStyle'] ?? [] );
$card_description_style    = block_forge_inline_style( $attributes['cardDescriptionStyle'] ?? [] );
$link_label_style          = block_forge_inline_style( $attributes['linkLabelStyle'] ?? [] );

$bg_classes = [
    'white' => 'bg-white',
    'dark'  => 'bg-gray-900',
    'blue'  => 'bg-banner-blue',
    'peach' => 'bg-banner-peach',
];
$bg_class = $bg_classes[ $bg_color ] ?? 'bg-white';
$is_dark  = $bg_color === 'dark';

$heading_class     = $is_dark ? 'text-gray-100' : 'text-[#2F2F2F]';
$body_class        = $is_dark ? 'text-gray-400'  : 'text-banner-text';
$btn_class         = $is_dark
    ? 'border-gray-600 text-gray-300 hover:border-gray-400'
    : 'border-[#27348B] text-[#27348B] hover:bg-[#27348B]/5';
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <section class="w-full <?php echo esc_attr( $bg_class . ' ' . $spacing_class ); ?> px-8">
        <div class="max-w-[1120px] mx-auto">

            <!-- Section header -->
            <?php if ( $section_title || $section_description ) : ?>
            <div class="mb-10">
                <?php if ( $section_title ) : ?>
                <h2 class="type-h3 <?php echo $heading_class; ?> mb-4"
                    <?php if ( $section_title_style ) echo 'style="' . esc_attr( $section_title_style ) . '"'; ?>>
                    <?php echo wp_kses( $section_title, [] ); ?>
                </h2>
                <?php endif; ?>
                <?php if ( $section_description ) : ?>
                <p class="type-ingress <?php echo $body_class; ?> max-w-[928px]"
                    <?php if ( $section_description_style ) echo 'style="' . esc_attr( $section_description_style ) . '"'; ?>>
                    <?php echo wp_kses( $section_description, [ 'strong' => [], 'em' => [], 'b' => [], 'i' => [] ] ); ?>
                </p>
                <?php endif; ?>
            </div>
            <?php endif; ?>

            <!-- 2×2 grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-y-14">
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
                    <div class="overflow-hidden rounded-[8px] h-[236px]">
                        <img src="<?php echo esc_url( $card['imageUrl'] ); ?>"
                            alt="<?php echo esc_attr( $card['imageAlt'] ?? '' ); ?>"
                            class="w-full h-full object-cover" />
                    </div>
                    <?php else : ?>
                    <div class="rounded-[8px] h-[236px] bg-banner-blue"></div>
                    <?php endif; ?>

                    <!-- Title -->
                    <?php if ( ! empty( $card['title'] ) ) :
                        $title_url = $card['titleUrl'] ?? '';
                    ?>
                    <?php if ( $title_url ) : ?>
                    <a href="<?php echo esc_url( $title_url ); ?>"
                        class="services-card__title-link group inline-flex items-center gap-2 no-underline">
                        <h3 class="type-h4 <?php echo $heading_class; ?> group-hover:underline"
                            <?php if ( $card_title_style ) echo 'style="' . esc_attr( $card_title_style ) . '"'; ?>>
                            <?php echo wp_kses( $card['title'], [] ); ?>
                        </h3>

                        <svg class="shrink-0 transition-transform duration-200 ease-out mt-1 group-hover:translate-x-1"
                            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 12.375L19.25 12.375" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12.5 19.125L19.25 12.375L12.5 5.625" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </a>
                    <?php else : ?>
                    <h3 class="type-h4 <?php echo $heading_class; ?>"
                        <?php if ( $card_title_style ) echo 'style="' . esc_attr( $card_title_style ) . '"'; ?>>
                        <?php echo wp_kses( $card['title'], [] ); ?>
                    </h3>
                    <?php endif; ?>
                    <?php endif; ?>

                    <!-- Description -->
                    <?php if ( ! empty( $card['description'] ) ) : ?>
                    <p class="type-body <?php echo $body_class; ?>"
                        <?php if ( $card_description_style ) echo 'style="' . esc_attr( $card_description_style ) . '"'; ?>>
                        <?php echo wp_kses( $card['description'], [ 'strong' => [], 'em' => [], 'b' => [], 'i' => [] ] ); ?>
                    </p>
                    <?php endif; ?>

                    <!-- Visible links -->
                    <?php if ( $visible ) : ?>
                    <ul class="block-forge-list services-card__links flex flex-col gap-2.5">
                        <?php foreach ( $visible as $link ) : ?>
                        <li>
                            <a href="<?php echo esc_url( $link['url'] ?? '' ); ?>"
                                class="services-card__link inline-flex items-center gap-1 type-regular-link no-underline"
                                <?php if ( $link_label_style ) echo 'style="' . esc_attr( $link_label_style ) . '"'; ?>>
                                <span
                                    class="services-card__link-text"><?php echo wp_kses( $link['label'] ?? '', [] ); ?></span>
                                <svg class="services-card__link-arrow" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 12.375L19.25 12.375" stroke="currentColor" stroke-width="1.8"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12.5 19.125L19.25 12.375L12.5 5.625" stroke="currentColor"
                                        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </a>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                    <?php endif; ?>

                    <!-- Hidden links (revealed by toggle) -->
                    <?php if ( $has_more ) : ?>
                    <ul class="services-card__more block-forge-list hidden flex flex-col gap-2.5 -mt-1.5">
                        <?php foreach ( $hidden as $link ) : ?>
                        <li>
                            <a href="<?php echo esc_url( $link['url'] ?? '' ); ?>"
                                class="services-card__link inline-flex items-center gap-1 type-regular-link no-underline"
                                <?php if ( $link_label_style ) echo 'style="' . esc_attr( $link_label_style ) . '"'; ?>>
                                <span
                                    class="services-card__link-text"><?php echo wp_kses( $link['label'] ?? '', [] ); ?></span>
                                <svg class="services-card__link-arrow" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 12.375L19.25 12.375" stroke="currentColor" stroke-width="1.8"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12.5 19.125L19.25 12.375L12.5 5.625" stroke="currentColor"
                                        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </a>
                        </li>
                        <?php endforeach; ?>
                    </ul>

                    <!-- Show more button -->
                    <button type="button"
                        class="services-card__toggle cursor-pointer self-start inline-flex items-center gap-1.5 h-[30px] pl-[18px] pr-[14px] rounded-full border font-barlow-semicondensed font-medium text-[16px] leading-none transition-colors <?php echo $btn_class; ?>"
                        aria-expanded="false">
                        <span class="services-card__toggle-label"><?php echo esc_html( $show_label ); ?></span>
                        <svg class="services-card__chevron w-5 h-5 transition-transform" viewBox="0 0 20 20" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 7.5l5 5 5-5" />
                        </svg>
                    </button>
                    <?php endif; ?>

                </div>
                <?php endforeach; ?>
            </div>

        </div>
    </section>
</div>