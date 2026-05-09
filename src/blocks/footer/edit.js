import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
    const {
        description, contactAddress, contactEmail, contactPhone,
        newsletterTitle, newsletterDescription,
        socialFacebook, socialInstagram, socialTwitter, socialYoutube, socialLinkedin,
        legalLinks,
    } = attributes;

    const blockProps = useBlockProps();

    const updateLegalLink = ( index, field, value ) => {
        const updated = legalLinks.map( ( l, i ) => i === index ? { ...l, [ field ]: value } : l );
        setAttributes( { legalLinks: updated } );
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={ __( 'Description', 'block-forge' ) }>
                    <TextareaControl
                        label={ __( 'Organisation Description', 'block-forge' ) }
                        value={ description }
                        onChange={ ( value ) => setAttributes( { description: value } ) }
                    />
                </PanelBody>
                <PanelBody title={ __( 'Contact', 'block-forge' ) }>
                    <TextControl label={ __( 'Address', 'block-forge' ) } value={ contactAddress } onChange={ ( v ) => setAttributes( { contactAddress: v } ) } />
                    <TextControl label={ __( 'Email', 'block-forge' ) } value={ contactEmail } onChange={ ( v ) => setAttributes( { contactEmail: v } ) } />
                    <TextControl label={ __( 'Phone', 'block-forge' ) } value={ contactPhone } onChange={ ( v ) => setAttributes( { contactPhone: v } ) } />
                </PanelBody>
                <PanelBody title={ __( 'Newsletter', 'block-forge' ) }>
                    <TextControl label={ __( 'Title', 'block-forge' ) } value={ newsletterTitle } onChange={ ( v ) => setAttributes( { newsletterTitle: v } ) } />
                    <TextareaControl label={ __( 'Description', 'block-forge' ) } value={ newsletterDescription } onChange={ ( v ) => setAttributes( { newsletterDescription: v } ) } />
                </PanelBody>
                <PanelBody title={ __( 'Social Links', 'block-forge' ) } initialOpen={ false }>
                    <TextControl label="Facebook URL" value={ socialFacebook } onChange={ ( v ) => setAttributes( { socialFacebook: v } ) } />
                    <TextControl label="Instagram URL" value={ socialInstagram } onChange={ ( v ) => setAttributes( { socialInstagram: v } ) } />
                    <TextControl label="Twitter / X URL" value={ socialTwitter } onChange={ ( v ) => setAttributes( { socialTwitter: v } ) } />
                    <TextControl label="YouTube URL" value={ socialYoutube } onChange={ ( v ) => setAttributes( { socialYoutube: v } ) } />
                    <TextControl label="LinkedIn URL" value={ socialLinkedin } onChange={ ( v ) => setAttributes( { socialLinkedin: v } ) } />
                </PanelBody>
                <PanelBody title={ __( 'Legal Links', 'block-forge' ) } initialOpen={ false }>
                    { legalLinks.map( ( link, i ) => (
                        <div key={ i } style={ { marginBottom: '12px' } }>
                            <TextControl
                                label={ `${ __( 'Label', 'block-forge' ) } ${ i + 1 }` }
                                value={ link.label }
                                onChange={ ( v ) => updateLegalLink( i, 'label', v ) }
                            />
                            <TextControl
                                label={ __( 'URL', 'block-forge' ) }
                                value={ link.url }
                                onChange={ ( v ) => updateLegalLink( i, 'url', v ) }
                            />
                        </div>
                    ) ) }
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
                <footer className="bg-movendi-navy text-white w-full">
                    <div className="max-w-6xl mx-auto px-8 py-10">
                        <div className="grid grid-cols-3 gap-8">
                            <div className="flex flex-col gap-4">
                                <span className="font-black text-white text-[20px] tracking-tight italic">movendi</span>
                                <p className="text-[11px] text-white/60 leading-relaxed">{ description }</p>
                                <div className="flex gap-3 text-white/50 text-sm">
                                    { socialFacebook && <span>FB</span> }
                                    { socialInstagram && <span>IG</span> }
                                    { socialTwitter && <span>X</span> }
                                    { socialYoutube && <span>YT</span> }
                                    { socialLinkedin && <span>LI</span> }
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-1">Kontaktuppgifter</p>
                                { contactAddress && <p className="text-[11px] text-white/60">Adress: { contactAddress }</p> }
                                { contactEmail && <p className="text-[11px] text-white/60">E-post: { contactEmail }</p> }
                                { contactPhone && <p className="text-[11px] text-white/60">Tel: { contactPhone }</p> }
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-1">{ newsletterTitle }</p>
                                <p className="text-[11px] text-white/60">{ newsletterDescription }</p>
                            </div>
                        </div>
                        <div className="mt-8 pt-4 border-t border-white/10 flex gap-6">
                            { legalLinks.map( ( link, i ) => (
                                <span key={ i } className="text-[10px] text-white/40">{ link.label }</span>
                            ) ) }
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
