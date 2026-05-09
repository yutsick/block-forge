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

add_action( 'wp_enqueue_scripts', function() {
    wp_enqueue_style(
        'block-forge-style',
        plugins_url( 'build/style.css', __FILE__ ),
        [],
        filemtime( plugin_dir_path( __FILE__ ) . 'build/style.css' )
    );
});

add_action( 'init', function() {
    wp_register_style(
        'block-forge-style',
        plugins_url( 'build/style.css', __FILE__ ),
        [],
        filemtime( plugin_dir_path( __FILE__ ) . 'build/style.css' )
    );
} );

add_action( 'after_setup_theme', function() {
    register_nav_menus( [
        'block-forge-primary' => __( 'Block Forge – Primary Navigation', 'block-forge' ),
        'block-forge-utility' => __( 'Block Forge – Utility Bar', 'block-forge' ),
    ] );
} );