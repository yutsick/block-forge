<?php
/**
 * Plugin Name: Block Forge
 * Plugin URI:  https://example.com/
 * Description: A WordPress plugin for building custom blocks.
 * Version:     1.0.0
 * Author:      Movendi
 * Author URI:  https://example.com/
 * Text Domain: block-forge
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function block_forge_register_blocks() {
    $blocks_dir = __DIR__ . '/build/blocks/';

    if ( ! is_dir( $blocks_dir ) ) {
        return;
    }

    foreach ( glob( $blocks_dir . '*', GLOB_ONLYDIR ) as $block ) {
        register_block_type( $block );
    }
}
add_action( 'init', 'block_forge_register_blocks' );

function block_forge_register_category( $categories ) {
    return array_merge(
        [
            [
                'slug'  => 'block-forge',
                'title' => 'Block Forge',
                'icon'  => null,
            ],
        ],
        $categories
    );
}
add_filter( 'block_categories_all', 'block_forge_register_category' );

add_action( 'init', function() {
    $css_file = plugin_dir_path( __FILE__ ) . 'build/style.css';

    if ( file_exists( $css_file ) ) {
        clearstatcache( true, $css_file );
        $version = (string) filemtime( $css_file );
    } else {
        $version = '1.0.0';
    }

    wp_register_style(
        'block-forge-style',
        plugins_url( 'build/style.css', __FILE__ ),
        is_admin()
            ? [ 'wp-components', 'wp-block-editor', 'wp-edit-blocks' ]
            : [ 'movendi-theme-style' ],
        $version
    );
} );

// Loads on both frontend AND block editor.
add_action( 'enqueue_block_assets', function() {
    wp_enqueue_style( 'block-forge-style' );
    wp_enqueue_style(
        'block-forge-fonts',
        'https://fonts.googleapis.com/css2?family=Ancizar+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Barlow+Semi+Condensed:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap',
        [],
        null
    );
} );

/**
 * Convert a block-forge style attribute object into a CSS `style` string.
 *
 * Style attributes have shape:
 *   [
 *     'fontFamily' => '...', 'fontSize' => '...', 'fontWeight' => '...',
 *     'lineHeight' => '...', 'letterSpacing' => '...', 'textTransform' => '...',
 *     'color' => '...', 'backgroundColor' => '...', 'borderColor' => '...',
 *   ]
 * Empty properties are omitted — branded defaults keep showing through.
 */
function block_forge_inline_style( $style ) {
    if ( ! is_array( $style ) ) {
        return '';
    }
    $map = [
        'fontFamily'      => 'font-family',
        'fontSize'        => 'font-size',
        'fontWeight'      => 'font-weight',
        'lineHeight'      => 'line-height',
        'letterSpacing'   => 'letter-spacing',
        'textTransform'   => 'text-transform',
        'color'           => 'color',
        'backgroundColor' => 'background-color',
        'borderColor'     => 'border-color',
    ];
    $parts = [];
    foreach ( $map as $js_key => $css_key ) {
        if ( ! empty( $style[ $js_key ] ) ) {
            $parts[] = $css_key . ': ' . esc_attr( $style[ $js_key ] );
        }
    }
    return implode( '; ', $parts );
}

/**
 * Register the "Checklist" style variation for the core List block.
 * Editor-only script — the actual marker styling lives in build/style.css
 * (.is-style-checklist), which already loads on both editor and front end.
 */
add_action( 'enqueue_block_editor_assets', function() {
    $rel  = 'assets/list-block-styles.js';
    $path = plugin_dir_path( __FILE__ ) . $rel;

    if ( ! file_exists( $path ) ) {
        return;
    }

    wp_enqueue_script(
        'block-forge-list-styles',
        plugins_url( $rel, __FILE__ ),
        [ 'wp-blocks', 'wp-dom-ready' ],
        (string) filemtime( $path ),
        true
    );

    $fmt_rel  = 'assets/arrow-link-format.js';
    $fmt_path = plugin_dir_path( __FILE__ ) . $fmt_rel;

    if ( file_exists( $fmt_path ) ) {
        wp_enqueue_script(
            'block-forge-arrow-link-format',
            plugins_url( $fmt_rel, __FILE__ ),
            [ 'wp-rich-text', 'wp-block-editor', 'wp-element', 'wp-i18n', 'wp-dom-ready' ],
            (string) filemtime( $fmt_path ),
            true
        );
    }
} );

add_action( 'after_setup_theme', function() {
    register_nav_menus( [
        'block-forge-primary' => __( 'Block Forge – Primary Navigation', 'block-forge' ),
        'block-forge-utility' => __( 'Block Forge – Utility Bar', 'block-forge' ),
    ] );
} );