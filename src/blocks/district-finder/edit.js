import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
    const { imageUrl, imageAlt, imageId, rightTitle, rightDescription, buttonLabel, buttonUrl } = attributes;

    const blockProps = useBlockProps();

    return (
        <>
            <InspectorControls>
                <PanelBody title={ __( 'Left Image', 'block-forge' ) }>
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
                        <Button onClick={ () => setAttributes( { imageUrl: '', imageAlt: '', imageId: undefined } ) } variant="link" isDestructive>
                            { __( 'Remove Image', 'block-forge' ) }
                        </Button>
                    ) }
                </PanelBody>
                <PanelBody title={ __( 'Right Panel', 'block-forge' ) }>
                    <TextControl
                        label={ __( 'Title', 'block-forge' ) }
                        value={ rightTitle }
                        onChange={ ( value ) => setAttributes( { rightTitle: value } ) }
                    />
                    <TextareaControl
                        label={ __( 'Description', 'block-forge' ) }
                        value={ rightDescription }
                        onChange={ ( value ) => setAttributes( { rightDescription: value } ) }
                    />
                    <TextControl
                        label={ __( 'Button Label', 'block-forge' ) }
                        value={ buttonLabel }
                        onChange={ ( value ) => setAttributes( { buttonLabel: value } ) }
                    />
                    <TextControl
                        label={ __( 'Button URL', 'block-forge' ) }
                        value={ buttonUrl }
                        onChange={ ( value ) => setAttributes( { buttonUrl: value } ) }
                    />
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
                <section className="w-full flex min-h-[240px]">
                    <div
                        className="flex-1 relative overflow-hidden bg-gray-200"
                        style={ imageUrl ? { backgroundImage: `url(${ imageUrl })`, backgroundSize: 'cover', backgroundPosition: 'center' } : {} }
                    >
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <div className="flex-1 bg-banner-heading flex items-center px-8 py-10">
                        <div className="max-w-xs">
                            <h2 className="text-white font-semibold text-[20px] leading-snug mb-3">{ rightTitle }</h2>
                            <p className="text-white/80 text-[12px] leading-relaxed mb-5">{ rightDescription }</p>
                            { buttonLabel && (
                                <span className="inline-flex items-center px-5 py-2 bg-white text-banner-heading rounded-full text-xs font-semibold">
                                    { buttonLabel }
                                </span>
                            ) }
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
