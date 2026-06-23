<?php
$section_title = $attributes['sectionTitle'] ?? '';
$cards         = $attributes['cards'] ?? [];
$anchor_id     = $attributes['anchorId'] ?? '';

$section_title_style = block_forge_inline_style( $attributes['sectionTitleStyle'] ?? [] );
$card_title_style    = block_forge_inline_style( $attributes['cardTitleStyle'] ?? [] );
$card_body_style     = block_forge_inline_style( $attributes['cardBodyStyle'] ?? [] );

$bg_classes = [
    'coral-60'      => 'bg-[#FAD2C9]',
    'yellow-60'     => 'bg-[#FEE4CB]',
    'light-blue-60' => 'bg-[#D9ECF4]',
    'coral'         => 'bg-[#F49F92]',
    'yellow'        => 'bg-[#FBC894]',
    'light-blue'    => 'bg-[#AED9E9]',
    'blue'          => 'bg-[#27348B]',
    'purple'        => 'bg-[#671B52]',
];

$body_kses = [
    'p'      => [],
    'br'     => [],
    'strong' => [],
    'b'      => [],
    'em'     => [],
    'i'      => [],
    'a'      => [ 'href' => true, 'target' => true, 'rel' => true, 'title' => true ],
];
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <section <?php if ( $anchor_id ) echo 'id="' . esc_attr( $anchor_id ) . '"'; ?>
        class="w-full py-14 px-4 md:px-8 bg-white" data-aos="fade-up">
        <div class="max-w-[1120px] mx-auto">

            <?php if ( $section_title ) : ?>
            <h2 class="type-h3 text-[#2F2F2F] mb-8"
                <?php if ( $section_title_style ) echo 'style="' . esc_attr( $section_title_style ) . '"'; ?>>
                <?php echo wp_kses( $section_title, [] ); ?>
            </h2>
            <?php endif; ?>

            <div class="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
                <?php foreach ( $cards as $card ) :
                    $bg_class  = $bg_classes[ $card['bgColor'] ?? 'coral-60' ] ?? 'bg-banner-pink';
                    $icon_url  = $card['iconUrl'] ?? '';
                    $icon_alt  = $card['iconAlt'] ?? '';
                ?>
                <div class="contacts-card flex flex-col gap-4">

                    <!-- Icon area -->
                    <div class="<?php echo esc_attr( $bg_class ); ?> rounded-[8px] h-[254px] flex items-center justify-center overflow-hidden">
                        <?php if ( $icon_url ) : ?>
                        <img src="<?php echo esc_url( $icon_url ); ?>"
                            alt="<?php echo esc_attr( $icon_alt ); ?>"
                            class="max-w-[135px] max-h-[135px] object-contain" />
                        <?php endif; ?>
                    </div>

                    <!-- Title -->
                    <?php if ( ! empty( $card['title'] ) ) : ?>
                    <h3 class="type-h4 text-[#2F2F2F]"
                        <?php if ( $card_title_style ) echo 'style="' . esc_attr( $card_title_style ) . '"'; ?>>
                        <?php echo wp_kses( $card['title'], [] ); ?>
                    </h3>
                    <?php endif; ?>

                    <!-- Body -->
                    <?php if ( ! empty( $card['body'] ) ) : ?>
                    <div class="contacts-card__body type-body-sm text-[#212121]"
                        <?php if ( $card_body_style ) echo 'style="' . esc_attr( $card_body_style ) . '"'; ?>>
                        <?php echo wp_kses( $card['body'], $body_kses ); ?>
                    </div>
                    <?php endif; ?>

                </div>
                <?php endforeach; ?>
            </div>

        </div>
    </section>
</div>
