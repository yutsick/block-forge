import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, SelectControl, TextControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const OVERLAY_CLASSES = {
    peach: 'bg-banner-peach',
    blue: 'bg-banner-blue',
};

export default function Edit({ attributes, setAttributes }) {
    const { sectionTitle, sectionDescription, cards, anchorId } = attributes;

    const blockProps = useBlockProps();

    const updateCard = (index, field, value) => {
        const updated = cards.map((c, i) => i === index ? { ...c, [field]: value } : c);
        setAttributes({ cards: updated });
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
                    <TextareaControl
                        label={__('Section Description', 'block-forge')}
                        value={sectionDescription}
                        onChange={(value) => setAttributes({ sectionDescription: value })}
                    />
                </PanelBody>

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
                                { label: __('Peach', 'block-forge'), value: 'peach' },
                                { label: __('Blue', 'block-forge'), value: 'blue' },
                            ]}
                            onChange={(value) => updateCard(i, 'colorVariant', value)}
                        />
                        <TextControl
                            label={__('Title', 'block-forge')}
                            value={card.title}
                            onChange={(value) => updateCard(i, 'title', value)}
                        />
                        <TextareaControl
                            label={__('Description', 'block-forge')}
                            value={card.description}
                            onChange={(value) => updateCard(i, 'description', value)}
                        />
                        <TextControl
                            label={__('Link URL', 'block-forge')}
                            value={card.linkUrl}
                            onChange={(value) => updateCard(i, 'linkUrl', value)}
                        />
                    </PanelBody>
                ))}
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
                            <h2 className="type-label !text-black mb-4">{sectionTitle}</h2>
                            <p className="type-body-lg !text-black max-w-2xl">{sectionDescription}</p>
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
                                    <div className={`relative ${OVERLAY_CLASSES[card.colorVariant] ?? 'bg-banner-peach'} mx-[50px] px-8 pt-6 pb-8 flex flex-col items-start gap-4 -mt-[36px] rounded-[8px]`}>
                                        <div>
                                            <h3 className="font-barlow-semicondensed text-[28px] tracking-[-0.02em] !text-black mb-1 font-semibold leading-snug">{card.title}</h3>
                                            <p className="type-body-lg text-[#212121]">{card.description}</p>
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
