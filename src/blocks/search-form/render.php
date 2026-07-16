<?php
/**
 * Server render for block-forge/search-form.
 *
 * Reuses the theme's shared search-form partial
 * (template-parts/search/search-form.php), passing the block's editable
 * title / subtitle. Search results are handled by the theme's search.php.
 *
 * @var array $attributes Block attributes.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$sf_title    = $attributes['title']    ?? '';
$sf_subtitle = $attributes['subtitle'] ?? '';

$sf_wrapper = get_block_wrapper_attributes( [ 'class' => 'w-full max-w-[928px] mx-auto px-4 md:px-0' ] );

// get_block_wrapper_attributes() returns pre-escaped attribute markup.
echo '<div ' . $sf_wrapper . '>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

if ( locate_template( 'template-parts/search/search-form.php' ) ) {
	get_template_part(
		'template-parts/search/search-form',
		null,
		[
			'title'    => $sf_title,
			'subtitle' => $sf_subtitle,
		]
	);
} else {
	echo '<p>' . esc_html__( 'Search form template not found in the active theme.', 'block-forge' ) . '</p>';
}

echo '</div>';
