import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
    const {
        description,
        contactAddress, contactEmail, contactPhone, contactPhoneSecondary,
        socialTitle,
        newsletterTitle, newsletterDescription, newsletterLinkLabel, newsletterLinkUrl,
        socialFacebook, socialTiktok, socialLinkedin, socialYoutube, socialInstagram,
        legalTitle, legalLinks,
    } = attributes;

    const blockProps = useBlockProps();

    const updateLegalLink = (index, field, value) => {
        const updated = legalLinks.map((l, i) => i === index ? { ...l, [field]: value } : l);
        setAttributes({ legalLinks: updated });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Description', 'block-forge')}>
                    <TextareaControl
                        label={__('Organisation Description', 'block-forge')}
                        value={description}
                        onChange={(value) => setAttributes({ description: value })}
                    />
                </PanelBody>
                <PanelBody title={__('Contact', 'block-forge')}>
                    <TextControl label={__('Address', 'block-forge')} value={contactAddress} onChange={(v) => setAttributes({ contactAddress: v })} />
                    <TextControl label={__('Email', 'block-forge')} value={contactEmail} onChange={(v) => setAttributes({ contactEmail: v })} />
                    <TextControl label={__('Phone (primary)', 'block-forge')} value={contactPhone} onChange={(v) => setAttributes({ contactPhone: v })} />
                    <TextControl label={__('Phone (secondary)', 'block-forge')} value={contactPhoneSecondary} onChange={(v) => setAttributes({ contactPhoneSecondary: v })} />
                </PanelBody>
                <PanelBody title={__('Newsletter', 'block-forge')}>
                    <TextControl label={__('Title', 'block-forge')} value={newsletterTitle} onChange={(v) => setAttributes({ newsletterTitle: v })} />
                    <TextareaControl label={__('Description', 'block-forge')} value={newsletterDescription} onChange={(v) => setAttributes({ newsletterDescription: v })} />
                    <TextControl label={__('Link label', 'block-forge')} value={newsletterLinkLabel} onChange={(v) => setAttributes({ newsletterLinkLabel: v })} />
                    <TextControl label={__('Link URL', 'block-forge')} value={newsletterLinkUrl} onChange={(v) => setAttributes({ newsletterLinkUrl: v })} />
                </PanelBody>
                <PanelBody title={__('Social Links', 'block-forge')} initialOpen={false}>
                    <TextControl label={__('Section title', 'block-forge')} value={socialTitle} onChange={(v) => setAttributes({ socialTitle: v })} />
                    <TextControl label="Facebook URL" value={socialFacebook} onChange={(v) => setAttributes({ socialFacebook: v })} />
                    <TextControl label="TikTok URL" value={socialTiktok} onChange={(v) => setAttributes({ socialTiktok: v })} />
                    <TextControl label="LinkedIn URL" value={socialLinkedin} onChange={(v) => setAttributes({ socialLinkedin: v })} />
                    <TextControl label="YouTube URL" value={socialYoutube} onChange={(v) => setAttributes({ socialYoutube: v })} />
                    <TextControl label="Instagram URL" value={socialInstagram} onChange={(v) => setAttributes({ socialInstagram: v })} />
                </PanelBody>
                <PanelBody title={__('Shortcuts (Genvägar)', 'block-forge')} initialOpen={false}>
                    <TextControl label={__('Section title', 'block-forge')} value={legalTitle} onChange={(v) => setAttributes({ legalTitle: v })} />
                    {legalLinks.map((link, i) => (
                        <div key={i} style={{ marginBottom: '12px' }}>
                            <TextControl
                                label={`${__('Label', 'block-forge')} ${i + 1}`}
                                value={link.label}
                                onChange={(v) => updateLegalLink(i, 'label', v)}
                            />
                            <TextControl
                                label={__('URL', 'block-forge')}
                                value={link.url}
                                onChange={(v) => updateLegalLink(i, 'url', v)}
                            />
                        </div>
                    ))}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <footer className="relative bg-movendi-navy text-white w-full">
                    <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 pt-12 pb-8">

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            <div className="md:col-span-7 flex flex-col gap-4">
                                <span className="font-black text-white text-[22px] tracking-tight italic">movendi</span>
                                {description && <p className="text-white text-sm leading-5 max-w-md m-0">{description}</p>}
                            </div>
                            <div className="md:col-span-5 flex flex-col gap-2">
                                <p className="text-white font-semibold text-sm m-0">{socialTitle}</p>
                                <div className="flex gap-3 text-white/70 text-xs">
                                    {socialFacebook && <span>FB</span>}
                                    {socialTiktok && <span>TT</span>}
                                    {socialLinkedin && <span>LI</span>}
                                    {socialYoutube && <span>YT</span>}
                                    {socialInstagram && <span>IG</span>}
                                </div>
                            </div>
                        </div>

                        <div className="my-6 border-t border-white/20" />

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            <div className="md:col-span-7 flex flex-col gap-2">
                                <p className="text-white font-semibold text-sm m-0 mb-1">Kontaktuppgifter</p>
                                {contactAddress && <p className="text-xs text-white/80 m-0"><strong>Adress:</strong> {contactAddress}</p>}
                                {contactEmail && <p className="text-xs text-white/80 m-0"><strong>E-post:</strong> {contactEmail}</p>}
                                {(contactPhone || contactPhoneSecondary) && (
                                    <p className="text-xs text-white/80 m-0">
                                        <strong>Tel:</strong> {contactPhone}{contactPhone && contactPhoneSecondary ? ' eller ' : ''}{contactPhoneSecondary}
                                    </p>
                                )}
                            </div>
                            <div className="md:col-span-5 flex flex-col gap-2">
                                {newsletterTitle && <p className="text-white font-semibold text-sm m-0 mb-1">{newsletterTitle}</p>}
                                {newsletterDescription && <p className="text-xs text-white/80 m-0">{newsletterDescription}</p>}
                                {newsletterLinkLabel && <p className="text-xs text-white underline m-0">{newsletterLinkLabel}</p>}
                            </div>
                        </div>

                        <div className="my-6 border-t border-white/20" />

                        {legalLinks && legalLinks.length > 0 && (
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/80">
                                {legalTitle && <span className="font-semibold text-white">{legalTitle}:</span>}
                                {legalLinks.map((link, i) => (
                                    <span key={i}>{link.label}</span>
                                ))}
                            </div>
                        )}

                    </div>
                </footer>
            </div>
        </>
    );
}
