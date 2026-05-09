<?php
$description          = $attributes['description'] ?? '';
$contact_address      = $attributes['contactAddress'] ?? '';
$contact_email        = $attributes['contactEmail'] ?? '';
$contact_phone        = $attributes['contactPhone'] ?? '';
$newsletter_title     = $attributes['newsletterTitle'] ?? '';
$newsletter_desc      = $attributes['newsletterDescription'] ?? '';
$social_facebook      = $attributes['socialFacebook'] ?? '';
$social_instagram     = $attributes['socialInstagram'] ?? '';
$social_twitter       = $attributes['socialTwitter'] ?? '';
$social_youtube       = $attributes['socialYoutube'] ?? '';
$social_linkedin      = $attributes['socialLinkedin'] ?? '';
$legal_links          = $attributes['legalLinks'] ?? [];

$socials = array_filter( [
    'facebook'  => $social_facebook,
    'instagram' => $social_instagram,
    'twitter'   => $social_twitter,
    'youtube'   => $social_youtube,
    'linkedin'  => $social_linkedin,
] );

$social_icons = [
    'facebook'  => '<svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
    'instagram' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    'twitter'   => '<svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    'youtube'   => '<svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>',
    'linkedin'  => '<svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>',
];
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <footer class="bg-movendi-navy text-white w-full">
        <div class="max-w-6xl mx-auto px-8 py-14">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10">

                <!-- Col 1: Logo + description + social -->
                <div class="flex flex-col gap-6">
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
                        <?php
                        $logo = get_custom_logo();
                        if ( $logo ) {
                            echo $logo;
                        } else {
                            echo '<span class="font-black text-white text-[24px] tracking-tight italic">movendi</span>';
                        }
                        ?>
                    </a>
                    <?php if ( $description ) : ?>
                    <p class="type-caption text-white/70"><?php echo esc_html( $description ); ?></p>
                    <?php endif; ?>
                    <?php if ( $socials ) : ?>
                    <div class="flex items-center gap-4">
                        <?php foreach ( $socials as $platform => $url ) : ?>
                        <a href="<?php echo esc_url( $url ); ?>"
                            class="text-white/60 hover:text-white transition-colors"
                            aria-label="<?php echo esc_attr( ucfirst( $platform ) ); ?>">
                            <?php echo $social_icons[ $platform ] ?? ''; ?>
                        </a>
                        <?php endforeach; ?>
                    </div>
                    <?php endif; ?>
                </div>

                <!-- Col 2: Contact -->
                <div class="flex flex-col gap-3">
                    <h3 class="type-label text-white/50 mb-2">Kontaktuppgifter</h3>
                    <?php if ( $contact_address ) : ?>
                    <p class="type-caption text-white/70">Adress: <?php echo esc_html( $contact_address ); ?></p>
                    <?php endif; ?>
                    <?php if ( $contact_email ) : ?>
                    <p class="type-caption text-white/70">
                        E-post: <a href="mailto:<?php echo esc_attr( $contact_email ); ?>" class="hover:text-white transition-colors underline">
                            <?php echo esc_html( $contact_email ); ?>
                        </a>
                    </p>
                    <?php endif; ?>
                    <?php if ( $contact_phone ) : ?>
                    <p class="type-caption text-white/70">Tel: <?php echo esc_html( $contact_phone ); ?></p>
                    <?php endif; ?>
                </div>

                <!-- Col 3: Newsletter -->
                <div class="flex flex-col gap-3">
                    <?php if ( $newsletter_title ) : ?>
                    <h3 class="type-label text-white/50 mb-2"><?php echo esc_html( $newsletter_title ); ?></h3>
                    <?php endif; ?>
                    <?php if ( $newsletter_desc ) : ?>
                    <p class="type-caption text-white/70"><?php echo esc_html( $newsletter_desc ); ?></p>
                    <?php endif; ?>
                </div>

            </div>

            <!-- Legal links -->
            <?php if ( $legal_links ) : ?>
            <div class="mt-12 pt-6 border-t border-white/10 flex flex-wrap gap-6">
                <?php foreach ( $legal_links as $link ) : ?>
                <a href="<?php echo esc_url( $link['url'] ); ?>" class="type-caption text-white/50 hover:text-white transition-colors">
                    <?php echo esc_html( $link['label'] ); ?>
                </a>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>

        </div>
    </footer>
</div>
