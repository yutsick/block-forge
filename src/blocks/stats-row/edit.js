import { InspectorControls, MediaUpload, MediaUploadCheck, RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ElementStylePanel from '../../components/ElementStylePanel';
import { toInlineStyle } from '../../components/typeStyles';

export default function Edit({ attributes, setAttributes }) {
    const { sectionTitle, sectionDescription, stats, anchorId, sectionTitleStyle, sectionDescriptionStyle, statLabelStyle, statDescriptionStyle } = attributes;
    const blockProps = useBlockProps();


    const updateStat = (index, fields) => {
        const updated = stats.map((s, i) => i === index ? { ...s, ...fields } : s);
        setAttributes({ stats: updated });
    };

    return (
        <>
            <InspectorControls>
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

                    </PanelBody>
                ))}
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
                    title={__('Stat label style', 'block-forge')}
                    value={statLabelStyle}
                    onChange={(v) => setAttributes({ statLabelStyle: v })}
                />
                <ElementStylePanel
                    title={__('Stat description style', 'block-forge')}
                    value={statDescriptionStyle}
                    onChange={(v) => setAttributes({ statDescriptionStyle: v })}
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
                <section id={anchorId || undefined} className="w-full py-14 px-8 bg-[#F8F8F8]">
                    <div className="max-w-[1120px] mx-auto">
                        <RichText
                            tagName="h2"
                            className="type-label text-banner-text mb-4"
                            style={toInlineStyle(sectionTitleStyle)}
                            value={sectionTitle}
                            onChange={(value) => setAttributes({ sectionTitle: value })}
                            placeholder={__('Section title…', 'block-forge')}
                            allowedFormats={[]}
                        />
                        <RichText
                            tagName="p"
                            className="type-body font-ancizar-serif text-grey max-w-[760px] mb-10"
                            style={toInlineStyle(sectionDescriptionStyle)}
                            value={sectionDescription}
                            onChange={(value) => setAttributes({ sectionDescription: value })}
                            placeholder={__('Section description…', 'block-forge')}
                            allowedFormats={['core/bold', 'core/italic']}
                        />
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
                                        <RichText
                                            tagName="span"
                                            className="type-h3 font-semibold !text-black leading-snug"
                                            style={toInlineStyle(statLabelStyle)}
                                            value={stat.label}
                                            onChange={(value) => updateStat(i, { label: value })}
                                            placeholder={__('Label…', 'block-forge')}
                                            allowedFormats={[]}
                                        />
                                        <RichText
                                            tagName="p"
                                            className="type-body text-grey"
                                            style={toInlineStyle(statDescriptionStyle)}
                                            value={stat.description}
                                            onChange={(value) => updateStat(i, { description: value })}
                                            placeholder={__('Description…', 'block-forge')}
                                            allowedFormats={['core/bold', 'core/italic']}
                                        />
                                    </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
