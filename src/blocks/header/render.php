<?php
$bg_color      = $attributes['backgroundColor'] ?? 'white';
$cta_label     = $attributes['ctaLabel'] ?? 'Bli medlem';
$cta_url       = $attributes['ctaUrl'] ?? '';
$utility_links = $attributes['utilityLinks'] ?? [];

$bg_classes = [
    'white'       => 'bg-white',
    'blue'        => 'bg-banner-blue',
    'transparent' => 'bg-transparent',
    'peach'       => 'bg-banner-peach',
];
$bg_class = $bg_classes[ $bg_color ] ?? 'bg-white';
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <header class="<?php echo esc_attr( $bg_class ); ?> w-full relative z-50">

        <!-- Utility bar -->
        <div class="border-b border-black/5">
            <div class="max-w-7xl mx-auto px-8 flex justify-end items-center gap-6 py-1.5">
                <a href="#" class="type-caption text-banner-text hover:text-banner-heading transition-colors flex items-center gap-1">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    Sök
                </a>
                <?php foreach ( $utility_links as $link ) : ?>
                <a href="<?php echo esc_url( $link['url'] ); ?>" class="type-caption text-banner-text hover:text-banner-heading transition-colors">
                    <?php echo esc_html( $link['label'] ); ?>
                </a>
                <?php endforeach; ?>
            </div>
        </div>

        <!-- Main navigation -->
        <div class="max-w-7xl mx-auto px-8 flex items-center justify-between py-4">

            <!-- Logo -->
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="shrink-0">
                <?php
                $logo = get_custom_logo();
                if ( $logo ) {
                    echo $logo;
                } else {
                    echo '<span class="font-black text-banner-heading text-[28px] tracking-tight italic">movendi</span>';
                }
                ?>
            </a>

            <!-- Nav menu -->
            <?php
            wp_nav_menu( [
                'theme_location' => 'block-forge-primary',
                'container'      => 'nav',
                'container_attr' => [ 'class' => 'hidden lg:flex' ],
                'menu_class'     => 'flex items-center gap-7',
                'link_before'    => '<span class="type-body text-banner-text hover:text-banner-heading transition-colors font-medium">',
                'link_after'     => '</span>',
                'fallback_cb'    => false,
                'depth'          => 2,
            ] );
            ?>

            <!-- CTA -->
            <?php if ( $cta_label ) : ?>
            <a href="<?php echo esc_url( $cta_url ); ?>"
                class="inline-flex items-center px-5 py-2.5 bg-banner-heading text-white rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
                <?php echo esc_html( $cta_label ); ?>
            </a>
            <?php endif; ?>

        </div>

    </header>
</div>
