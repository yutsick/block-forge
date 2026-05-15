import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
    const { sectionTitle, stats } = attributes;
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
                            label={__('Value (e.g. 10 000+)', 'block-forge')}
                            value={stat.value}
                            onChange={(value) => updateStat(i, { value })}
                        />
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
            </InspectorControls>

            <div {...blockProps}>
                <section className="w-full py-10 px-8 bg-white">
                    <div className="max-w-[1120px] mx-auto">
                        {sectionTitle && (
                            <p className="text-[11px] font-semibold tracking-widest uppercase text-banner-text text-center mb-8">
                                {sectionTitle}
                            </p>
                        )}
                        <div className="grid grid-cols-4 gap-6">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex flex-col items-center text-center gap-2">
                                    {stat.iconUrl ? (
                                        <img
                                            src={stat.iconUrl}
                                            alt=""
                                            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                                        />
                                    ) : (
                                        <div style={{ width: '40px', height: '40px', background: '#eee', borderRadius: '4px' }} />
                                    )}
                                    {stat.value && (
                                        <span className="text-[20px] font-semibold text-banner-heading">{stat.value}</span>
                                    )}
                                    <span className="text-[12px] font-semibold text-banner-heading">{stat.label}</span>
                                    <p className="text-[10px] text-banner-text leading-relaxed">{stat.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
