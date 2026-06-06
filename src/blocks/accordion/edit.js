import { InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ElementStylePanel from '../../components/ElementStylePanel';
import { toInlineStyle } from '../../components/typeStyles';

const plusIcon = (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const trashIcon = (
    <svg className="!fill-none" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
);

export default function Edit({ attributes, setAttributes }) {
    const {
        sectionTitle, items, anchorId,
        sectionTitleStyle, itemLabelStyle, itemContentStyle,
    } = attributes;

    const blockProps = useBlockProps();

    const updateItem = (index, field, value) => {
        const updated = items.map((it, i) => i === index ? { ...it, [field]: value } : it);
        setAttributes({ items: updated });
    };

    const addItem = () => {
        setAttributes({ items: [...items, { label: '', content: '' }] });
    };

    const removeItem = (index) => {
        setAttributes({ items: items.filter((_, i) => i !== index) });
    };

    return (
        <>
            <InspectorControls>
                <ElementStylePanel
                    title={__('Section title style', 'block-forge')}
                    value={sectionTitleStyle}
                    onChange={(v) => setAttributes({ sectionTitleStyle: v })}
                />
                <ElementStylePanel
                    title={__('Item label style', 'block-forge')}
                    value={itemLabelStyle}
                    onChange={(v) => setAttributes({ itemLabelStyle: v })}
                />
                <ElementStylePanel
                    title={__('Item content style', 'block-forge')}
                    value={itemContentStyle}
                    onChange={(v) => setAttributes({ itemContentStyle: v })}
                />

                <PanelBody title={__('Anchor', 'block-forge')} initialOpen={false}>
                    <TextControl
                        label={__('Section ID', 'block-forge')}
                        value={anchorId}
                        onChange={(value) => setAttributes({ anchorId: value })}
                        placeholder="e.g. faq"
                        help={__('Used for one-page navigation links (#id).', 'block-forge')}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div id={anchorId || undefined} className="w-full">
                    <RichText
                        tagName="h2"
                        className="type-h3 text-[#212121] mb-4"
                        style={toInlineStyle(sectionTitleStyle)}
                        value={sectionTitle}
                        onChange={(v) => setAttributes({ sectionTitle: v })}
                        placeholder={__('Optional section title…', 'block-forge')}
                        allowedFormats={[]}
                    />

                    <div className="flex flex-col gap-2">
                        {items.map((it, i) => (
                            <div key={i} className="bg-white border border-[#DDDDDD] rounded-[8px] p-[18px] flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <RichText
                                        tagName="span"
                                        className="flex-1 font-ancizar-serif font-semibold text-[20px] leading-[28px] -tracking-[0.32px] text-[#4E4E4E]"
                                        style={toInlineStyle(itemLabelStyle)}
                                        value={it.label}
                                        onChange={(v) => updateItem(i, 'label', v)}
                                        placeholder={__('Item title…', 'block-forge')}
                                        allowedFormats={[]}
                                    />
                                    <span className="shrink-0 inline-flex items-center justify-center w-[30px] h-[30px] rounded-full bg-banner-blue text-[#27348B]">
                                        {plusIcon}
                                    </span>
                                    <Button
                                        icon={trashIcon}
                                        size="small"
                                        label={__('Remove item', 'block-forge')}
                                        showTooltip
                                        onClick={() => removeItem(i)}
                                    />
                                </div>
                                <RichText
                                    tagName="div"
                                    className="accordion-item__content type-body-sm text-[#4E4E4E]"
                                    style={toInlineStyle(itemContentStyle)}
                                    value={it.content}
                                    onChange={(v) => updateItem(i, 'content', v)}
                                    placeholder={__('Content shown when expanded — shift+enter for new lines. (Empty = non-expanding header.)', 'block-forge')}
                                    allowedFormats={['core/bold', 'core/italic', 'core/link']}
                                />
                            </div>
                        ))}

                        <Button
                            variant="secondary"
                            onClick={addItem}
                            style={{ alignSelf: 'flex-start', marginTop: '4px' }}
                        >
                            {__('+ Add item', 'block-forge')}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
