import { InspectorControls, MediaUpload, MediaUploadCheck, RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ElementStylePanel from '../../components/ElementStylePanel';
import LinkPicker from '../../components/LinkPicker';
import { toInlineStyle } from '../../components/typeStyles';

const OVERLAY_CLASSES = {
    peach: 'bg-banner-peach',
    blue: 'bg-banner-blue',
    koral: 'bg-coral',
};

export default function Edit({ attributes, setAttributes }) {
    const {
        sectionTitle, sectionDescription, cards, anchorId,
        sectionTitleStyle, sectionDescriptionStyle, cardTitleStyle, cardDescriptionStyle,
    } = attributes;

    const blockProps = useBlockProps();

    const updateCard = (index, field, value) => {
        const updated = cards.map((c, i) => i === index ? { ...c, [field]: value } : c);
        setAttributes({ cards: updated });
    };

    const addCard = () => {
        const newCard = {
            imageId: 0,
            imageUrl: '',
            imageAlt: '',
            colorVariant: 'peach',
            title: '',
            description: '',
            linkUrl: '',
        };
        setAttributes({ cards: [...cards, newCard] });
    };

    const removeCard = (index) => {
        setAttributes({ cards: cards.filter((_, i) => i !== index) });
    };

    return (
        <>
            <InspectorControls>

                {cards.map((card, i) => (
                    <PanelBody key={i} title={`${__('Card', 'block-forge')} ${i + 1}`} initialOpen={i === 0}>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => {
                                    const updated = cards.map((c, idx) =>
                                        idx === i ? { ...c, imageUrl: media.url, imageAlt: media.alt, imageId: media.id } : c
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
                        <SelectControl
                            label={__('Label Color', 'block-forge')}
                            value={card.colorVariant}
                            options={[
                                { label: __('Gul 60%', 'block-forge'), value: 'peach' },
                                { label: __('Ljusblå 60%', 'block-forge'), value: 'blue' },
                                { label: __('Korall', 'block-forge'), value: 'koral' },
                            ]}
                            onChange={(value) => updateCard(i, 'colorVariant', value)}
                        />
                        <LinkPicker
                            label={__('Link URL', 'block-forge')}
                            url={card.linkUrl}
                            onChange={(value) => updateCard(i, 'linkUrl', value)}
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
                <section id={anchorId || undefined} className="w-full py-16 px-8 bg-[#F8F8F8]">
                    <div className="max-w-[1120px] mx-auto">
                        <div className="mb-8">
                            <RichText
                                tagName="h2"
                                className="type-label !text-black mb-6"
                                style={toInlineStyle(sectionTitleStyle)}
                                value={sectionTitle}
                                onChange={(value) => setAttributes({ sectionTitle: value })}
                                placeholder={__('Section title…', 'block-forge')}
                                allowedFormats={[]}
                            />
                            <RichText
                                tagName="p"
                                className="type-body !text-black max-w-2xl"
                                style={toInlineStyle(sectionDescriptionStyle)}
                                value={sectionDescription}
                                onChange={(value) => setAttributes({ sectionDescription: value })}
                                placeholder={__('Section description…', 'block-forge')}
                                allowedFormats={['core/bold', 'core/italic']}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-12">
                            {cards.map((card, i) => (
                                <div key={i} className="relative overflow-hidden rounded-2xl flex flex-col">
                                    <div className="h-[265px] overflow-hidden rounded-[8px]">
                                        {card.imageUrl ? (
                                            <img src={card.imageUrl} alt={card.imageAlt} className="w-full h-full object-cover rounded-[8px]" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 rounded-[8px]" />
                                        )}
                                    </div>
                                    <div className={`relative ${OVERLAY_CLASSES[card.colorVariant] ?? 'bg-banner-peach'} mx-[50px] px-8 pt-6 pb-8 flex flex-col items-start gap-4 -mt-[36px] rounded-[8px] min-h-[300px]`}>
                                        <div>
                                            <RichText
                                                tagName="h3"
                                                className="font-barlow-semicondensed text-[34px] md:text-[38px] -tracking-[0.02em] !text-black mb-1 font-semibold leading-snug min-h-[104px]"
                                                style={toInlineStyle(cardTitleStyle)}
                                                value={card.title}
                                                onChange={(value) => updateCard(i, 'title', value)}
                                                placeholder={__('Card title…', 'block-forge')}
                                                allowedFormats={[]}
                                            />
                                            <RichText
                                                tagName="p"
                                                className="type-body text-[#212121] min-h-[3lh]"
                                                style={toInlineStyle(cardDescriptionStyle)}
                                                value={card.description}
                                                onChange={(value) => updateCard(i, 'description', value)}
                                                placeholder={__('Card description…', 'block-forge')}
                                                allowedFormats={['core/bold', 'core/italic']}
                                            />
                                        </div>
                                        <div className="shrink-0 mt-1">
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 18L27 18" stroke="#2F2F2F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M18 27L27 18L18 9" stroke="#2F2F2F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
