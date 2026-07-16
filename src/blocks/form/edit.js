import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Spinner } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

/* Brand colors — value slugs shared with render.php (keep the maps in sync). */
export const BG_COLORS = {
    'bg-grey':       '#F8F8F8',
    'white':         '#FFFFFF',
    'yellow-60':     '#FEE4CB',
    'light-blue-60': '#D9ECF4',
    'coral-60':      '#FAD2C9',
    'yellow':        '#FBC894',
    'light-blue':    '#AED9E9',
    'coral':         '#F49F92',
    'blue':          '#27348B',
    'purple':        '#671B52',
};

export const FIELD_BG_COLORS = {
    'white':   '#FFFFFF',
    'bg-grey': '#F8F8F8',
};

export const LABEL_COLORS = {
    'default':   '#212121',
    'black':     '#2F2F2F',
    'blue':      '#27348B',
    'text-grey': '#4E4E4E',
    'white':     '#FFFFFF',
};

export const FIELD_TEXT_COLORS = {
    'black':     '#2F2F2F',
    'text-grey': '#4E4E4E',
    'blue':      '#27348B',
};

export default function Edit({ attributes, setAttributes }) {
    const { formId, bgColor, fieldBg, labelColor, fieldTextColor } = attributes;

    const [forms, setForms] = useState(null);

    useEffect(() => {
        apiFetch({ path: '/block-forge/v1/forminator-forms' })
            .then((list) => setForms(Array.isArray(list) ? list : []))
            .catch(() => setForms([]));
    }, []);

    const blockProps = useBlockProps();

    const bg        = BG_COLORS[bgColor] ?? '#F8F8F8';
    const field     = FIELD_BG_COLORS[fieldBg] ?? '#FFFFFF';
    const label     = LABEL_COLORS[labelColor] ?? '#212121';
    const fieldText = FIELD_TEXT_COLORS[fieldTextColor] ?? '#2F2F2F';

    const selectedForm = forms?.find((f) => f.id === formId);

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Formulär', 'block-forge')}>
                    {forms === null ? (
                        <Spinner />
                    ) : (
                        <SelectControl
                            label={__('Forminator form', 'block-forge')}
                            value={String(formId || 0)}
                            options={[
                                { label: __('— Välj formulär —', 'block-forge'), value: '0' },
                                ...forms.map((f) => ({ label: `${f.title} (#${f.id})`, value: String(f.id) })),
                            ]}
                            onChange={(v) => setAttributes({ formId: parseInt(v, 10) || 0 })}
                        />
                    )}
                    <SelectControl
                        label={__('Bakgrund (kort)', 'block-forge')}
                        value={bgColor}
                        options={[
                            { label: __('Ljusgrå', 'block-forge'),     value: 'bg-grey' },
                            { label: __('Vit', 'block-forge'),         value: 'white' },
                            { label: __('Gul 60%', 'block-forge'),     value: 'yellow-60' },
                            { label: __('Ljusblå 60%', 'block-forge'), value: 'light-blue-60' },
                            { label: __('Korall 60%', 'block-forge'),  value: 'coral-60' },
                            { label: __('Gul', 'block-forge'),         value: 'yellow' },
                            { label: __('Ljusblå', 'block-forge'),     value: 'light-blue' },
                            { label: __('Korall', 'block-forge'),      value: 'coral' },
                            { label: __('Blå', 'block-forge'),         value: 'blue' },
                            { label: __('Lila', 'block-forge'),        value: 'purple' },
                        ]}
                        onChange={(v) => setAttributes({ bgColor: v })}
                    />
                    <SelectControl
                        label={__('Fältens bakgrund', 'block-forge')}
                        value={fieldBg}
                        options={[
                            { label: __('Vit', 'block-forge'),     value: 'white' },
                            { label: __('Ljusgrå', 'block-forge'), value: 'bg-grey' },
                        ]}
                        onChange={(v) => setAttributes({ fieldBg: v })}
                    />
                    <SelectControl
                        label={__('Etiketter (labels)', 'block-forge')}
                        value={labelColor}
                        options={[
                            { label: __('Mörk (standard)', 'block-forge'), value: 'default' },
                            { label: __('Svart', 'block-forge'),           value: 'black' },
                            { label: __('Blå', 'block-forge'),             value: 'blue' },
                            { label: __('Text grey', 'block-forge'),       value: 'text-grey' },
                            { label: __('Vit', 'block-forge'),             value: 'white' },
                        ]}
                        onChange={(v) => setAttributes({ labelColor: v })}
                    />
                    <SelectControl
                        label={__('Text i fälten', 'block-forge')}
                        value={fieldTextColor}
                        options={[
                            { label: __('Svart', 'block-forge'),     value: 'black' },
                            { label: __('Text grey', 'block-forge'), value: 'text-grey' },
                            { label: __('Blå', 'block-forge'),       value: 'blue' },
                        ]}
                        onChange={(v) => setAttributes({ fieldTextColor: v })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {/* Static mock preview — the real form renders on the front end. */}
                <div style={{ background: bg, borderRadius: '16px', padding: '32px', maxWidth: '736px' }}>
                    <p style={{
                        margin: '0 0 6px',
                        fontFamily: 'Barlow Semi Condensed, sans-serif',
                        fontWeight: 600,
                        fontSize: '14px',
                        color: label,
                    }}>
                        {selectedForm
                            ? `${selectedForm.title} (#${selectedForm.id})`
                            : __('Forminator-formulär — välj i sidopanelen', 'block-forge')}
                    </p>
                    <div style={{
                        background: field,
                        border: '1px solid #DDDDDD',
                        borderRadius: '4px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 18px',
                        color: fieldText,
                        fontFamily: 'Ancizar Serif, serif',
                        fontSize: '18px',
                    }}>
                        Aa
                    </div>
                    <div style={{
                        marginTop: '16px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        height: '40px',
                        padding: '0 24px',
                        borderRadius: '30px',
                        background: '#27348B',
                        color: '#FFFFFF',
                        fontFamily: 'Barlow Semi Condensed, sans-serif',
                        fontSize: '18px',
                        fontWeight: 500,
                    }}>
                        {__('Skicka', 'block-forge')}
                    </div>
                </div>
            </div>
        </>
    );
}
