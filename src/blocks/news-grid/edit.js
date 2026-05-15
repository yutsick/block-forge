import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
    Button,
    FormTokenField,
    PanelBody,
    RangeControl,
    SelectControl,
    Spinner,
    TextControl,
} from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useMemo, useState } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
    const {
        sectionTitle,
        moreLinkLabel,
        moreLinkUrl,
        numberOfPosts,
        postType,
        offset,
        selectedPostIds,
    } = attributes;

    const blockProps = useBlockProps();
    const [searchInput, setSearchInput] = useState('');

    const postTypes = useSelect((select) => {
        const types = select(coreStore).getPostTypes({ per_page: -1 });
        if (!types) return [];
        return types
            .filter((t) => t.viewable && t.slug !== 'attachment')
            .map((t) => ({ label: t.name, value: t.slug }));
    }, []);

    // Posts currently selected by ID — needed to show their titles as tokens
    // and to render the preview in the correct order.
    const selectedPosts = useSelect(
        (select) => {
            if (!selectedPostIds || selectedPostIds.length === 0) return [];
            return select(coreStore).getEntityRecords('postType', postType, {
                include: selectedPostIds,
                orderby: 'include',
                per_page: selectedPostIds.length,
                _embed: true,
            });
        },
        [postType, selectedPostIds]
    );

    // Search results for the token field's autocomplete suggestions.
    const searchedPosts = useSelect(
        (select) => {
            if (!searchInput) return [];
            return (
                select(coreStore).getEntityRecords('postType', postType, {
                    per_page: 20,
                    search: searchInput,
                    status: 'publish',
                }) ?? []
            );
        },
        [postType, searchInput]
    );

    // Auto-fallback query when the user hasn't manually picked posts.
    const autoPosts = useSelect(
        (select) => {
            if (selectedPostIds && selectedPostIds.length > 0) return [];
            return select(coreStore).getEntityRecords('postType', postType, {
                per_page: numberOfPosts,
                offset,
                _embed: true,
                status: 'publish',
            });
        },
        [postType, numberOfPosts, offset, selectedPostIds]
    );

    const usingManualSelection = selectedPostIds && selectedPostIds.length > 0;
    const previewPosts = usingManualSelection ? selectedPosts : autoPosts;
    const isLoading = !previewPosts;

    const titleById = useMemo(() => {
        const map = {};
        (selectedPosts || []).forEach((p) => {
            map[p.id] = decodeEntities(p.title?.rendered ?? '');
        });
        (searchedPosts || []).forEach((p) => {
            map[p.id] = decodeEntities(p.title?.rendered ?? '');
        });
        return map;
    }, [selectedPosts, searchedPosts]);

    const tokenValues = (selectedPostIds || []).map((id) => ({
        value: String(id),
        title: titleById[id] ?? `#${id}`,
    }));

    const suggestions = (searchedPosts || [])
        .filter((p) => !(selectedPostIds || []).includes(p.id))
        .map((p) => decodeEntities(p.title?.rendered ?? ''));

    const onTokensChange = (tokens) => {
        const ids = tokens
            .map((token) => {
                if (typeof token === 'object' && token.value) {
                    return Number(token.value);
                }
                // String token — match by title against the latest search results.
                const match = (searchedPosts || []).find(
                    (p) => decodeEntities(p.title?.rendered ?? '') === token
                );
                return match ? match.id : null;
            })
            .filter((id) => id && Number.isFinite(id));
        setAttributes({ selectedPostIds: ids });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section', 'block-forge')}>
                    <TextControl
                        label={__('Section Title', 'block-forge')}
                        value={sectionTitle}
                        onChange={(value) => setAttributes({ sectionTitle: value })}
                    />
                    <TextControl
                        label={__('"More" Link Label', 'block-forge')}
                        value={moreLinkLabel}
                        onChange={(value) => setAttributes({ moreLinkLabel: value })}
                    />
                    <TextControl
                        label={__('"More" Link URL', 'block-forge')}
                        value={moreLinkUrl}
                        onChange={(value) => setAttributes({ moreLinkUrl: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Posts', 'block-forge')}>
                    {postTypes.length > 0 && (
                        <SelectControl
                            label={__('Post type', 'block-forge')}
                            value={postType}
                            options={postTypes}
                            onChange={(value) => setAttributes({
                                postType: value,
                                selectedPostIds: [],
                            })}
                        />
                    )}

                    <FormTokenField
                        label={__('Pick specific posts', 'block-forge')}
                        value={tokenValues}
                        suggestions={suggestions}
                        onInputChange={setSearchInput}
                        onChange={onTokensChange}
                        __experimentalShowHowTo={false}
                    />
                    <p style={{ fontSize: '12px', color: '#757575', marginTop: '4px' }}>
                        {__('Start typing to search. Leave empty to show the latest posts automatically.', 'block-forge')}
                    </p>

                    {usingManualSelection && (
                        <Button
                            variant="tertiary"
                            onClick={() => setAttributes({ selectedPostIds: [] })}
                            style={{ marginTop: '8px' }}
                        >
                            {__('Clear selection', 'block-forge')}
                        </Button>
                    )}

                    {!usingManualSelection && (
                        <>
                            <RangeControl
                                label={__('Number of posts', 'block-forge')}
                                value={numberOfPosts}
                                onChange={(value) => setAttributes({ numberOfPosts: value })}
                                min={1}
                                max={12}
                            />
                            <RangeControl
                                label={__('Offset (skip first N posts)', 'block-forge')}
                                value={offset}
                                onChange={(value) => setAttributes({ offset: value })}
                                min={0}
                                max={50}
                            />
                        </>
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <section className="w-full py-10 px-8 bg-white">
                    <div className="max-w-[1120px] mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[11px] font-semibold tracking-widest uppercase text-banner-text">
                                {sectionTitle}
                            </span>
                            {moreLinkLabel && (
                                <span className="text-xs font-semibold text-banner-heading">
                                    {moreLinkLabel} →
                                </span>
                            )}
                        </div>

                        {isLoading && (
                            <div className="flex justify-center py-10">
                                <Spinner />
                            </div>
                        )}

                        {!isLoading && previewPosts && previewPosts.length === 0 && (
                            <p className="text-sm text-banner-text">
                                {__('No posts found.', 'block-forge')}
                            </p>
                        )}

                        {!isLoading && previewPosts && previewPosts.length > 0 && (
                            <div className="grid grid-cols-3 gap-5">
                                {previewPosts.map((post) => {
                                    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
                                    const imgUrl = featuredMedia?.media_details?.sizes?.medium_large?.source_url
                                        ?? featuredMedia?.source_url
                                        ?? '';
                                    const terms = post._embedded?.['wp:term']?.[0] ?? [];
                                    const category = terms[0]?.name ?? '';

                                    return (
                                        <div key={post.id} className="flex flex-col gap-2">
                                            <div className="bg-gray-100 rounded-xl aspect-[4/3] overflow-hidden">
                                                {imgUrl && (
                                                    <img
                                                        src={imgUrl}
                                                        alt={decodeEntities(post.title?.rendered ?? '')}
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                {category && (
                                                    <span className="text-[10px] font-bold tracking-wider text-banner-heading uppercase">
                                                        {category}
                                                    </span>
                                                )}
                                                <span className="text-[10px] text-banner-text">
                                                    · {new Date(post.date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <p
                                                className="text-[13px] font-semibold text-banner-heading leading-snug"
                                                dangerouslySetInnerHTML={{ __html: post.title?.rendered ?? '' }}
                                            />
                                            <p
                                                className="text-[11px] text-banner-text leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered ?? '' }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}
