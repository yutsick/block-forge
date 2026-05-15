<?php
$description            = $attributes['description'] ?? '';
$contact_address        = $attributes['contactAddress'] ?? '';
$contact_email          = $attributes['contactEmail'] ?? '';
$contact_phone          = $attributes['contactPhone'] ?? '';
$contact_phone_2        = $attributes['contactPhoneSecondary'] ?? '';
$social_title           = $attributes['socialTitle'] ?? 'Sociala kanaler';
$newsletter_title       = $attributes['newsletterTitle'] ?? '';
$newsletter_desc        = $attributes['newsletterDescription'] ?? '';
$newsletter_link_label  = $attributes['newsletterLinkLabel'] ?? '';
$newsletter_link_url    = $attributes['newsletterLinkUrl'] ?? '';
$social_facebook        = $attributes['socialFacebook'] ?? '';
$social_tiktok          = $attributes['socialTiktok'] ?? '';
$social_linkedin        = $attributes['socialLinkedin'] ?? '';
$social_youtube         = $attributes['socialYoutube'] ?? '';
$social_instagram       = $attributes['socialInstagram'] ?? '';
$legal_title            = $attributes['legalTitle'] ?? 'Genvägar';
$legal_links            = $attributes['legalLinks'] ?? [];

$logo_url = get_theme_file_uri( 'assets/images/logo-white.png' );

$socials = array_filter( [
    'facebook'  => [ 'url' => $social_facebook,  'label' => 'Facebook'  ],
    'tiktok'    => [ 'url' => $social_tiktok,    'label' => 'TikTok'    ],
    'linkedin'  => [ 'url' => $social_linkedin,  'label' => 'LinkedIn'  ],
    'youtube'   => [ 'url' => $social_youtube,   'label' => 'YouTube'   ],
    'instagram' => [ 'url' => $social_instagram, 'label' => 'Instagram' ],
], function ( $s ) {
    return ! empty( $s['url'] );
} );

$social_icons = [
    'facebook'  => '<svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.24-1.46 1.49-1.46h1.6V4.45c-.28-.04-1.23-.12-2.33-.12-2.31 0-3.89 1.41-3.89 4v2.17H7.9v3h2.47V21z"/></svg>',
    'tiktok'    => '<svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1 0-5.17c.27 0 .53.04.77.12V9.7a5.66 5.66 0 0 0-.77-.05 5.65 5.65 0 1 0 5.66 5.65V9.01a7.34 7.34 0 0 0 4.29 1.38V7.3a4.27 4.27 0 0 1-3.21-1.48z"/></svg>',
    'linkedin'  => '<svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3.27 8.5h3.34V21H3.27zM9.6 8.5h3.2v1.7h.04c.45-.84 1.55-1.72 3.19-1.72 3.41 0 4.04 2.24 4.04 5.16V21h-3.34v-6.5c0-1.55-.03-3.55-2.16-3.55-2.17 0-2.5 1.69-2.5 3.44V21H9.6z"/></svg>',
    'youtube'   => '<svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42a2.5 2.5 0 0 0-1.76 1.77A26 26 0 0 0 2 12a26 26 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.42-4.81zM10 15V9l5 3z"/></svg>',
    'instagram' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-4 h-4"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg>',
];
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <footer class="relative bg-movendi-navy text-white w-full">

        <!-- Top rounded clip (concave white arc dipping into the navy) -->
        <div class="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none -translate-y-px" style="line-height:0">
            <svg viewBox="0 0 1440 80" fill="white" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full block h-[40px] md:h-[70px]">
                <path d="M0,0 L1440,0 L1440,80 Q720,0 0,80 Z"/>
            </svg>
        </div>

        <div class="relative max-w-[1280px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-10">

            <!-- ── Top row: logo+description / social ────────────────────────────── -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
                <div class="md:col-span-7 flex flex-col gap-6">
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="inline-block">
                        <img src="<?php echo esc_url( $logo_url ); ?>"
                             alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>"
                             class="h-10 w-auto" />
                    </a>
                    <?php if ( $description ) : ?>
                    <p class="text-white text-[16px] leading-[24px] max-w-md font-ancizar-serif">
                        <?php echo esc_html( $description ); ?>
                    </p>
                    <?php endif; ?>
                </div>

                <?php if ( $socials ) : ?>
                <div class="md:col-span-5 flex flex-col gap-4">
                    <h3 class="text-white font-semibold text-[18px] leading-6 font-barlow-semicondensed">
                        <?php echo esc_html( $social_title ); ?>
                    </h3>
                    <ul class="flex items-start gap-5 list-none p-0 m-0">
                        <?php foreach ( $socials as $platform => $s ) : ?>
                        <li>
                            <a href="<?php echo esc_url( $s['url'] ); ?>"
                               class="flex flex-col items-center gap-2 text-white hover:opacity-80 transition-opacity"
                               aria-label="<?php echo esc_attr( $s['label'] ); ?>">
                                <span class="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/50 bg-white/5">
                                    <?php echo $social_icons[ $platform ] ?? ''; ?>
                                </span>
                                <span class="text-[13px] leading-4"><?php echo esc_html( $s['label'] ); ?></span>
                            </a>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                <?php endif; ?>
            </div>

            <!-- divider -->
            <div class="my-10 border-t border-white/20"></div>

            <!-- ── Middle row: contact / newsletter ──────────────────────────────── -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
                <div class="md:col-span-7 flex flex-col gap-4">
                    <h3 class="text-white font-semibold text-[18px] leading-6 font-barlow-semicondensed">Kontaktuppgifter</h3>
                    <div class="flex flex-col gap-2 text-[16px] leading-6 font-ancizar-serif text-white">
                        <?php if ( $contact_address ) : ?>
                        <p class="m-0"><strong class="font-semibold">Adress:</strong> <?php echo esc_html( $contact_address ); ?></p>
                        <?php endif; ?>
                        <?php if ( $contact_email ) : ?>
                        <p class="m-0"><strong class="font-semibold">E-post:</strong> <a href="mailto:<?php echo esc_attr( $contact_email ); ?>" class="hover:opacity-80 transition-opacity"><?php echo esc_html( $contact_email ); ?></a></p>
                        <?php endif; ?>
                        <?php if ( $contact_phone || $contact_phone_2 ) : ?>
                        <p class="m-0">
                            <strong class="font-semibold">Tel:</strong>
                            <?php if ( $contact_phone ) : ?>
                                <a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', $contact_phone ) ); ?>" class="underline hover:opacity-80 transition-opacity"><?php echo esc_html( $contact_phone ); ?></a>
                            <?php endif; ?>
                            <?php if ( $contact_phone && $contact_phone_2 ) : ?>
                                <span class="px-1">eller</span>
                            <?php endif; ?>
                            <?php if ( $contact_phone_2 ) : ?>
                                <a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', $contact_phone_2 ) ); ?>" class="hover:opacity-80 transition-opacity"><?php echo esc_html( $contact_phone_2 ); ?></a>
                            <?php endif; ?>
                        </p>
                        <?php endif; ?>
                    </div>
                </div>

                <div class="md:col-span-5 flex flex-col gap-4">
                    <?php if ( $newsletter_title ) : ?>
                    <h3 class="text-white font-semibold text-[18px] leading-6 font-barlow-semicondensed">
                        <?php echo esc_html( $newsletter_title ); ?>
                    </h3>
                    <?php endif; ?>
                    <?php if ( $newsletter_desc ) : ?>
                    <p class="m-0 text-[16px] leading-6 text-white font-ancizar-serif">
                        <?php echo esc_html( $newsletter_desc ); ?>
                    </p>
                    <?php endif; ?>
                    <?php if ( $newsletter_link_label ) : ?>
                    <a href="<?php echo esc_url( $newsletter_link_url ); ?>"
                       class="inline-flex w-fit text-white text-[16px] leading-6 underline underline-offset-4 hover:opacity-80 transition-opacity font-barlow-semicondensed">
                        <?php echo esc_html( $newsletter_link_label ); ?>
                    </a>
                    <?php endif; ?>
                </div>
            </div>

            <!-- divider -->
            <div class="my-10 border-t border-white/20"></div>

            <!-- ── Bottom row: shortcuts ─────────────────────────────────────────── -->
            <?php if ( $legal_links ) : ?>
            <div class="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-[16px] leading-6 font-ancizar-serif">
                <?php if ( $legal_title ) : ?>
                <h3 class="text-white font-semibold m-0 font-barlow-semicondensed">
                    <?php echo esc_html( $legal_title ); ?><span class="hidden md:inline">:</span>
                </h3>
                <?php endif; ?>
                <ul class="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 list-none p-0 m-0">
                    <?php foreach ( $legal_links as $link ) : ?>
                    <li>
                        <a href="<?php echo esc_url( $link['url'] ); ?>" class="text-white hover:opacity-80 transition-opacity">
                            <?php echo esc_html( $link['label'] ); ?>
                        </a>
                    </li>
                    <?php endforeach; ?>
                </ul>
            </div>
            <?php endif; ?>

        </div>
    </footer>
</div>
