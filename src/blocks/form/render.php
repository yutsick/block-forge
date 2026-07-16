<?php
/**
 * Server render for block-forge/form.
 *
 * Wraps a Forminator form in a div that sets brand-color CSS variables.
 * The theme's Forminator stylesheet (tailwind/custom/components/forms.css)
 * consumes them with fallbacks, so forms embedded via plain shortcode
 * keep the default look.
 *
 * @var array $attributes Block attributes.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$bf_form_id = intval( $attributes['formId'] ?? 0 );

/* Color slug maps — keep in sync with edit.js. */
$bf_bg_colors = [
    'bg-grey'       => '#F8F8F8',
    'white'         => '#FFFFFF',
    'yellow-60'     => '#FEE4CB',
    'light-blue-60' => '#D9ECF4',
    'coral-60'      => '#FAD2C9',
    'yellow'        => '#FBC894',
    'light-blue'    => '#AED9E9',
    'coral'         => '#F49F92',
    'blue'          => '#27348B',
    'purple'        => '#671B52',
];
$bf_field_bg_colors = [
    'white'   => '#FFFFFF',
    'bg-grey' => '#F8F8F8',
];
$bf_label_colors = [
    'default'   => '#212121',
    'black'     => '#2F2F2F',
    'blue'      => '#27348B',
    'text-grey' => '#4E4E4E',
    'white'     => '#FFFFFF',
];
$bf_field_text_colors = [
    'black'     => '#2F2F2F',
    'text-grey' => '#4E4E4E',
    'blue'      => '#27348B',
];

$bf_vars = sprintf(
    '--bf-form-bg: %s; --bf-form-field-bg: %s; --bf-form-label: %s; --bf-form-field-text: %s;',
    $bf_bg_colors[ $attributes['bgColor'] ?? 'bg-grey' ] ?? '#F8F8F8',
    $bf_field_bg_colors[ $attributes['fieldBg'] ?? 'white' ] ?? '#FFFFFF',
    $bf_label_colors[ $attributes['labelColor'] ?? 'default' ] ?? '#212121',
    $bf_field_text_colors[ $attributes['fieldTextColor'] ?? 'black' ] ?? '#2F2F2F'
);

$bf_wrapper = get_block_wrapper_attributes(
    [
        'class' => 'bf-form',
        'style' => $bf_vars,
    ]
);
?>
<div <?php echo $bf_wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
    <?php
    if ( $bf_form_id ) {
        echo do_shortcode( '[forminator_form id="' . $bf_form_id . '"]' );
    }
    ?>
</div>
