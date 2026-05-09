<?php
$section_title = $attributes['sectionTitle'] ?? '';
$stats         = $attributes['stats'] ?? [];

$icons = [
    'person'    => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-10 h-10 text-banner-heading"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>',
    'group'     => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-10 h-10 text-banner-heading"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><path d="M1 20c0-3 3-5.5 8-5.5"/><path d="M23 20c0-3-3-5.5-8-5.5"/><path d="M9 14.5c0-3 3.6-5.5 8-5.5s8 2.5 8 5.5" style="display:none"/><path d="M5 20c0-3.5 3.5-6 9-6s9 2.5 9 6"/></svg>',
    'calendar'  => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-10 h-10 text-banner-heading"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    'megaphone' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-10 h-10 text-banner-heading"><path d="M3 11v2a1 1 0 0 0 1 1h1l2 4h2l-1-4h8l3 3V4l-3 3H7L5 8H4a1 1 0 0 0-1 1v2z"/></svg>',
];
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <section class="w-full py-16 px-8 bg-white">
        <div class="max-w-6xl mx-auto">

            <?php if ( $section_title ) : ?>
            <h2 class="type-label text-banner-text text-center mb-12"><?php echo esc_html( $section_title ); ?></h2>
            <?php endif; ?>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                <?php foreach ( $stats as $stat ) :
                    $icon_key = $stat['icon'] ?? 'person';
                    $icon_svg = $icons[ $icon_key ] ?? $icons['person'];
                ?>
                <div class="flex flex-col items-center text-center gap-3">
                    <?php echo $icon_svg; ?>
                    <?php if ( ! empty( $stat['value'] ) ) : ?>
                    <span class="type-h2 text-banner-heading"><?php echo esc_html( $stat['value'] ); ?></span>
                    <?php endif; ?>
                    <span class="type-body font-semibold text-banner-heading"><?php echo esc_html( $stat['label'] ?? '' ); ?></span>
                    <p class="type-caption text-banner-text"><?php echo esc_html( $stat['description'] ?? '' ); ?></p>
                </div>
                <?php endforeach; ?>
            </div>

        </div>
    </section>
</div>
