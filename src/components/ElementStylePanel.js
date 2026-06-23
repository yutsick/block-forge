import { useSetting } from '@wordpress/block-editor';
import { Button, ColorPalette, PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { TYPE_STYLES, TYPE_STYLE_OPTIONS } from './typeStyles';

const FONT_FAMILY_OPTIONS = [
    { label: __('Default', 'block-forge'),    value: '' },
    { label: 'Barlow Semi Condensed',         value: 'Barlow Semi Condensed' },
    { label: 'Ancizar Serif',                 value: 'Ancizar Serif' },
];

const FONT_WEIGHT_OPTIONS = [
    { label: __('Default', 'block-forge'), value: '' },
    { label: '300 Light',                  value: '300' },
    { label: '400 Regular',                value: '400' },
    { label: '500 Medium',                 value: '500' },
    { label: '600 SemiBold',               value: '600' },
    { label: '700 Bold',                   value: '700' },
    { label: '800 ExtraBold',              value: '800' },
];

const TEXT_TRANSFORM_OPTIONS = [
    { label: __('Default', 'block-forge'), value: '' },
    { label: 'UPPERCASE',                  value: 'uppercase' },
    { label: 'lowercase',                  value: 'lowercase' },
    { label: 'Capitalize',                 value: 'capitalize' },
    { label: 'None',                       value: 'none' },
];

/**
 * Sidebar panel that gathers all typography + color overrides for ONE
 * element of a branded block (title, description, button…).
 *
 * Value is an object — empty fields mean "keep brand default".
 *
 * Props:
 *   title              — panel heading
 *   value              — current style object
 *   onChange           — receives the new style object
 *   includeBackground  — show background-color picker (buttons)
 *   includeBorder      — show border-color picker (outlined buttons)
 *   initialOpen        — bool
 */
export default function ElementStylePanel({
    title,
    value = {},
    onChange,
    includeBackground = false,
    includeBorder = false,
    initialOpen = false,
}) {
    const colors = useSetting('color.palette') || [];
    const set = (field, val) => onChange({ ...value, [field]: val });
    const reset = () => onChange({});

    const applyPreset = (slug) => {
        if (!slug) return;
        const preset = TYPE_STYLES[slug];
        if (!preset) return;
        onChange({
            ...value,
            fontFamily:    preset.fontFamily,
            fontSize:      preset.fontSize,
            fontWeight:    preset.fontWeight,
            lineHeight:    preset.lineHeight,
            letterSpacing: preset.letterSpacing,
            textTransform: preset.textTransform,
        });
    };

    return (
        <PanelBody title={title} initialOpen={initialOpen}>
            <SelectControl
                label={__('Type style preset', 'block-forge')}
                value=""
                options={TYPE_STYLE_OPTIONS}
                onChange={applyPreset}
                help={__('Quick-apply the full type-style bundle (family, size, weight, line-height, letter-spacing, text-transform).', 'block-forge')}
            />

            <div style={{ marginBottom: '16px' }}>
                <p style={{ marginBottom: '6px', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase' }}>
                    {__('Text color', 'block-forge')}
                </p>
                <ColorPalette
                    colors={colors}
                    value={value.color || ''}
                    onChange={(v) => set('color', v || '')}
                />
            </div>

            {includeBackground && (
                <div style={{ marginBottom: '16px' }}>
                    <p style={{ marginBottom: '6px', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase' }}>
                        {__('Background color', 'block-forge')}
                    </p>
                    <ColorPalette
                        colors={colors}
                        value={value.backgroundColor || ''}
                        onChange={(v) => set('backgroundColor', v || '')}
                    />
                </div>
            )}

            {includeBorder && (
                <div style={{ marginBottom: '16px' }}>
                    <p style={{ marginBottom: '6px', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase' }}>
                        {__('Border color', 'block-forge')}
                    </p>
                    <ColorPalette
                        colors={colors}
                        value={value.borderColor || ''}
                        onChange={(v) => set('borderColor', v || '')}
                    />
                </div>
            )}

            <SelectControl
                label={__('Font family', 'block-forge')}
                value={value.fontFamily || ''}
                options={FONT_FAMILY_OPTIONS}
                onChange={(v) => set('fontFamily', v)}
            />
            <TextControl
                label={__('Font size', 'block-forge')}
                value={value.fontSize || ''}
                onChange={(v) => set('fontSize', v)}
                placeholder="e.g. 20px"
            />
            <SelectControl
                label={__('Font weight', 'block-forge')}
                value={value.fontWeight || ''}
                options={FONT_WEIGHT_OPTIONS}
                onChange={(v) => set('fontWeight', v)}
            />
            <TextControl
                label={__('Line height', 'block-forge')}
                value={value.lineHeight || ''}
                onChange={(v) => set('lineHeight', v)}
                placeholder="e.g. 28px or 1.2"
            />
            <TextControl
                label={__('Letter spacing', 'block-forge')}
                value={value.letterSpacing || ''}
                onChange={(v) => set('letterSpacing', v)}
                placeholder="e.g. -0.02em"
            />
            <SelectControl
                label={__('Text transform', 'block-forge')}
                value={value.textTransform || ''}
                options={TEXT_TRANSFORM_OPTIONS}
                onChange={(v) => set('textTransform', v)}
            />

            <Button variant="link" isDestructive onClick={reset} style={{ marginTop: '12px' }}>
                {__('Reset to brand default', 'block-forge')}
            </Button>
        </PanelBody>
    );
}
