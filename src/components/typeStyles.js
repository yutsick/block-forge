/**
 * Movendi design-system type styles. Each preset bundles the full
 * typography spec (family, size, weight, line-height, letter-spacing,
 * text-transform) so editors can quick-apply a coherent look with one
 * click — and tweak individual properties on top if needed.
 *
 * Sourced from the design specs the team shared.
 */
export const TYPE_STYLES = {
    display:     { label: 'Display',      fontFamily: 'Barlow Semi Condensed', fontSize: '120px', fontWeight: '700', lineHeight: '120px',  letterSpacing: '-0.02em', textTransform: 'none' },
    h1:          { label: 'H1',           fontFamily: 'Barlow Semi Condensed', fontSize: '58px',  fontWeight: '600', lineHeight: '64px',   letterSpacing: '-0.01em', textTransform: 'none' },
    h2:          { label: 'H2',           fontFamily: 'Barlow Semi Condensed', fontSize: '46px',  fontWeight: '600', lineHeight: '60px',   letterSpacing: '0',       textTransform: 'none' },
    h3:          { label: 'H3',           fontFamily: 'Barlow Semi Condensed', fontSize: '38px',  fontWeight: '600', lineHeight: '42px',   letterSpacing: '-0.02em', textTransform: 'none' },
    h4:          { label: 'H4',           fontFamily: 'Barlow Semi Condensed', fontSize: '32px',  fontWeight: '600', lineHeight: '40px',   letterSpacing: '-0.01em', textTransform: 'none' },
    h5:          { label: 'H5',           fontFamily: 'Barlow Semi Condensed', fontSize: '24px',  fontWeight: '600', lineHeight: '30px',   letterSpacing: '-0.01em', textTransform: 'none' },
    h6:          { label: 'H6',           fontFamily: 'Barlow Semi Condensed', fontSize: '20px',  fontWeight: '600', lineHeight: '1.2',    letterSpacing: '0.02em',  textTransform: 'none' },
    blockrubrik: { label: 'Blockrubrik',  fontFamily: 'Barlow Semi Condensed', fontSize: '28px',  fontWeight: '700', lineHeight: '1.2',    letterSpacing: '0.07em',  textTransform: 'uppercase' },
    label:       { label: 'Label',        fontFamily: 'Barlow Semi Condensed', fontSize: '16px',  fontWeight: '600', lineHeight: '1.2',    letterSpacing: '0.01em',  textTransform: 'none' },
    ingress:     { label: 'Ingress',      fontFamily: 'Ancizar Serif',         fontSize: '22px',  fontWeight: '600', lineHeight: '32px',   letterSpacing: '0',       textTransform: 'none' },
    body:        { label: 'Body',         fontFamily: 'Ancizar Serif',         fontSize: '20px',  fontWeight: '400', lineHeight: '28px',   letterSpacing: '-0.3px',  textTransform: 'none' },
    bodySm:      { label: 'Small body',   fontFamily: 'Ancizar Serif',         fontSize: '18px',  fontWeight: '400', lineHeight: '24px',   letterSpacing: '0',       textTransform: 'none' },
    mini:        { label: 'Mini',         fontFamily: 'Ancizar Serif',         fontSize: '16px',  fontWeight: '400', lineHeight: '22px',   letterSpacing: '0',       textTransform: 'none' },
    tag:         { label: 'Tag',          fontFamily: 'Barlow Semi Condensed', fontSize: '14px',  fontWeight: '600', lineHeight: 'normal', letterSpacing: '0.11em',  textTransform: 'uppercase' },
    bigButton:   { label: 'Big button',   fontFamily: 'Barlow Semi Condensed', fontSize: '20px',  fontWeight: '500', lineHeight: 'normal', letterSpacing: '0',       textTransform: 'none' },
    smallButton: { label: 'Small button', fontFamily: 'Barlow Semi Condensed', fontSize: '18px',  fontWeight: '500', lineHeight: 'normal', letterSpacing: '0',       textTransform: 'none' },
    regularLink: { label: 'Regular link', fontFamily: 'Barlow Semi Condensed', fontSize: '19px',  fontWeight: '600', lineHeight: '1.2',    letterSpacing: '0.01em',  textTransform: 'none' },
    input:       { label: 'Input',        fontFamily: 'Ancizar Serif',         fontSize: '18px',  fontWeight: '600', lineHeight: 'normal', letterSpacing: '0.5px',   textTransform: 'none' },
};

export const TYPE_STYLE_OPTIONS = [
    { label: '— Quick apply —', value: '' },
    ...Object.entries(TYPE_STYLES).map(([slug, { label }]) => ({ label, value: slug })),
];

/**
 * Convert a style attribute object into a React inline-style object.
 * Empty properties are omitted so brand-default CSS keeps showing.
 */
const PROP_MAP = {
    fontFamily:      'fontFamily',
    fontSize:        'fontSize',
    fontWeight:      'fontWeight',
    lineHeight:      'lineHeight',
    letterSpacing:   'letterSpacing',
    textTransform:   'textTransform',
    color:           'color',
    backgroundColor: 'backgroundColor',
    borderColor:     'borderColor',
};

export function toInlineStyle(style) {
    if (!style || typeof style !== 'object') return {};
    const out = {};
    for (const key of Object.keys(PROP_MAP)) {
        if (style[key]) out[PROP_MAP[key]] = style[key];
    }
    return out;
}
