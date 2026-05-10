import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
    const { sectionTitle, moreLinkLabel, moreLinkUrl, articles } = attributes;

    const blockProps = useBlockProps();

    const updateArticle = ( index, field, value ) => {
        const updated = articles.map( ( a, i ) => i === index ? { ...a, [ field ]: value } : a );
        setAttributes( { articles: updated } );
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

                { articles.map( ( article, i ) => (
                    <PanelBody key={ i } title={ `${ __( 'Article', 'block-forge' ) } ${ i + 1 }` } initialOpen={ i === 0 }>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={ ( media ) => {
                                    const updated = articles.map( ( a, idx ) =>
                                        idx === i ? { ...a, imageUrl: media.url, imageAlt: media.alt, imageId: media.id } : a
                                    );
                                    setAttributes( { articles: updated } );
                                } }
                                allowedTypes={ [ 'image' ] }
                                value={ article.imageId }
                                render={ ( { open } ) => (
                                    <Button onClick={ open } variant="secondary" style={ { marginBottom: '8px' } }>
                                        { article.imageUrl ? __( 'Replace Image', 'block-forge' ) : __( 'Select Image', 'block-forge' ) }
                                    </Button>
                                ) }
                            />
                        </MediaUploadCheck>
                        <TextControl
                            label={ __( 'Category', 'block-forge' ) }
                            value={ article.category }
                            onChange={ ( value ) => updateArticle( i, 'category', value ) }
                        />
                        <TextControl
                            label={ __( 'Date', 'block-forge' ) }
                            value={ article.date }
                            onChange={ ( value ) => updateArticle( i, 'date', value ) }
                        />
                        <TextControl
                            label={ __( 'Title', 'block-forge' ) }
                            value={ article.title }
                            onChange={ ( value ) => updateArticle( i, 'title', value ) }
                        />
                        <TextareaControl
                            label={ __( 'Excerpt', 'block-forge' ) }
                            value={ article.excerpt }
                            onChange={ ( value ) => updateArticle( i, 'excerpt', value ) }
                        />
                        <TextControl
                            label={ __( 'URL', 'block-forge' ) }
                            value={ article.url }
                            onChange={ ( value ) => updateArticle( i, 'url', value ) }
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
                            { articles.map( ( article, i ) => (
                                <div key={ i } className="flex flex-col gap-2">
                                    <div className="bg-gray-100 rounded-xl aspect-[4/3] overflow-hidden">
                                        { article.imageUrl && (
                                            <img src={ article.imageUrl } alt={ article.imageAlt } className="w-full h-full object-cover" />
                                        ) }
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[10px] font-bold tracking-wider text-banner-heading uppercase">{ article.category }</span>
                                        <span className="text-[10px] text-banner-text">· { article.date }</span>
                                    </div>
                                    <p className="text-[13px] font-semibold text-banner-heading leading-snug">{ article.title }</p>
                                    <p className="text-[11px] text-banner-text leading-relaxed">{ article.excerpt }</p>
                                </div>
                            ) ) }
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
