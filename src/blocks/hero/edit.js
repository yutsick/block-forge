import { InspectorControls, MediaUpload, MediaUploadCheck, RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
    const { imageUrl, imageAlt, imageId, title, description, primaryButton, secondaryButton } = attributes;

    const blockProps = useBlockProps();

    return (
        <>
            <InspectorControls>
                <PanelBody title={ __( 'Background Image', 'block-forge' ) }>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={ ( media ) => setAttributes( { imageUrl: media.url, imageAlt: media.alt, imageId: media.id } ) }
                            allowedTypes={ [ 'image' ] }
                            value={ imageId }
                            render={ ( { open } ) => (
                                <Button onClick={ open } variant="secondary" style={ { marginBottom: '8px' } }>
                                    { imageUrl ? __( 'Replace Image', 'block-forge' ) : __( 'Select Image', 'block-forge' ) }
                                </Button>
                            ) }
                        />
                    </MediaUploadCheck>
                    { imageUrl && (
                        <Button
                            onClick={ () => setAttributes( { imageUrl: '', imageAlt: '', imageId: undefined } ) }
                            variant="link"
                            isDestructive
                        >
                            { __( 'Remove Image', 'block-forge' ) }
                        </Button>
                    ) }
                </PanelBody>
                <PanelBody title={ __( 'Primary Button', 'block-forge' ) }>
                    <TextControl
                        label={ __( 'Label', 'block-forge' ) }
                        value={ primaryButton.label }
                        onChange={ ( value ) => setAttributes( { primaryButton: { ...primaryButton, label: value } } ) }
                    />
                    <TextControl
                        label={ __( 'URL', 'block-forge' ) }
                        value={ primaryButton.url }
                        onChange={ ( value ) => setAttributes( { primaryButton: { ...primaryButton, url: value } } ) }
                    />
                </PanelBody>
                <PanelBody title={ __( 'Secondary Button', 'block-forge' ) }>
                    <TextControl
                        label={ __( 'Label', 'block-forge' ) }
                        value={ secondaryButton.label }
                        onChange={ ( value ) => setAttributes( { secondaryButton: { ...secondaryButton, label: value } } ) }
                    />
                    <TextControl
                        label={ __( 'URL', 'block-forge' ) }
                        value={ secondaryButton.url }
                        onChange={ ( value ) => setAttributes( { secondaryButton: { ...secondaryButton, url: value } } ) }
                    />
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
                <section
                    className="relative w-full min-h-[320px] flex items-end overflow-hidden bg-banner-heading"
                    style={ imageUrl ? { backgroundImage: `url(${ imageUrl })`, backgroundSize: 'cover', backgroundPosition: 'center' } : {} }
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />

                    <div className="relative z-10 w-full max-w-6xl mx-auto px-8 py-10">
                        <RichText
                            tagName="h1"
                            className="text-white font-semibold text-[36px] leading-[42px] tracking-[-0.68px] mb-3 max-w-xl"
                            value={ title }
                            onChange={ ( value ) => setAttributes( { title: value } ) }
                            placeholder={ __( 'Hero heading…', 'block-forge' ) }
                        />
                        <RichText
                            tagName="p"
                            className="text-white/90 text-[14px] leading-[20px] mb-5 max-w-sm"
                            value={ description }
                            onChange={ ( value ) => setAttributes( { description: value } ) }
                            placeholder={ __( 'Description…', 'block-forge' ) }
                        />
                        <div className="flex flex-wrap gap-3">
                            { primaryButton.label && (
                                <span className="inline-flex items-center px-5 py-2 bg-white text-banner-heading rounded-full text-xs font-semibold">
                                    { primaryButton.label }
                                </span>
                            ) }
                            { secondaryButton.label && (
                                <span className="inline-flex items-center px-5 py-2 border-2 border-white text-white rounded-full text-xs font-semibold">
                                    { secondaryButton.label }
                                </span>
                            ) }
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
