import { InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
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
import ElementStylePanel from '../../components/ElementStylePanel';
import LinkPicker from '../../components/LinkPicker';
import { toInlineStyle } from '../../components/typeStyles';

export default function Edit({ attributes, setAttributes }) {
    const {
        sectionTitle,
        sectionDescription,
        moreLinkLabel,
        moreLinkUrl,
        numberOfPosts,
        postType,
        offset,
        selectedPostIds,
        anchorId,
        sectionTitleStyle,
        sectionDescriptionStyle,
        moreLinkStyle,
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

    // Fill query — when the manual selection has FEWER posts than the
    // grid wants, fetch the remainder by date DESC, excluding the
    // already-selected IDs, honouring the offset. Mirrors render.php.
    const fillPosts = useSelect(
        (select) => {
            if (!selectedPostIds || selectedPostIds.length === 0) return [];
            if (selectedPostIds.length >= numberOfPosts) return [];
            const want = numberOfPosts - selectedPostIds.length;
            return select(coreStore).getEntityRecords('postType', postType, {
                per_page: want,
                offset,
                exclude: selectedPostIds,
                orderby: 'date',
                order: 'desc',
                _embed: true,
                status: 'publish',
            });
        },
        [postType, numberOfPosts, offset, selectedPostIds]
    );

    const usingManualSelection = selectedPostIds && selectedPostIds.length > 0;
    const previewPosts = usingManualSelection
        ? [...(selectedPosts || []), ...(fillPosts || [])].slice(0, numberOfPosts)
        : autoPosts;
    const isLoading = usingManualSelection
        ? selectedPosts === null
        || (selectedPostIds.length < numberOfPosts && fillPosts === null)
        : autoPosts === null;

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
                    <LinkPicker
                        label={__('"More" Link Destination', 'block-forge')}
                        url={moreLinkUrl}
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
                        help={usingManualSelection
                            ? __('Applies to the auto-filled posts when the manual selection has fewer items than the grid.', 'block-forge')
                            : undefined}
                    />
                    {usingManualSelection && selectedPostIds.length < numberOfPosts && (
                        <p style={{ fontSize: '12px', color: '#757575', marginTop: '4px' }}>
                            {__('Manual selection is shorter than the grid — the remaining slots will be filled with the latest posts (excluding the picked ones).', 'block-forge')}
                        </p>
                    )}
                </PanelBody>
                <ElementStylePanel
                    title={__('Section title style', 'block-forge')}
                    value={sectionTitleStyle}
                    onChange={(v) => setAttributes({ sectionTitleStyle: v })}
                />
                <ElementStylePanel
                    title={__('Section description style', 'block-forge')}
                    value={sectionDescriptionStyle}
                    onChange={(v) => setAttributes({ sectionDescriptionStyle: v })}
                />
                <ElementStylePanel
                    title={__('"More" link style', 'block-forge')}
                    value={moreLinkStyle}
                    onChange={(v) => setAttributes({ moreLinkStyle: v })}
                />

                <PanelBody title={__('Anchor', 'block-forge')} initialOpen={false}>
                    <TextControl
                        label={__('Section ID', 'block-forge')}
                        value={anchorId}
                        onChange={(value) => setAttributes({ anchorId: value })}
                        placeholder="e.g. about-us"
                        help={__('Used for one-page navigation links (#id).', 'block-forge')}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <section id={anchorId || undefined} className="w-full py-14 px-8">
                    <div className="max-w-[1120px] mx-auto">
                        <div className="flex items-center justify-between mb-4">
                            <RichText
                                tagName="h2"
                                className="type-label !text-black"
                                style={toInlineStyle(sectionTitleStyle)}
                                value={sectionTitle}
                                onChange={(value) => setAttributes({ sectionTitle: value })}
                                placeholder={__('Section title…', 'block-forge')}
                                allowedFormats={[]}
                            />
                            <span className="type-regular-link text-banner-heading text-sm font-semibold inline-flex items-center gap-1" style={toInlineStyle(moreLinkStyle)}>
                                <RichText
                                    tagName="span"
                                    value={moreLinkLabel}
                                    onChange={(value) => setAttributes({ moreLinkLabel: value })}
                                    placeholder={__('More link…', 'block-forge')}
                                    allowedFormats={[]}
                                />
                                {moreLinkLabel && <span>→</span>}
                            </span>
                        </div>
                        <RichText
                            tagName="p"
                            className="type-body font-ancizar-serif text-grey max-w-[760px] mb-8"
                            style={toInlineStyle(sectionDescriptionStyle)}
                            value={sectionDescription}
                            onChange={(value) => setAttributes({ sectionDescription: value })}
                            placeholder={__('Section description…', 'block-forge')}
                            allowedFormats={['core/bold', 'core/italic']}
                        />

                        {isLoading && (
                            <div className="flex justify-center py-10">
                                <Spinner />
                            </div>
                        )}

                        {!isLoading && previewPosts && previewPosts.length === 0 && (
                            <p className="type-body-sm text-banner-text">
                                {__('No posts found.', 'block-forge')}
                            </p>
                        )}

                        {!isLoading && previewPosts && previewPosts.length > 0 && (
                            <div className="grid grid-cols-3 gap-6">
                                {previewPosts.map((post) => {
                                    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
                                    const imgUrl = featuredMedia?.media_details?.sizes?.medium_large?.source_url
                                        ?? featuredMedia?.source_url
                                        ?? '';
                                    const terms = post._embedded?.['wp:term']?.[0] ?? [];
                                    const category = terms[0]?.name ?? '';
                                    const dateLabel = new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                                    const isReview = postType === 'review';
                                    // Exposed as top-level REST fields (`author`, `position`)
                                    // on the review post type — not inside `meta`.
                                    const reviewerName = post.author ?? '';
                                    const reviewerPosition = post.position ?? '';

                                    return (
                                        <article key={post.id} className="flex flex-col gap-3">

                                            <div className="bg-gray-100 rounded-xl aspect-[4/3] overflow-hidden">
                                                {imgUrl && (
                                                    <img
                                                        src={imgUrl}
                                                        alt={decodeEntities(post.title?.rendered ?? '')}
                                                        className="w-full h-full object-cover !m-0"
                                                    />
                                                )}
                                            </div>
                                            {isReview ? (
                                                <div className="flex items-center gap-2">

                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10 15.9287C14.1421 15.9287 17.5 12.5708 17.5 8.42871C17.5 4.28658 14.1421 0.928711 10 0.928711C5.85786 0.928711 2.5 4.28658 2.5 8.42871C2.5 12.5708 5.85786 15.9287 10 15.9287Z" stroke="#2F2F2F" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M10 10.9287C11.7259 10.9287 13.125 9.5296 13.125 7.80371C13.125 6.07782 11.7259 4.67871 10 4.67871C8.27411 4.67871 6.875 6.07782 6.875 7.80371C6.875 9.5296 8.27411 10.9287 10 10.9287Z" stroke="#2F2F2F" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M4.98438 14.0044C6.39062 11.2341 9.77656 10.1286 12.5461 11.5348C13.6102 12.0755 14.475 12.9395 15.0156 14.0044" stroke="#2F2F2F" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    {reviewerName && (
                                                        <span className="uppercase font-barlow-semicondensed text-sm font-semibold tracking-[0.03em] text-black">
                                                            {reviewerName.toUpperCase()}
                                                        </span>
                                                    )}
                                                    {reviewerPosition && (
                                                        <span className="type-caption text-base text-banner-text">
                                                            {reviewerPosition.toUpperCase()}
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    {category && (
                                                        <span className="uppercase font-semibold text-sm text-grey font-barlow-semicondensed tracking-[0.11em]">
                                                            {category}
                                                        </span>
                                                    )}
                                                    {category && dateLabel && (
                                                        <span className="type-body-sm text-grey">| {dateLabel}</span>
                                                    )}
                                                    {!category && dateLabel && (
                                                        <span className="type-body-sm text-grey">{dateLabel}</span>
                                                    )}
                                                </div>
                                            )}
                                            <h3
                                                className="font-barlow-semicondensed text-[24px] !text-black font-semibold leading-snug tracking-[-0.01em]"
                                                dangerouslySetInnerHTML={{ __html: post.title?.rendered ?? '' }}
                                            />
                                            <p
                                                className="type-body text-banner-text"
                                                dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered ?? '' }}
                                            />
                                        </article>
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
