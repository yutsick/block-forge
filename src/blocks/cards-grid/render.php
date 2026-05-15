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
    <section class="w-full py-16 px-4 md:px-8 bg-[#F8F8F8]" data-aos="fade-up">
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
                $render_card = function ( $card ) use ( $overlay_classes ) {
                    $overlay = $overlay_classes[ $card['colorVariant'] ?? 'peach' ] ?? 'bg-banner-peach';
                    ?>
                <a href="<?php echo esc_url( $card['linkUrl'] ?? '' ); ?>"
                    class="group relative overflow-hidden rounded-2xl min-h-[300px] flex flex-col no-underline">

                    <?php if ( ! empty( $card['imageUrl'] ) ) : ?>
                    <div class="rounded-[8px] h-[265px] md:h-[407px] overflow-hidden">
                        <img src="<?php echo esc_url( $card['imageUrl'] ); ?>"
                            alt="<?php echo esc_attr( $card['imageAlt'] ?? '' ); ?>"
                            class="inset-0 w-full h-full rounded-[8px] hover: object-cover group-hover:scale-105 transition-transform duration-500 " />
                    </div>
                    <?php endif; ?>

                    <div
                        class="relative <?php echo esc_attr( $overlay ); ?> mx-7.5 md:mx-[50px] px-8  pt-6 pb-8 flex flex-col items-start  gap-4 -mt-[45px] md:-mt-20 rounded-[8px]">
                        <div>
                            <?php if ( ! empty( $card['title'] ) ) : ?>
                            <h3
                                class="font-barlow-semicondensed text-[34px] md:text-[38px] -tracking-[0.02em] text-black mb-1 font-semibold leading-snug">
                                <?php echo esc_html( $card['title'] ); ?>
                            </h3>
                            <?php endif; ?>
                            <?php if ( ! empty( $card['description'] ) ) : ?>
                            <p class="type-body-lg text-[#212121]"><?php echo esc_html( $card['description'] ); ?></p>
                            <?php endif; ?>
                        </div>
                        <div class="shrink-0 mt-1 ">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 18L27 18" stroke="#2F2F2F" stroke-width="3" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M18 27L27 18L18 9" stroke="#2F2F2F" stroke-width="3" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                </a>
                <?php
                };

                // 1) First card.
                if ( ! empty( $cards[0] ) ) {
                    $render_card( $cards[0] );
                }
                ?>

                <!-- 2) Section header — desktop: row 1 spanning both columns. -->
                <?php if ( $section_title || $section_description ) : ?>
                <div class="md:order-first md:col-span-2 md:mb-4">
                    <?php if ( $section_title ) : ?>
                    <h2 class="type-label text-black mb-4"><?php echo esc_html( $section_title ); ?></h2>
                    <?php endif; ?>
                    <?php if ( $section_description ) : ?>
                    <p class="type-body-lg text-black max-w-2xl"><?php echo esc_html( $section_description ); ?></p>
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