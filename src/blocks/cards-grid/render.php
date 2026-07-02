<?php
$section_title       = $attributes['sectionTitle'] ?? '';
$section_description = $attributes['sectionDescription'] ?? '';
$cards               = $attributes['cards'] ?? [];
$anchor_id           = $attributes['anchorId'] ?? '';

$section_title_style       = block_forge_inline_style( $attributes['sectionTitleStyle'] ?? [] );
$section_description_style = block_forge_inline_style( $attributes['sectionDescriptionStyle'] ?? [] );
$card_title_style          = block_forge_inline_style( $attributes['cardTitleStyle'] ?? [] );
$card_description_style    = block_forge_inline_style( $attributes['cardDescriptionStyle'] ?? [] );

$overlay_classes = [
    'peach' => 'bg-banner-peach',
    'blue'  => 'bg-banner-blue',
    'koral' => 'bg-coral',
];
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <section <?php if ( $anchor_id ) echo 'id="' . esc_attr( $anchor_id ) . '"'; ?>
        class="w-full pt-12 pb-22 px-4 md:px-8 bg-[#F8F8F8]" data-aos="fade-up">
        <div class="max-w-[1120px] mx-auto">

            <!--
              Single grid contains:
                1) first card  — source order #1
                2) section header — md:order-first md:col-span-2 (jumps above all cards on desktop)
                3) remaining cards
              On mobile (single col, no order overrides) the natural source order is
              card1 → header → rest, which is what we want.
            -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-13 md:gap-y-12">

                <?php
                $render_card = function ( $card ) use ( $overlay_classes, $card_title_style, $card_description_style ) {
                    $overlay = $overlay_classes[ $card['colorVariant'] ?? 'peach' ] ?? 'bg-banner-peach';
                    ?>
                <div class="relative overflow-hidden rounded-2xl min-h-[300px] flex flex-col">

                    <?php if ( ! empty( $card['imageUrl'] ) ) : ?>
                    <div class="rounded-[8px] h-[265px] md:h-[407px] overflow-hidden">
                        <img src="<?php echo esc_url( $card['imageUrl'] ); ?>"
                            alt="<?php echo esc_attr( $card['imageAlt'] ?? '' ); ?>"
                            class="inset-0 w-full h-full rounded-[8px] object-cover" />
                    </div>
                    <?php endif; ?>

                    <a href="<?php echo esc_url( $card['linkUrl'] ?? '' ); ?>"
                        class="cards-grid__card group cursor-pointer relative <?php echo esc_attr( $overlay ); ?> mx-7.5 md:mx-[50px] px-8  pt-6 pb-8 flex flex-col items-start  gap-4 -mt-[45px] md:-mt-20 rounded-[8px] no-underline min-h-[300px]">
                        <div>
                            <?php if ( ! empty( $card['title'] ) ) : ?>
                            <h3
                                class="font-barlow-semicondensed text-[34px] md:text-[38px] -tracking-[0.02em] text-black mb-1 font-semibold leading-snug min-h-[94px] md:min-h-[104px] group-hover:underline"
                                <?php if ( $card_title_style ) echo 'style="' . esc_attr( $card_title_style ) . '"'; ?>>
                                <?php echo wp_kses( $card['title'], [] ); ?>
                            </h3>
                            <?php else : ?>
                            <div class="mb-1 min-h-[94px] md:min-h-[104px]"></div>
                            <?php endif; ?>
                            <?php if ( ! empty( $card['description'] ) ) : ?>
                            <p class="type-body text-[#212121]"
                                <?php if ( $card_description_style ) echo 'style="' . esc_attr( $card_description_style ) . '"'; ?>>
                                <?php echo wp_kses( $card['description'], [ 'strong' => [], 'em' => [], 'b' => [], 'i' => [] ] ); ?>
                            </p>
                            <?php endif; ?>
                        </div>
                        <div class="shrink-0 mt-1 ">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="transition-transform duration-200 ease-out group-hover:translate-x-1">
                                <path d="M5 18L27 18" stroke="#2F2F2F" stroke-width="3" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M18 27L27 18L18 9" stroke="#2F2F2F" stroke-width="3" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </div>
                    </a>
                </div>
                <?php
                };

                // 1) First card.
                if ( ! empty( $cards[0] ) ) {
                    $render_card( $cards[0] );
                }
                ?>

                <!-- 2) Section header — desktop: row 1 spanning both columns. -->
                <?php if ( $section_title || $section_description ) : ?>
                <div class="md:order-first md:col-span-2 ">
                    <?php if ( $section_title ) : ?>
                    <h2 class="type-label text-black mb-6"
                        <?php if ( $section_title_style ) echo 'style="' . esc_attr( $section_title_style ) . '"'; ?>>
                        <?php echo wp_kses( $section_title, [] ); ?>
                    </h2>
                    <?php endif; ?>
                    <?php if ( $section_description ) : ?>
                    <p class="type-body text-black max-w-2xl"
                        <?php if ( $section_description_style ) echo 'style="' . esc_attr( $section_description_style ) . '"'; ?>>
                        <?php echo wp_kses( $section_description, [ 'strong' => [], 'em' => [], 'b' => [], 'i' => [] ] ); ?>
                    </p>
                    <?php endif; ?>
                </div>
                <?php endif; ?>

                <?php
                // 3) Remaining cards (index 1 and onward).
                $rest = array_slice( $cards, 1 );
                foreach ( $rest as $card ) {
                    $render_card( $card );
                }
                ?>
            </div>

        </div>
    </section>
</div>
