import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const BG_OPTIONS = [
    { label: __( 'White', 'block-forge' ), value: 'white' },
    { label: __( 'Blue', 'block-forge' ), value: 'blue' },
    { label: __( 'Transparent', 'block-forge' ), value: 'transparent' },
    { label: __( 'Peach', 'block-forge' ), value: 'peach' },
];

const BG_CLASSES = {
    white:       'bg-white',
    blue:        'bg-banner-blue',
    transparent: 'bg-transparent',
    peach:       'bg-banner-peach',
};

export default function Edit( { attributes, setAttributes } ) {
    const { backgroundColor, ctaLabel, ctaUrl, utilityLinks } = attributes;

    const blockProps = useBlockProps();
    const bgClass = BG_CLASSES[ backgroundColor ] ?? 'bg-white';

    return (
        <>
            <InspectorControls>
                <PanelBody title={ __( 'Header Settings', 'block-forge' ) }>
                    <SelectControl
                        label={ __( 'Background Color', 'block-forge' ) }
                        value={ backgroundColor }
                        options={ BG_OPTIONS }
                        onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
                    />
                    <TextControl
                        label={ __( 'CTA Button Label', 'block-forge' ) }
                        value={ ctaLabel }
                        onChange={ ( value ) => setAttributes( { ctaLabel: value } ) }
                    />
                    <TextControl
                        label={ __( 'CTA Button URL', 'block-forge' ) }
                        value={ ctaUrl }
                        onChange={ ( value ) => setAttributes( { ctaUrl: value } ) }
                    />
                </PanelBody>
                <PanelBody title={ __( 'Utility Links', 'block-forge' ) } initialOpen={ false }>
                    { utilityLinks.map( ( link, i ) => (
                        <div key={ i } style={ { marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #eee' } }>
                            <TextControl
                                label={ `${ __( 'Label', 'block-forge' ) } ${ i + 1 }` }
                                value={ link.label }
                                onChange={ ( value ) => {
                                    const updated = [ ...utilityLinks ];
                                    updated[ i ] = { ...updated[ i ], label: value };
                                    setAttributes( { utilityLinks: updated } );
                                } }
                            />
                            <TextControl
                                label={ __( 'URL', 'block-forge' ) }
                                value={ link.url }
                                onChange={ ( value ) => {
                                    const updated = [ ...utilityLinks ];
                                    updated[ i ] = { ...updated[ i ], url: value };
                                    setAttributes( { utilityLinks: updated } );
                                } }
                            />
                        </div>
                    ) ) }
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
                <header className={ `${ bgClass } w-full border-b border-black/10` }>
                    <div className="flex items-center justify-between px-8 py-3">
                        <span className="font-black text-banner-heading text-[22px] tracking-tight italic">movendi</span>
                        <nav className="flex items-center gap-6">
                            <span className="text-sm text-banner-text font-medium">Uppträck Movendi</span>
                            <span className="text-sm text-banner-text font-medium">Få stöd &amp; kunskap ▾</span>
                            <span className="text-sm text-banner-text font-medium">Mer om oss ▾</span>
                        </nav>
                        <span className="inline-flex items-center px-4 py-2 bg-banner-heading text-white rounded-full text-xs font-semibold">
                            { ctaLabel }
                        </span>
                    </div>
                </header>
            </div>
        </>
    );
}
