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
        is_admin() ? [] : [ 'movendi-theme-style' ],
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

add_action( 'after_setup_theme', function() {
    register_nav_menus( [
        'block-forge-primary' => __( 'Block Forge – Primary Navigation', 'block-forge' ),
        'block-forge-utility' => __( 'Block Forge – Utility Bar', 'block-forge' ),
    ] );
} );