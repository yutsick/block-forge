import { InspectorControls, MediaUpload, MediaUploadCheck, RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const BG_CLASSES = {
    white: 'bg-white',
    peach: 'bg-banner-peach',
    blue:  'bg-banner-blue',
    pink:  'bg-banner-pink',
};

export default function Edit( { attributes, setAttributes } ) {
    const {
        title, description, linkLabel, linkUrl,
        imageUrl, imageAlt, imageId,
        imageType, imagePosition, backgroundColor,
    } = attributes;

    const blockProps = useBlockProps();
    const bgClass = BG_CLASSES[ backgroundColor ] ?? 'bg-white';
    const isFull   = imageType === 'full';
    const imgRight = imagePosition === 'right';

    const imageColumn = (
        <div className={ isFull
            ? 'flex-[3] relative min-h-[200px] overflow-hidden bg-banner-blue'
            : 'flex-1'
        }>
            <MediaUploadCheck>
                <MediaUpload
                    onSelect={ ( media ) => setAttributes( { imageUrl: media.url, imageAlt: media.alt, imageId: media.id } ) }
                    allowedTypes={ [ 'image' ] }
                    value={ imageId }
                    render={ ( { open } ) => (
                        imageUrl ? (
                            <img
                                src={ imageUrl }
                                alt={ imageAlt }
                                onClick={ open }
                                className={ isFull
                                    ? 'absolute inset-0 w-full h-full object-cover cursor-pointer'
                                    : 'w-full object-cover rounded-2xl cursor-pointer max-h-[360px]'
                                }
                            />
                        ) : (
                            <Button
                                onClick={ open }
                                className={ isFull
                                    ? 'absolute inset-0 w-full h-full flex items-center justify-center bg-banner-blue/50 text-banner-heading text-sm font-semibold'
                                    : 'w-full aspect-[4/3] flex items-center justify-center bg-banner-blue rounded-2xl text-banner-heading text-sm font-semibold'
                                }
                            >
                                { __( 'Select Image', 'block-forge' ) }
                            </Button>
                        )
                    ) }
                />
            </MediaUploadCheck>
        </div>
    );

    const textColumn = (
        <div className={ isFull
            ? `flex-[2] ${ bgClass } flex items-center px-10 py-10`
            : `flex-1 flex flex-col justify-center ${ bgClass } ${ isFull ? '' : 'py-4' }`
        }>
            <div className={ isFull ? 'max-w-xs' : '' }>
                <RichText
                    tagName="h2"
                    className={ `font-semibold text-banner-heading mb-3 ${ isFull ? 'text-[22px] leading-snug' : 'text-[26px] leading-tight' }` }
                    value={ title }
                    onChange={ ( value ) => setAttributes( { title: value } ) }
                    placeholder={ __( 'Title…', 'block-forge' ) }
                />
                <RichText
                    tagName="p"
                    className="text-[13px] text-banner-text leading-relaxed mb-4"
                    value={ description }
                    onChange={ ( value ) => setAttributes( { description: value } ) }
                    placeholder={ __( 'Description…', 'block-forge' ) }
                />
                { linkLabel && (
                    <span className="text-xs font-semibold text-banner-heading">
                        { linkLabel } →
                    </span>
                ) }
            </div>
        </div>
    );

    return (
        <>
            <InspectorControls>
                <PanelBody title={ __( 'Layout', 'block-forge' ) }>
                    <SelectControl
                        label={ __( 'Image Type', 'block-forge' ) }
                        value={ imageType }
                        options={ [
                            { label: __( 'Boxed (rounded corners)', 'block-forge' ), value: 'boxed' },
                            { label: __( 'Full bleed', 'block-forge' ),              value: 'full' },
                        ] }
                        onChange={ ( value ) => setAttributes( { imageType: value } ) }
                    />
                    <SelectControl
                        label={ __( 'Image Position', 'block-forge' ) }
                        value={ imagePosition }
                        options={ [
                            { label: __( 'Left', 'block-forge' ),  value: 'left' },
                            { label: __( 'Right', 'block-forge' ), value: 'right' },
                        ] }
                        onChange={ ( value ) => setAttributes( { imagePosition: value } ) }
                    />
                    <SelectControl
                        label={ __( 'Background Color', 'block-forge' ) }
                        value={ backgroundColor }
                        options={ [
                            { label: __( 'White', 'block-forge' ), value: 'white' },
                            { label: __( 'Peach', 'block-forge' ), value: 'peach' },
                            { label: __( 'Blue', 'block-forge' ),  value: 'blue' },
                            { label: __( 'Pink', 'block-forge' ),  value: 'pink' },
                        ] }
                        onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
                    />
                </PanelBody>
                <PanelBody title={ __( 'Link', 'block-forge' ) } initialOpen={ false }>
                    <TextControl
                        label={ __( 'Link Label', 'block-forge' ) }
                        value={ linkLabel }
                        onChange={ ( value ) => setAttributes( { linkLabel: value } ) }
                    />
                    <TextControl
                        label={ __( 'Link URL', 'block-forge' ) }
                        value={ linkUrl }
                        onChange={ ( value ) => setAttributes( { linkUrl: value } ) }
                    />
                </PanelBody>
                <PanelBody title={ __( 'Image', 'block-forge' ) } initialOpen={ false }>
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
            </InspectorControls>

            <div { ...blockProps }>
                <section className={ `w-full flex ${ isFull ? 'min-h-[220px]' : `${ bgClass } py-8 px-8` }` }>
                    <div className={ `w-full flex ${ isFull ? '' : 'max-w-6xl mx-auto' } items-center gap-8 ${ imgRight ? 'flex-row-reverse' : 'flex-row' }` }>
                        { imageColumn }
                        { textColumn }
                    </div>
                </section>
            </div>
        </>
    );
}
