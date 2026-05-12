import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, SelectControl, TextControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const OVERLAY_CLASSES = {
    peach: 'bg-banner-peach',
    blue:  'bg-banner-blue',
};

export default function Edit( { attributes, setAttributes } ) {
    const { sectionTitle, sectionDescription, cards } = attributes;

    const blockProps = useBlockProps();

    const updateCard = ( index, field, value ) => {
        const updated = cards.map( ( c, i ) => i === index ? { ...c, [ field ]: value } : c );
        setAttributes( { cards: updated } );
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={ __( 'Section', 'block-forge' ) }>
                    <TextControl
                        label={ __( 'Section Title', 'block-forge' ) }
                        value={ sectionTitle }
                        onChange={ ( value ) => setAttributes( { sectionTitle: value } ) }
                    />
                    <TextareaControl
                        label={ __( 'Section Description', 'block-forge' ) }
                        value={ sectionDescription }
                        onChange={ ( value ) => setAttributes( { sectionDescription: value } ) }
                    />
                </PanelBody>

                { cards.map( ( card, i ) => (
                    <PanelBody key={ i } title={ `${ __( 'Card', 'block-forge' ) } ${ i + 1 }` } initialOpen={ i === 0 }>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={ ( media ) => {
                                    const updated = cards.map( ( c, idx ) =>
                                        idx === i ? { ...c, imageUrl: media.url, imageAlt: media.alt, imageId: media.id } : c
                                    );
                                    setAttributes( { cards: updated } );
                                } }
                                allowedTypes={ [ 'image' ] }
                                value={ card.imageId }
                                render={ ( { open } ) => (
                                    <Button onClick={ open } variant="secondary" style={ { marginBottom: '8px' } }>
                                        { card.imageUrl ? __( 'Replace Image', 'block-forge' ) : __( 'Select Image', 'block-forge' ) }
                                    </Button>
                                ) }
                            />
                        </MediaUploadCheck>
                        <SelectControl
                            label={ __( 'Label Color', 'block-forge' ) }
                            value={ card.colorVariant }
                            options={ [
                                { label: __( 'Peach', 'block-forge' ), value: 'peach' },
                                { label: __( 'Blue', 'block-forge' ),  value: 'blue' },
                            ] }
                            onChange={ ( value ) => updateCard( i, 'colorVariant', value ) }
                        />
                        <TextControl
                            label={ __( 'Title', 'block-forge' ) }
                            value={ card.title }
                            onChange={ ( value ) => updateCard( i, 'title', value ) }
                        />
                        <TextareaControl
                            label={ __( 'Description', 'block-forge' ) }
                            value={ card.description }
                            onChange={ ( value ) => updateCard( i, 'description', value ) }
                        />
                        <TextControl
                            label={ __( 'Link URL', 'block-forge' ) }
                            value={ card.linkUrl }
                            onChange={ ( value ) => updateCard( i, 'linkUrl', value ) }
                        />
                    </PanelBody>
                ) ) }
            </InspectorControls>

            <div { ...blockProps }>
                <section className="w-full py-10 px-8 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-6">
                            <h2 className="text-[20px] font-semibold text-banner-heading mb-2">{ sectionTitle }</h2>
                            <p className="text-[12px] text-banner-text max-w-xl">{ sectionDescription }</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            { cards.map( ( card, i ) => (
                                <div key={ i } className="rounded-xl overflow-hidden">
                                    <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                                        { card.imageUrl && (
                                            <img src={ card.imageUrl } alt={ card.imageAlt } className="w-full h-full object-cover" />
                                        ) }
                                    </div>
                                    <div className={ `${ OVERLAY_CLASSES[ card.colorVariant ] ?? 'bg-banner-peach' } px-4 py-3 flex items-start justify-between gap-2` }>
                                        <div>
                                            <p className="text-[13px] font-semibold text-banner-heading">{ card.title }</p>
                                            <p className="text-[10px] text-banner-text mt-0.5">{ card.description }</p>
                                        </div>
                                        <span className="text-banner-heading font-bold text-sm mt-0.5">→</span>
                                    </div>
                                </div>
                            ) ) }
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
