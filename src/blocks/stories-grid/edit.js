import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, TextControl, Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
    const { sectionTitle, moreLinkLabel, moreLinkUrl, numberOfPosts, postType } = attributes;

    const blockProps = useBlockProps();

    const postTypes = useSelect( ( select ) => {
        const types = select( coreStore ).getPostTypes( { per_page: -1 } );
        if ( ! types ) return [];
        return types
            .filter( ( t ) => t.viewable && t.slug !== 'attachment' )
            .map( ( t ) => ( { label: t.name, value: t.slug } ) );
    }, [] );

    const posts = useSelect( ( select ) => {
        return select( coreStore ).getEntityRecords( 'postType', postType, {
            per_page: numberOfPosts,
            _embed: true,
            status: 'publish',
        } );
    }, [ postType, numberOfPosts ] );

    const isLoading = ! posts;

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
                <PanelBody title={ __( 'Query', 'block-forge' ) }>
                    <RangeControl
                        label={ __( 'Number of posts', 'block-forge' ) }
                        value={ numberOfPosts }
                        onChange={ ( value ) => setAttributes( { numberOfPosts: value } ) }
                        min={ 1 }
                        max={ 12 }
                    />
                    { postTypes.length > 0 && (
                        <SelectControl
                            label={ __( 'Post type', 'block-forge' ) }
                            value={ postType }
                            options={ postTypes }
                            onChange={ ( value ) => setAttributes( { postType: value } ) }
                        />
                    ) }
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
                <section className="w-full py-10 px-8 bg-white">
                    <div className="max-w-6xl mx-auto">

                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[11px] font-semibold tracking-widest uppercase text-banner-text">
                                { sectionTitle }
                            </span>
                            { moreLinkLabel && (
                                <span className="text-xs font-semibold text-banner-heading">
                                    { moreLinkLabel } →
                                </span>
                            ) }
                        </div>

                        { isLoading && (
                            <div className="flex justify-center py-10">
                                <Spinner />
                            </div>
                        ) }

                        { ! isLoading && posts && posts.length === 0 && (
                            <p className="text-sm text-banner-text">
                                { __( 'No posts found for the selected post type.', 'block-forge' ) }
                            </p>
                        ) }

                        { ! isLoading && posts && posts.length > 0 && (
                            <div className={ `grid gap-5 grid-cols-${ Math.min( numberOfPosts, 3 ) }` }>
                                { posts.map( ( post ) => {
                                    const featuredMedia = post._embedded?.[ 'wp:featuredmedia' ]?.[ 0 ];
                                    const imgUrl = featuredMedia?.media_details?.sizes?.medium_large?.source_url
                                        ?? featuredMedia?.source_url
                                        ?? '';
                                    const terms = post._embedded?.[ 'wp:term' ]?.[ 0 ] ?? [];
                                    const category = terms[ 0 ]?.name ?? '';

                                    return (
                                        <div key={ post.id } className="flex flex-col gap-2">
                                            <div className="bg-banner-blue rounded-xl aspect-[4/3] overflow-hidden">
                                                { imgUrl && (
                                                    <img src={ imgUrl } alt={ post.title?.rendered ?? '' } className="w-full h-full object-cover" />
                                                ) }
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                { category && (
                                                    <span className="text-[10px] font-bold tracking-wider text-banner-text uppercase">{ category }</span>
                                                ) }
                                                <span className="text-[10px] text-banner-text">
                                                    · { new Date( post.date ).toLocaleDateString( 'sv-SE', { day: 'numeric', month: 'short', year: 'numeric' } ) }
                                                </span>
                                            </div>
                                            <p
                                                className="text-[13px] font-semibold text-banner-heading leading-snug"
                                                dangerouslySetInnerHTML={ { __html: post.title?.rendered ?? '' } }
                                            />
                                            <p
                                                className="text-[11px] text-banner-text leading-relaxed"
                                                dangerouslySetInnerHTML={ { __html: post.excerpt?.rendered ?? '' } }
                                            />
                                        </div>
                                    );
                                } ) }
                            </div>
                        ) }

                    </div>
                </section>
            </div>
        </>
    );
}
