<?php
$section_title       = $attributes['sectionTitle'] ?? '';
$section_description = $attributes['sectionDescription'] ?? '';
$stats               = array_values( array_filter( $attributes['stats'] ?? [], function( $s ) { return $s['isEnabled'] ?? true; } ) );
$anchor_id           = $attributes['anchorId'] ?? '';

$section_title_style       = block_forge_inline_style( $attributes['sectionTitleStyle'] ?? [] );
$section_description_style = block_forge_inline_style( $attributes['sectionDescriptionStyle'] ?? [] );
$stat_label_style          = block_forge_inline_style( $attributes['statLabelStyle'] ?? [] );
$stat_description_style    = block_forge_inline_style( $attributes['statDescriptionStyle'] ?? [] );

?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <section <?php if ( $anchor_id ) echo 'id="' . esc_attr( $anchor_id ) . '"'; ?>
        class="w-full py-14 px-4 md:px-8 bg-[#F8F8F8]" data-aos="fade-up">
        <div class="max-w-[1120px] mx-auto">

            <?php if ( $section_title ) : ?>
            <h2 class="type-label text-black <?php echo $section_description ? 'mb-4' : 'mb-10'; ?>"
                <?php if ( $section_title_style ) echo 'style="' . esc_attr( $section_title_style ) . '"'; ?>>
                <?php echo wp_kses( $section_title, [] ); ?>
            </h2>
            <?php endif; ?>

            <?php if ( $section_description ) : ?>
            <p class="type-body font-ancizar-serif text-grey max-w-[760px] mb-10"
                <?php if ( $section_description_style ) echo 'style="' . esc_attr( $section_description_style ) . '"'; ?>>
                <?php echo wp_kses( $section_description, [ 'strong' => [], 'em' => [], 'b' => [], 'i' => [] ] ); ?>
            </p>
            <?php endif; ?>

            <div class="flex flex-wrap justify-center gap-5">
                <?php foreach ( $stats as $stat ) :
                    $icon_url = $stat['iconUrl'] ?? '';
                ?>
                <div
                    class="w-full md:w-[calc(25%-15px)] bg-white rounded-[16px] pt-6 pb-2 px-6 flex flex-col items-center text-center gap-4 min-h-[260px] md:min-h-[300px] shadow-[0_4px_4px_rgb(0_0_0_/_0.25)]">
                    <?php if ( $icon_url ) : ?>
                    <img src="<?php echo esc_url( $icon_url ); ?>" alt="" class="w-20 h-20 mx-auto object-contain"
                        aria-hidden="true" />
                    <?php endif; ?>
                    <span
                        class="type-h5 font-semibold text-black leading-snug"
                        <?php if ( $stat_label_style ) echo 'style="' . esc_attr( $stat_label_style ) . '"'; ?>>
                        <?php echo wp_kses( $stat['label'] ?? '', [] ); ?>
                    </span>
                    <p class="type-body text-grey"
                        <?php if ( $stat_description_style ) echo 'style="' . esc_attr( $stat_description_style ) . '"'; ?>>
                        <?php echo wp_kses( $stat['description'] ?? '', [ 'strong' => [], 'em' => [], 'b' => [], 'i' => [] ] ); ?>
                    </p>
                </div>
                <?php endforeach; ?>
            </div>

        </div>
    </section>
</div>