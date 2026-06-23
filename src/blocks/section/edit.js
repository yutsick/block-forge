import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const BG_CLASSES = {
    none:            '',
    white:           'bg-white',
    'bg-grey':       'bg-[#F8F8F8]',
    'coral-60':      'bg-[#FAD2C9]',
    'yellow-60':     'bg-[#FEE4CB]',
    'light-blue-60': 'bg-[#D9ECF4]',
    blue:            'bg-[#27348B] text-white',
    purple:          'bg-[#671B52] text-white',
};

const PAD_Y_CLASSES = {
    none: 'py-0',
    sm:   'py-6',
    md:   'py-10',
    lg:   'py-14',
    xl:   'py-20',
};

// Inner content width. The outer container is always 1120px (centered);
// these constrain the content inside it and stay LEFT-aligned (no mx-auto).
const WIDTH_CLASSES = {
    container: 'max-w-full',
    tall:      'max-w-[736px]',
};

export default function Edit({ attributes, setAttributes }) {
    const { bgColor, padY, width, anchorId } = attributes;

    const bgClass    = BG_CLASSES[bgColor || 'none'] ?? '';
    const padYClass  = PAD_Y_CLASSES[padY || 'lg'] ?? 'py-14';
    const widthClass = WIDTH_CLASSES[width || 'container'] ?? 'max-w-full';

    const blockProps = useBlockProps({
        className: `block-forge-section w-full ${bgClass} ${padYClass}`,
    });

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: widthClass,
        },
        {
            renderAppender: useInnerBlocksProps.ButtonBlockAppender,
        }
    );

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section', 'block-forge')}>
                    <SelectControl
                        label={__('Background', 'block-forge')}
                        value={bgColor || 'none'}
                        options={[
                            { label: __('Ingen / transparent', 'block-forge'), value: 'none' },
                            { label: __('Vit',                'block-forge'), value: 'white' },
                            { label: __('Background grey',    'block-forge'), value: 'bg-grey' },
                            { label: __('Korall 60%',         'block-forge'), value: 'coral-60' },
                            { label: __('Gul 60%',            'block-forge'), value: 'yellow-60' },
                            { label: __('Ljusblå 60%',        'block-forge'), value: 'light-blue-60' },
                            { label: __('Blå',                'block-forge'), value: 'blue' },
                            { label: __('Lila',               'block-forge'), value: 'purple' },
                        ]}
                        onChange={(v) => setAttributes({ bgColor: v })}
                    />
                    <SelectControl
                        label={__('Vertical padding', 'block-forge')}
                        value={padY || 'lg'}
                        options={[
                            { label: __('None',  'block-forge'), value: 'none' },
                            { label: __('Small (24px)',  'block-forge'), value: 'sm' },
                            { label: __('Medium (40px)', 'block-forge'), value: 'md' },
                            { label: __('Large (56px)',  'block-forge'), value: 'lg' },
                            { label: __('X-Large (80px)','block-forge'), value: 'xl' },
                        ]}
                        onChange={(v) => setAttributes({ padY: v })}
                    />
                    <SelectControl
                        label={__('Width', 'block-forge')}
                        value={width || 'container'}
                        options={[
                            { label: __('Container width (1120px)', 'block-forge'), value: 'container' },
                            { label: __('Tall content width (736px)', 'block-forge'), value: 'tall' },
                        ]}
                        onChange={(v) => setAttributes({ width: v })}
                    />
                </PanelBody>

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

            <div {...blockProps} id={anchorId || undefined}>
                <div className="max-w-[1120px] mx-auto px-4 md:px-8">
                    <div {...innerBlocksProps} />
                </div>
            </div>
        </>
    );
}
