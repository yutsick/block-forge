<?php
$section_title = $attributes['sectionTitle'] ?? '';
$stats         = $attributes['stats'] ?? [];

$icons = [
    'person'    => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-10 h-10 text-banner-heading mx-auto"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>',
    'group'     => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-10 h-10 text-banner-heading mx-auto"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M2 20c0-3.5 3-6 6-6"/><path d="M22 20c0-3.5-3-6-6-6"/><path d="M8 14c0-3.5 3.5-6 8-6 .9 0 1.7.1 2.5.3"/><path d="M6 20c0-3.5 3.5-6 8-6s8 2.5 8 6"/></svg>',
    'calendar'  => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-10 h-10 text-banner-heading mx-auto"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>',
    'megaphone' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-10 h-10 text-banner-heading mx-auto"><path d="M19 9.5V15a1 1 0 0 1-1 1H6l-2 3H3V8h1l2 3h12a1 1 0 0 1 1 1.5z"/><path d="M19 9.5C19 8 21 7 21 12s-2 4.5-2 4.5"/></svg>',
];
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <section class="w-full py-14 px-8 bg-white">
        <div class="max-w-6xl mx-auto">

            <?php if ( $section_title ) : ?>
            <h2 class="type-label text-banner-text mb-10"><?php echo esc_html( $section_title ); ?></h2>
            <?php endif; ?>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
                <?php foreach ( $stats as $stat ) :
                    $icon_key = $stat['icon'] ?? 'person';
                    $icon_svg = $icons[ $icon_key ] ?? $icons['person'];
                ?>
                <div class="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center gap-3">
                    <?php echo $icon_svg; ?>
                    <?php if ( ! empty( $stat['value'] ) ) : ?>
                    <span class="type-h3 text-banner-heading"><?php echo esc_html( $stat['value'] ); ?></span>
                    <?php endif; ?>
                    <span class="type-body font-semibold text-banner-heading leading-snug"><?php echo esc_html( $stat['label'] ?? '' ); ?></span>
                    <p class="type-caption text-banner-text"><?php echo esc_html( $stat['description'] ?? '' ); ?></p>
                </div>
                <?php endforeach; ?>
            </div>

        </div>
    </section>
</div>
