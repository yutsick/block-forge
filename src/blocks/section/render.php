<?php
$bg_color = $attributes['bgColor'] ?? 'none';
$pad_y    = $attributes['padY']    ?? 'lg';
$width    = $attributes['width']   ?? 'container';
$anchor   = $attributes['anchorId'] ?? '';

$bg_classes = [
    'none'          => '',
    'white'         => 'bg-white',
    'bg-grey'       => 'bg-[#F8F8F8]',
    'coral-60'      => 'bg-[#FAD2C9]',
    'yellow-60'     => 'bg-[#FEE4CB]',
    'light-blue-60' => 'bg-[#D9ECF4]',
    'blue'          => 'bg-[#27348B] text-white',
    'purple'        => 'bg-[#671B52] text-white',
];
$pad_y_classes = [
    'none' => 'py-0',
    'sm'   => 'py-6',
    'md'   => 'py-10',
    'lg'   => 'py-14',
    'xl'   => 'py-20',
];
$width_classes = [
    'container' => 'max-w-[1120px]',
    'tall'      => 'max-w-[736px]',
];

$bg_class    = $bg_classes[ $bg_color ]    ?? '';
$pad_y_class = $pad_y_classes[ $pad_y ]    ?? 'py-14';
$width_class = $width_classes[ $width ]    ?? 'max-w-[1120px]';

$wrapper_classes = trim( "block-forge-section w-full $bg_class $pad_y_class" );
?>

<section <?php echo get_block_wrapper_attributes( [ 'class' => $wrapper_classes ] ); ?>
    <?php if ( $anchor ) echo 'id="' . esc_attr( $anchor ) . '"'; ?>>
    <div class="<?php echo esc_attr( $width_class ); ?> mx-auto px-4 md:px-0">
        <?php echo $content; ?>
    </div>
</section>