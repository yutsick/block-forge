<?php
$section_title = $attributes['sectionTitle'] ?? '';
$items         = $attributes['items'] ?? [];
$anchor_id     = $attributes['anchorId'] ?? '';

$section_title_style = block_forge_inline_style( $attributes['sectionTitleStyle'] ?? [] );
$item_label_style    = block_forge_inline_style( $attributes['itemLabelStyle'] ?? [] );
$item_content_style  = block_forge_inline_style( $attributes['itemContentStyle'] ?? [] );

$content_kses = [
    'p'      => [],
    'br'     => [],
    'strong' => [],
    'b'      => [],
    'em'     => [],
    'i'      => [],
    'a'      => [ 'href' => true, 'target' => true, 'rel' => true, 'title' => true ],
    'ul'     => [],
    'ol'     => [],
    'li'     => [],
];
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <div <?php if ( $anchor_id ) echo 'id="' . esc_attr( $anchor_id ) . '"'; ?> class="block-forge-accordion w-full max-w-[736px]">

        <?php if ( $section_title ) : ?>
        <h2 class="type-h3 text-[#212121] mb-4"
            <?php if ( $section_title_style ) echo 'style="' . esc_attr( $section_title_style ) . '"'; ?>>
            <?php echo wp_kses( $section_title, [] ); ?>
        </h2>
        <?php endif; ?>

        <div class="flex flex-col gap-2">
            <?php foreach ( $items as $it ) :
                $label   = $it['label']   ?? '';
                $content = $it['content'] ?? '';
                if ( ! $label ) continue;
            ?>
            <details class="accordion-item bg-white border border-[#DDDDDD] rounded-[8px] group">
                <summary
                    class="accordion-item__summary list-none cursor-pointer flex items-center gap-10 p-[18px] [&::-webkit-details-marker]:hidden">
                    <span class="accordion-item__label flex-1 font-ancizar-serif font-semibold text-[20px] leading-[28px] -tracking-[0.32px] text-[#4E4E4E]"
                        <?php if ( $item_label_style ) echo 'style="' . esc_attr( $item_label_style ) . '"'; ?>>
                        <?php echo wp_kses( $label, [] ); ?>
                    </span>
                    <span class="accordion-item__icon shrink-0 inline-flex items-center justify-center w-[30px] h-[30px] rounded-full bg-banner-blue text-[#27348B] transition-transform duration-200 ease-out group-open:rotate-45">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M7 1V13M1 7H13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        </svg>
                    </span>
                </summary>

                <?php if ( $content ) : ?>
                <div class="accordion-item__content type-body-sm text-[#4E4E4E] px-[18px] pb-[18px]"
                    <?php if ( $item_content_style ) echo 'style="' . esc_attr( $item_content_style ) . '"'; ?>>
                    <?php echo wp_kses( $content, $content_kses ); ?>
                </div>
                <?php endif; ?>
            </details>
            <?php endforeach; ?>
        </div>

    </div>
</div>
