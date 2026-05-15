<?php
$bg_type       = $attributes['bgType'] ?? 'image';
$image_url     = $attributes['imageUrl'] ?? '';
$image_alt     = $attributes['imageAlt'] ?? '';
$video_url     = $attributes['videoUrl'] ?? '';
$title         = $attributes['title'] ?? '';
$description   = $attributes['description'] ?? '';
$primary_btn   = $attributes['primaryButton'] ?? [ 'label' => '', 'url' => '' ];
$secondary_btn = $attributes['secondaryButton'] ?? [ 'label' => '', 'url' => '' ];

$is_video  = $bg_type === 'video';
$video_id  = 'hero-video-' . wp_unique_id();
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <section class="relative w-full min-h-[600px] flex items-center overflow-hidden bg-transparent">

        <?php if ( $is_video && $video_url ) : ?>
        <video id="<?php echo esc_attr( $video_id ); ?>" class="absolute inset-0 w-full h-full object-cover" autoplay
            muted loop playsinline>
            <source src="<?php echo esc_url( $video_url ); ?>" />
        </video>
        <?php elseif ( $image_url ) : ?>
        <img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $image_alt ); ?>"
            class="absolute inset-0 w-full h-full object-cover" />
        <?php endif; ?>

        <?php if ( $is_video && $video_url ) : ?>
        <div class="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent"></div>
        <?php endif; ?>

        <div class="relative z-10 w-full max-w-[1120px] mx-auto px-8 py-16 text-center flex flex-col items-center">

            <?php if ( $title ) : ?>
            <h1 class="<?php echo $is_video ? 'type-display text-[#AED9E9]' : 'type-h1 text-white'; ?> mb-8 max-w-2xl">
                <?php echo wp_kses_post( $title ); ?>
            </h1>
            <?php endif; ?>

            <?php if ( $description ) : ?>
            <p class="type-body-lg text-[18px] md:text-[22px] text-white/90 mb-8 max-w-lg ">
                <?php echo wp_kses_post( $description ); ?>
            </p>
            <?php endif; ?>

            <?php if ( $primary_btn['label'] || $secondary_btn['label'] ) : ?>
            <div class="flex flex-wrap gap-4 mx-auto font-barlow-semicondensed text-body-lg my-8 md:mt-14 md:mb-23">
                <?php if ( $primary_btn['label'] ) : ?>
                <a href="<?php echo esc_url( $primary_btn['url'] ); ?>"
                    class="  no-underline flex  items-center w-[155px] h-[45px] md:w-[185px] md:h-[54px] bg-banner-pink text-black rounded-full font-medium hover:opacity-90 transition-opacity md:text-[20px] text-[18px] justify-center">
                    <?php echo esc_html( $primary_btn['label'] ); ?>
                </a>
                <?php endif; ?>
                <?php if ( $secondary_btn['label'] ) : ?>
                <a href="<?php echo esc_url( $secondary_btn['url'] ); ?>"
                    class="no-underline flex items-center w-[155px] h-[45px] md:w-[185px] md:h-[54px] border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors md:text-[20px] text-[18px] border justify-center">
                    <?php echo esc_html( $secondary_btn['label'] ); ?>
                </a>
                <?php endif; ?>
            </div>
            <?php endif; ?>

        </div>

        <?php if ( $is_video ) : ?>
        <!-- Rounded clip -->
        <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none"
            style="line-height:0">
            <svg viewBox="0 0 1440 72" fill="white" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
                class="w-full block">
                <path d="M0,72 Q720,-72 1440,72 L1440,72 L0,72 Z" />
            </svg>
        </div>

        <!-- Pause / Play button -->
        <?php if ( $video_url ) : ?>
        <button type="button" aria-label="<?php esc_attr_e( 'Pause video', 'block-forge' ); ?>"
            class="absolute bottom-8 right-8 z-20 w-12 h-12 rounded-full border-2 border-white/80 flex items-center justify-center text-white bg-black/20 hover:bg-black/40 transition"
            onclick="(function(btn){
                var v = document.getElementById('<?php echo esc_js( $video_id ); ?>');
                if (!v) return;
                if (v.paused) {
                    v.play();
                    btn.setAttribute('aria-label', 'Pause video');
                    btn.querySelector('.hero-pause-icon').style.display = '';
                    btn.querySelector('.hero-play-icon').style.display  = 'none';
                } else {
                    v.pause();
                    btn.setAttribute('aria-label', 'Play video');
                    btn.querySelector('.hero-pause-icon').style.display = 'none';
                    btn.querySelector('.hero-play-icon').style.display  = '';
                }
            })(this)">
            <!-- Pause icon -->
            <svg class="hero-pause-icon" width="16" height="16" viewBox="0 0 16 16" fill="white"
                xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="1" width="4" height="14" rx="1" />
                <rect x="10" y="1" width="4" height="14" rx="1" />
            </svg>
            <!-- Play icon (hidden by default) -->
            <svg class="hero-play-icon" width="16" height="16" viewBox="0 0 16 16" fill="white"
                xmlns="http://www.w3.org/2000/svg" style="display:none">
                <path d="M3 1.5L13.5 8 3 14.5V1.5Z" />
            </svg>
        </button>
        <?php endif; ?>
        <?php endif; ?>

    </section>
</div>