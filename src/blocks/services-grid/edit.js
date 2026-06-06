import { InspectorControls, MediaUpload, MediaUploadCheck, RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, RangeControl, SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ElementStylePanel from '../../components/ElementStylePanel';
import LinkPicker from '../../components/LinkPicker';
import { toInlineStyle } from '../../components/typeStyles';

const BG_CLASSES = {
    white: 'bg-white',
    dark: 'bg-gray-900',
    blue: 'bg-banner-blue',
    peach: 'bg-banner-peach',
};

const trashIcon = (
    <svg class="!fill-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
    </svg>

);

export default function Edit({ attributes, setAttributes }) {
    const {
        sectionTitle, sectionDescription, backgroundColor, verticalSpacing, visibleLinks, cards,
        sectionTitleStyle, sectionDescriptionStyle, cardTitleStyle, cardDescriptionStyle, linkLabelStyle,
    } = attributes;

    const blockProps = useBlockProps();
    const bgClass = BG_CLASSES[backgroundColor] ?? 'bg-white';
    const isDark = backgroundColor === 'dark';

    const SPACING_CLASSES = {
        both:   'py-8 md:py-14',
        top:    'pt-8 md:pt-14',
        bottom: 'pb-8 md:pb-14',
        none:   '',
    };
    const spacingClass = SPACING_CLASSES[verticalSpacing] ?? 'py-8 md:py-14';

    const updateCard = (cardIndex, field, value) => {
        const updated = cards.map((c, i) => i === cardIndex ? { ...c, [field]: value } : c);
        setAttributes({ cards: updated });
    };

    const updateLink = (cardIndex, linkIndex, field, value) => {
        const updated = cards.map((c, ci) => {
            if (ci !== cardIndex) return c;
            const links = c.links.map((l, li) => li === linkIndex ? { ...l, [field]: value } : l);
            return { ...c, links };
        });
        setAttributes({ cards: updated });
    };

    const addLink = (cardIndex) => {
        const updated = cards.map((c, i) =>
            i === cardIndex ? { ...c, links: [...c.links, { label: '', url: '' }] } : c
        );
        setAttributes({ cards: updated });
    };

    const removeLink = (cardIndex, linkIndex) => {
        const updated = cards.map((c, i) => {
            if (i !== cardIndex) return c;
            return { ...c, links: c.links.filter((_, li) => li !== linkIndex) };
        });
        setAttributes({ cards: updated });
    };

    const addCard = () => {
        setAttributes({
            cards: [
                ...cards,
                {
                    imageUrl: '',
                    imageAlt: '',
                    imageId: 0,
                    title: '',
                    titleUrl: '',
                    description: '',
                    showMoreLabel: 'Visa fler',
                    links: [],
                },
            ],
        });
    };

    const removeCard = (cardIndex) => {
        setAttributes({ cards: cards.filter((_, i) => i !== cardIndex) });
    };

    const hasSectionHeader = !!(sectionTitle || sectionDescription);

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section', 'block-forge')}>
                    <SelectControl
                        label={__('Background Color', 'block-forge')}
                        value={backgroundColor}
                        options={[
                            { label: __('White', 'block-forge'), value: 'white' },
                            { label: __('Dark', 'block-forge'), value: 'dark' },
                            { label: __('Blue', 'block-forge'), value: 'blue' },
                            { label: __('Peach', 'block-forge'), value: 'peach' },
                        ]}
                        onChange={(v) => setAttributes({ backgroundColor: v })}
                    />
                    <SelectControl
                        label={__('Vertical spacing', 'block-forge')}
                        value={verticalSpacing}
                        options={[
                            { label: __('Both (top + bottom)', 'block-forge'), value: 'both' },
                            { label: __('Top only', 'block-forge'),            value: 'top' },
                            { label: __('Bottom only', 'block-forge'),         value: 'bottom' },
                            { label: __('None', 'block-forge'),                value: 'none' },
                        ]}
                        onChange={(v) => setAttributes({ verticalSpacing: v })}
                    />
                    <RangeControl
                        label={__('Links visible before "Show more"', 'block-forge')}
                        value={visibleLinks}
                        onChange={(v) => setAttributes({ visibleLinks: v })}
                        min={1}
                        max={10}
                    />
                </PanelBody>

                {cards.map((card, ci) => (
                    <PanelBody key={ci} title={`${__('Card', 'block-forge')} ${ci + 1}`} initialOpen={ci === 0}>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => {
                                    const updated = cards.map((c, i) =>
                                        i === ci ? { ...c, imageUrl: media.url, imageAlt: media.alt, imageId: media.id } : c
                                    );
                                    setAttributes({ cards: updated });
                                }}
                                allowedTypes={['image']}
                                value={card.imageId}
                                render={({ open }) => (
                                    <Button onClick={open} variant="secondary" style={{ marginBottom: '8px' }}>
                                        {card.imageUrl ? __('Replace Image', 'block-forge') : __('Select Image', 'block-forge')}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                        <TextControl
                            label={__('"Show more" label', 'block-forge')}
                            value={card.showMoreLabel}
                            onChange={(v) => updateCard(ci, 'showMoreLabel', v)}
                        />
                        <p style={{ fontSize: '11px', color: '#757575', margin: '4px 0 12px 0' }}>
                            {__('Tip: edit, add and remove the card\'s links directly on the card.', 'block-forge')}
                        </p>
                        <Button
                            variant="secondary"
                            isDestructive
                            onClick={() => removeCard(ci)}
                            style={{ marginTop: '8px' }}
                        >
                            {__('Remove this card', 'block-forge')}
                        </Button>
                    </PanelBody>
                ))}

                <PanelBody initialOpen={false} title={__('Add card', 'block-forge')}>
                    <Button variant="primary" onClick={addCard}>
                        {__('+ Add a new card', 'block-forge')}
                    </Button>
                    <p style={{ fontSize: '11px', color: '#757575', margin: '8px 0 0 0' }}>
                        {__('Cards render in a 2-column grid. Use 2, 4, 6, 8… for clean rows.', 'block-forge')}
                    </p>
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
                    title={__('Card title style', 'block-forge')}
                    value={cardTitleStyle}
                    onChange={(v) => setAttributes({ cardTitleStyle: v })}
                />
                <ElementStylePanel
                    title={__('Card description style', 'block-forge')}
                    value={cardDescriptionStyle}
                    onChange={(v) => setAttributes({ cardDescriptionStyle: v })}
                />
                <ElementStylePanel
                    title={__('Link label style', 'block-forge')}
                    value={linkLabelStyle}
                    onChange={(v) => setAttributes({ linkLabelStyle: v })}
                />
            </InspectorControls>

            <div {...blockProps}>
                <section className={`w-full ${bgClass} ${spacingClass} px-8`}>
                    <div className="max-w-[1120px] mx-auto">
                        {/* Editor: always render the header so users can type into it.
                            Front-end (render.php) skips the header div entirely when both are empty. */}
                        <div className="mb-8">
                            <RichText
                                tagName="h2"
                                className={`type-h3 mb-4 ${isDark ? 'text-gray-100' : 'text-[#2F2F2F]'}`}
                                style={toInlineStyle(sectionTitleStyle)}
                                value={sectionTitle}
                                onChange={(v) => setAttributes({ sectionTitle: v })}
                                placeholder={__('Section title…', 'block-forge')}
                                allowedFormats={[]}
                            />
                            <RichText
                                tagName="p"
                                className={`type-ingress max-w-[928px] ${isDark ? 'text-gray-400' : 'text-banner-text'}`}
                                style={toInlineStyle(sectionDescriptionStyle)}
                                value={sectionDescription}
                                onChange={(v) => setAttributes({ sectionDescription: v })}
                                placeholder={__('Section description…', 'block-forge')}
                                allowedFormats={['core/bold', 'core/italic']}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            {cards.map((card, ci) => (
                                <div key={ci} className="flex flex-col gap-4">
                                    {card.imageUrl ? (
                                        <img src={card.imageUrl} alt={card.imageAlt} className="w-full rounded-[8px] h-[236px] object-cover" />
                                    ) : (
                                        <div className="w-full rounded-[8px] h-[236px] bg-banner-blue" />
                                    )}
                                    <div className="inline-flex items-center gap-2 group">
                                        <RichText
                                            tagName="h3"
                                            className={`type-h4 ${isDark ? 'text-gray-100' : 'text-[#2F2F2F]'}`}
                                            style={toInlineStyle(cardTitleStyle)}
                                            value={card.title}
                                            onChange={(v) => updateCard(ci, 'title', v)}
                                            placeholder={__('Card title…', 'block-forge')}
                                            allowedFormats={[]}
                                        />
                                        {card.titleUrl && (

                                            <svg class="shrink-0 transition-transform duration-200 ease-out !mt-6 group-hover:translate-x-1"
                                                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 12.375L19.25 12.375" stroke="currentColor" stroke-width="1.8"
                                                    stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M12.5 19.125L19.25 12.375L12.5 5.625" stroke="currentColor" stroke-width="1.8"
                                                    stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        )}
                                        <LinkPicker
                                            compact
                                            url={card.titleUrl || ''}
                                            onChange={(v) => updateCard(ci, 'titleUrl', v)}
                                        />
                                    </div>
                                    <RichText
                                        tagName="p"
                                        className={`type-body ${isDark ? 'text-gray-400' : 'text-banner-text'}`}
                                        style={toInlineStyle(cardDescriptionStyle)}
                                        value={card.description}
                                        onChange={(v) => updateCard(ci, 'description', v)}
                                        placeholder={__('Card description…', 'block-forge')}
                                        allowedFormats={['core/bold', 'core/italic']}
                                    />
                                    <ul className="block-forge-list flex flex-col gap-2.5">
                                        {card.links.map((link, li) => (
                                            <li
                                                key={li}
                                                className="inline-flex items-center gap-1 group/link"
                                                style={{
                                                    ...toInlineStyle(linkLabelStyle),
                                                    opacity: li >= visibleLinks ? 0.55 : 1,
                                                }}
                                            >
                                                <RichText
                                                    tagName="span"
                                                    className="type-regular-link"
                                                    value={link.label}
                                                    onChange={(v) => updateLink(ci, li, 'label', v)}
                                                    placeholder={__('Link label…', 'block-forge')}
                                                    allowedFormats={[]}
                                                />
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4 12.375L19.25 12.375" stroke="#27348B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M12.5 19.125L19.25 12.375L12.5 5.625" stroke="#27348B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <span style={{ marginLeft: '6px', display: 'inline-flex', gap: '2px' }}>
                                                    <LinkPicker
                                                        compact
                                                        url={link.url}
                                                        onChange={(v) => updateLink(ci, li, 'url', v)}
                                                    />
                                                    <Button
                                                        icon={trashIcon}
                                                        size="small"
                                                        label={__('Remove link', 'block-forge')}
                                                        showTooltip
                                                        onClick={() => removeLink(ci, li)}
                                                    />
                                                </span>
                                            </li>
                                        ))}
                                        <li>
                                            <Button
                                                variant="link"
                                                onClick={() => addLink(ci)}
                                                style={{ padding: 0, fontSize: '13px' }}
                                            >
                                                {__('+ Add link', 'block-forge')}
                                            </Button>
                                            {card.links.length > visibleLinks && (
                                                <span style={{ marginLeft: '12px', fontSize: '11px', color: '#888' }}>
                                                    {__('Dimmed links are hidden behind', 'block-forge')} "{card.showMoreLabel || 'Visa fler'}"
                                                </span>
                                            )}
                                        </li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
