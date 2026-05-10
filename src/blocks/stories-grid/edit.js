import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
    const { sectionTitle, moreLinkLabel, moreLinkUrl, stories } = attributes;

    const blockProps = useBlockProps();

    const updateStory = ( index, field, value ) => {
        const updated = stories.map( ( s, i ) => i === index ? { ...s, [ field ]: value } : s );
        setAttributes( { stories: updated } );
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
                    <TextControl
                        label={ __( '"More" Link Label', 'block-forge' ) }
                        value={ moreLinkLabel }
                        onChange={ ( value ) => setAttributes( { moreLinkLabel: value } ) }
                    />
                    <TextControl
                        label={ __( '"More" Link URL', 'block-forge' ) }
                        value={ moreLinkUrl }
                        onChange={ ( value ) => setAttributes( { moreLinkUrl: value } ) }
                    />
                </PanelBody>

                { stories.map( ( story, i ) => (
                    <PanelBody key={ i } title={ `${ __( 'Story', 'block-forge' ) } ${ i + 1 }` } initialOpen={ i === 0 }>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={ ( media ) => {
                                    const updated = stories.map( ( s, idx ) =>
                                        idx === i ? { ...s, imageUrl: media.url, imageAlt: media.alt, imageId: media.id } : s
                                    );
                                    setAttributes( { stories: updated } );
                                } }
                                allowedTypes={ [ 'image' ] }
                                value={ story.imageId }
                                render={ ( { open } ) => (
                                    <Button onClick={ open } variant="secondary" style={ { marginBottom: '8px' } }>
                                        { story.imageUrl ? __( 'Replace Image', 'block-forge' ) : __( 'Select Image', 'block-forge' ) }
                                    </Button>
                                ) }
                            />
                        </MediaUploadCheck>
                        <TextControl
                            label={ __( 'Name', 'block-forge' ) }
                            value={ story.category }
                            onChange={ ( value ) => updateStory( i, 'category', value ) }
                        />
                        <TextControl
                            label={ __( 'Role / Location', 'block-forge' ) }
                            value={ story.location }
                            onChange={ ( value ) => updateStory( i, 'location', value ) }
                        />
                        <TextControl
                            label={ __( 'Quote Title', 'block-forge' ) }
                            value={ story.title }
                            onChange={ ( value ) => updateStory( i, 'title', value ) }
                        />
                        <TextareaControl
                            label={ __( 'Excerpt', 'block-forge' ) }
                            value={ story.excerpt }
                            onChange={ ( value ) => updateStory( i, 'excerpt', value ) }
                        />
                        <TextControl
                            label={ __( 'URL', 'block-forge' ) }
                            value={ story.url }
                            onChange={ ( value ) => updateStory( i, 'url', value ) }
                        />
                    </PanelBody>
                ) ) }
            </InspectorControls>

            <div { ...blockProps }>
                <section className="w-full py-10 px-8 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[11px] font-semibold tracking-widest uppercase text-banner-text">{ sectionTitle }</span>
                            { moreLinkLabel && (
                                <span className="text-xs font-semibold text-banner-heading">{ moreLinkLabel } →</span>
                            ) }
                        </div>
                        <div className="grid grid-cols-3 gap-5">
                            { stories.map( ( story, i ) => (
                                <div key={ i } className="flex flex-col gap-2">
                                    <div className="bg-gray-100 rounded-xl aspect-[4/3] overflow-hidden">
                                        { story.imageUrl && (
                                            <img src={ story.imageUrl } alt={ story.imageAlt } className="w-full h-full object-cover" />
                                        ) }
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[10px] font-bold tracking-wider text-banner-text uppercase">{ story.category }</span>
                                        { story.location && <span className="text-[10px] text-banner-text">· { story.location }</span> }
                                    </div>
                                    <p className="text-[13px] font-semibold text-banner-heading leading-snug">{ story.title }</p>
                                    <p className="text-[11px] text-banner-text leading-relaxed">{ story.excerpt }</p>
                                </div>
                            ) ) }
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
