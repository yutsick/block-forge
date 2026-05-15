import { InspectorControls, MediaUpload, MediaUploadCheck, RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, RadioControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
    const { bgType, imageUrl, imageAlt, imageId, videoUrl, videoId, title, description, primaryButton, secondaryButton } = attributes;

    const blockProps = useBlockProps();
    const isVideo = bgType === 'video';

    return (
        <>
            <InspectorControls>
                <PanelBody title={ __( 'Background', 'block-forge' ) }>
                    <RadioControl
                        label={ __( 'Background type', 'block-forge' ) }
                        selected={ bgType }
                        options={ [
                            { label: __( 'Image', 'block-forge' ), value: 'image' },
                            { label: __( 'Video', 'block-forge' ), value: 'video' },
                        ] }
                        onChange={ ( value ) => setAttributes( { bgType: value } ) }
                    />

                    { isVideo ? (
                        <div style={ { marginTop: '12px' } }>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={ ( media ) => setAttributes( { videoUrl: media.url, videoId: media.id } ) }
                                    allowedTypes={ [ 'video' ] }
                                    value={ videoId }
                                    render={ ( { open } ) => (
                                        <Button onClick={ open } variant="secondary" style={ { marginBottom: '8px', display: 'block' } }>
                                            { videoUrl ? __( 'Replace Video', 'block-forge' ) : __( 'Select Video', 'block-forge' ) }
                                        </Button>
                                    ) }
                                />
                            </MediaUploadCheck>
                            { videoUrl && (
                                <Button
                                    onClick={ () => setAttributes( { videoUrl: '', videoId: undefined } ) }
                                    variant="link"
                                    isDestructive
                                >
                                    { __( 'Remove Video', 'block-forge' ) }
                                </Button>
                            ) }
                        </div>
                    ) : (
                        <div style={ { marginTop: '12px' } }>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={ ( media ) => setAttributes( { imageUrl: media.url, imageAlt: media.alt, imageId: media.id } ) }
                                    allowedTypes={ [ 'image' ] }
                                    value={ imageId }
                                    render={ ( { open } ) => (
                                        <Button onClick={ open } variant="secondary" style={ { marginBottom: '8px', display: 'block' } }>
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
                        </div>
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
                    style={ ! isVideo && imageUrl ? { backgroundImage: `url(${ imageUrl })`, backgroundSize: 'cover', backgroundPosition: 'center' } : {} }
                >
                    { isVideo && videoUrl && (
                        <video
                            src={ videoUrl }
                            className="absolute inset-0 w-full h-full object-cover"
                            autoPlay muted loop playsInline
                            style={ { pointerEvents: 'none' } }
                        />
                    ) }

                    <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />

                    <div className="relative z-10 w-full max-w-[1120px] mx-auto px-8 py-10">
                        <RichText
                            tagName="h1"
                            className={ `font-semibold mb-3 max-w-xl ${ isVideo ? 'text-[#AED9E9] text-[48px] leading-[54px]' : 'text-white text-[36px] leading-[42px]' }` }
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
                                <span className="inline-flex items-center px-5 py-2 bg-banner-peach text-banner-heading rounded-full text-xs font-semibold">
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

                    { isVideo && (
                        <div className="absolute bottom-4 right-6 z-20 w-10 h-10 rounded-full border-2 border-white/70 flex items-center justify-center text-white bg-black/20 pointer-events-none">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="white"><rect x="2" y="1" width="4" height="14" rx="1"/><rect x="10" y="1" width="4" height="14" rx="1"/></svg>
                        </div>
                    ) }
                </section>
            </div>
        </>
    );
}
