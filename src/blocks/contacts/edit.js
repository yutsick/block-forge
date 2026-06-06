import { InspectorControls, MediaUpload, MediaUploadCheck, RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ElementStylePanel from '../../components/ElementStylePanel';
import { toInlineStyle } from '../../components/typeStyles';

const BG_CLASSES = {
    'coral-60': 'bg-[#FAD2C9]',
    'yellow-60': 'bg-[#FEE4CB]',
    'light-blue-60': 'bg-[#D9ECF4]',
    'coral': 'bg-[#F49F92]',
    'yellow': 'bg-[#FBC894]',
    'light-blue': 'bg-[#AED9E9]',
    'blue': 'bg-[#27348B]',
    'purple': 'bg-[#671B52]',
};

export default function Edit({ attributes, setAttributes }) {
    const {
        sectionTitle, cards, anchorId,
        sectionTitleStyle, cardTitleStyle, cardBodyStyle,
    } = attributes;

    const blockProps = useBlockProps();

    const updateCard = (index, field, value) => {
        const updated = cards.map((c, i) => i === index ? { ...c, [field]: value } : c);
        setAttributes({ cards: updated });
    };

    const addCard = () => {
        setAttributes({
            cards: [...cards, {
                iconUrl: '', iconAlt: '', iconId: 0,
                bgColor: 'coral-60',
                title: '',
                body: '',
            }],
        });
    };

    const removeCard = (index) => {
        setAttributes({ cards: cards.filter((_, i) => i !== index) });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section', 'block-forge')}>
                    <p style={{ fontSize: '11px', color: '#757575', margin: '0 0 8px 0' }}>
                        {__('Title is optional — leave empty to skip the section heading.', 'block-forge')}
                    </p>
                </PanelBody>

                {cards.map((card, i) => (
                    <PanelBody key={i} title={`${__('Card', 'block-forge')} ${i + 1}`} initialOpen={i === 0}>
                        <p style={{ fontWeight: 600, marginBottom: '6px', fontSize: '11px', textTransform: 'uppercase' }}>
                            {__('Icon (image)', 'block-forge')}
                        </p>
                        {card.iconUrl && (
                            <img
                                src={card.iconUrl}
                                alt=""
                                style={{ display: 'block', width: '64px', height: '64px', objectFit: 'contain', marginBottom: '8px' }}
                            />
                        )}
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => updateCard(i, 'iconUrl', media.url) || setAttributes({
                                    cards: cards.map((c, idx) => idx === i ? { ...c, iconUrl: media.url, iconAlt: media.alt || '', iconId: media.id } : c),
                                })}
                                allowedTypes={['image']}
                                value={card.iconId || 0}
                                render={({ open }) => (
                                    <Button variant="secondary" onClick={open} style={{ marginRight: '8px' }}>
                                        {card.iconUrl ? __('Replace Icon', 'block-forge') : __('Select Icon', 'block-forge')}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                        {card.iconUrl && (
                            <Button
                                variant="link"
                                isDestructive
                                onClick={() => setAttributes({
                                    cards: cards.map((c, idx) => idx === i ? { ...c, iconUrl: '', iconAlt: '', iconId: 0 } : c),
                                })}
                            >
                                {__('Remove icon', 'block-forge')}
                            </Button>
                        )}

                        <SelectControl
                            label={__('Background color', 'block-forge')}
                            value={card.bgColor || 'coral-60'}
                            options={[
                                { label: __('Coral 60% (peach pink)', 'block-forge'), value: 'coral-60' },
                                { label: __('Yellow 60%', 'block-forge'), value: 'yellow-60' },
                                { label: __('Light blue 60%', 'block-forge'), value: 'light-blue-60' },
                                { label: __('Coral', 'block-forge'), value: 'coral' },
                                { label: __('Yellow', 'block-forge'), value: 'yellow' },
                                { label: __('Light blue', 'block-forge'), value: 'light-blue' },
                                { label: __('Blue', 'block-forge'), value: 'blue' },
                                { label: __('Purple', 'block-forge'), value: 'purple' },
                            ]}
                            onChange={(v) => updateCard(i, 'bgColor', v)}
                        />

                        <Button
                            variant="link"
                            isDestructive
                            onClick={() => removeCard(i)}
                            style={{ marginTop: '8px' }}
                        >
                            {__('Remove this card', 'block-forge')}
                        </Button>
                    </PanelBody>
                ))}

                <PanelBody title={__('Add card', 'block-forge')} initialOpen={false}>
                    <Button variant="primary" onClick={addCard}>
                        {__('+ Add new card', 'block-forge')}
                    </Button>
                </PanelBody>

                <ElementStylePanel
                    title={__('Section title style', 'block-forge')}
                    value={sectionTitleStyle}
                    onChange={(v) => setAttributes({ sectionTitleStyle: v })}
                />
                <ElementStylePanel
                    title={__('Card title style', 'block-forge')}
                    value={cardTitleStyle}
                    onChange={(v) => setAttributes({ cardTitleStyle: v })}
                />
                <ElementStylePanel
                    title={__('Card body style', 'block-forge')}
                    value={cardBodyStyle}
                    onChange={(v) => setAttributes({ cardBodyStyle: v })}
                />

                <PanelBody title={__('Anchor', 'block-forge')} initialOpen={false}>
                    <TextControl
                        label={__('Section ID', 'block-forge')}
                        value={anchorId}
                        onChange={(value) => setAttributes({ anchorId: value })}
                        placeholder="e.g. kontakt"
                        help={__('Used for one-page navigation links (#id).', 'block-forge')}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <section id={anchorId || undefined} className="w-full py-14 px-8 bg-white">
                    <div className="max-w-[1120px] mx-auto">
                        <RichText
                            tagName="h2"
                            className="type-h3 text-[#2F2F2F] mb-8"
                            style={toInlineStyle(sectionTitleStyle)}
                            value={sectionTitle}
                            onChange={(v) => setAttributes({ sectionTitle: v })}
                            placeholder={__('Optional section title…', 'block-forge')}
                            allowedFormats={[]}
                        />
                        <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
                            {cards.map((card, i) => {
                                const bgClass = BG_CLASSES[card.bgColor] ?? 'bg-banner-pink';
                                return (
                                    <div key={i} className="flex flex-col gap-4">
                                        <div className={`${bgClass} rounded-[8px] h-[254px] flex items-center justify-center overflow-hidden`}>
                                            {card.iconUrl ? (
                                                <img src={card.iconUrl} alt={card.iconAlt} className="max-w-[135px] max-h-[135px] object-contain" />
                                            ) : (
                                                <span style={{ fontSize: '12px', color: '#888' }}>{__('Pick an icon →', 'block-forge')}</span>
                                            )}
                                        </div>
                                        <RichText
                                            tagName="h3"
                                            className="type-h4 text-[#2F2F2F]"
                                            style={toInlineStyle(cardTitleStyle)}
                                            value={card.title}
                                            onChange={(v) => updateCard(i, 'title', v)}
                                            placeholder={__('Card title…', 'block-forge')}
                                            allowedFormats={[]}
                                        />
                                        <RichText
                                            tagName="div"
                                            className="contacts-card__body type-body-sm text-[#212121]"
                                            style={toInlineStyle(cardBodyStyle)}
                                            value={card.body}
                                            onChange={(v) => updateCard(i, 'body', v)}
                                            placeholder={__('Body — use bold for labels, shift+enter for new lines…', 'block-forge')}
                                            allowedFormats={['core/bold', 'core/italic', 'core/link']}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
