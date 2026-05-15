<?php
$section_title = $attributes['sectionTitle'] ?? '';
$stats         = $attributes['stats'] ?? [];
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <section class="w-full py-14 px-4 md:px-8 bg-[#F8F8F8]" data-aos="fade-up">
        <div class="max-w-[1120px] mx-auto">

            <?php if ( $section_title ) : ?>
            <h2 class="type-label text-banner-text mb-10"><?php echo esc_html( $section_title ); ?></h2>
            <?php endif; ?>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
                <?php foreach ( $stats as $stat ) :
                    $icon_url = $stat['iconUrl'] ?? '';
                ?>
                <div
                    class="bg-white  rounded-[16px] p-6 flex flex-col items-center text-center gap-3 min-h-[260px] md:min-h-[317px] shadow-[0_4px_4px_rgb(0_0_0_/_0.25)]">
                    <?php if ( $icon_url ) : ?>
                    <img src="<?php echo esc_url( $icon_url ); ?>" alt="" class="w-20 h-20 mx-auto object-contain"
                        aria-hidden="true" />
                    <?php endif; ?>
                    <?php if ( ! empty( $stat['value'] ) ) : ?>
                    <span class="type-h3 text-banner-heading"><?php echo esc_html( $stat['value'] ); ?></span>
                    <?php endif; ?>
                    <span
                        class="type-h3 font-semibold text-black leading-snug"><?php echo esc_html( $stat['label'] ?? '' ); ?></span>
                    <p class="type-body-lg text-grey"><?php echo esc_html( $stat['description'] ?? '' ); ?></p>
                </div>
                <?php endforeach; ?>
            </div>

        </div>
    </section>
</div>