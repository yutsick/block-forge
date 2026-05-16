import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl, TextareaControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
    const { sectionTitle, stats, anchorId } = attributes;
    const blockProps = useBlockProps();


    const updateStat = (index, fields) => {
        const updated = stats.map((s, i) => i === index ? { ...s, ...fields } : s);
        setAttributes({ stats: updated });
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
                </PanelBody>

                {stats.map((stat, i) => (
                    <PanelBody key={i} title={`${__('Stat', 'block-forge')} ${i + 1}`} initialOpen={i === 0}>
                        <ToggleControl
                            label={__('Show card', 'block-forge')}
                            checked={stat.isEnabled !== false}
                            onChange={(value) => updateStat(i, { isEnabled: value })}
                        />

                        <div style={{ marginBottom: '12px' }}>
                            <p style={{ marginBottom: '6px', fontWeight: 600, fontSize: '11px' }}>
                                {__('Icon', 'block-forge')}
                            </p>
                            {stat.iconUrl && (
                                <img
                                    src={stat.iconUrl}
                                    alt=""
                                    style={{ display: 'block', width: '48px', height: '48px', objectFit: 'contain', marginBottom: '8px' }}
                                />
                            )}
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => updateStat(i, { iconId: media.id, iconUrl: media.url })}
                                    allowedTypes={['image']}
                                    value={stat.iconId || 0}
                                    render={({ open }) => (
                                        <Button variant="secondary" onClick={open} style={{ marginRight: '8px' }}>
                                            {stat.iconUrl
                                                ? __('Replace Icon', 'block-forge')
                                                : __('Select Icon', 'block-forge')}
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>
                            {stat.iconUrl && (
                                <Button
                                    variant="link"
                                    isDestructive
                                    onClick={() => updateStat(i, { iconId: 0, iconUrl: '' })}
                                >
                                    {__('Remove', 'block-forge')}
                                </Button>
                            )}
                        </div>

                        <TextControl
                            label={__('Label', 'block-forge')}
                            value={stat.label}
                            onChange={(value) => updateStat(i, { label: value })}
                        />
                        <TextareaControl
                            label={__('Description', 'block-forge')}
                            value={stat.description}
                            onChange={(value) => updateStat(i, { description: value })}
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
                <section id={anchorId || undefined} className="w-full py-14 px-8 bg-[#F8F8F8]">
                    <div className="max-w-[1120px] mx-auto">
                        {sectionTitle && (
                            <h2 className="type-label text-banner-text mb-10">{sectionTitle}</h2>
                        )}
                        <div className="flex justify-center gap-5">
                            {stats.map((stat, i) => (
                                stat.isEnabled === false ? null :
                                    <div key={i} className="w-[calc(25%-15px)] bg-white rounded-[16px] p-6 flex flex-col items-center text-center gap-3 min-h-[220px] shadow-[0_4px_4px_rgb(0_0_0/_0.25)]">
                                        {stat.iconUrl ? (
                                            <img
                                                src={stat.iconUrl}
                                                alt=""
                                                className="w-14 h-14 mx-auto object-contain"
                                            />
                                        ) : (
                                            <div className="w-14 h-14 bg-gray-100 rounded-md" />
                                        )}
                                        <span className="type-h3 font-semibold !text-black leading-snug">{stat.label}</span>
                                        <p className="type-body-lg text-grey">{stat.description}</p>
                                    </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
