import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const ICON_OPTIONS = [
    { label: __( 'Person', 'block-forge' ),    value: 'person' },
    { label: __( 'Group', 'block-forge' ),     value: 'group' },
    { label: __( 'Calendar', 'block-forge' ),  value: 'calendar' },
    { label: __( 'Megaphone', 'block-forge' ), value: 'megaphone' },
];

const ICON_EMOJIS = {
    person:    '👤',
    group:     '👥',
    calendar:  '📅',
    megaphone: '📣',
};

export default function Edit( { attributes, setAttributes } ) {
    const { sectionTitle, stats } = attributes;

    const blockProps = useBlockProps();

    const updateStat = ( index, field, value ) => {
        const updated = stats.map( ( s, i ) => i === index ? { ...s, [ field ]: value } : s );
        setAttributes( { stats: updated } );
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={ __( 'Section', 'block-forge' ) }>
                    <TextControl
                        label={ __( 'Section Title', 'block-forge' ) }
                        value={ sectionTitle }
                        onChange={ ( value ) => setAttributes( { sectionTitle: value } ) }
                    />
                </PanelBody>

                { stats.map( ( stat, i ) => (
                    <PanelBody key={ i } title={ `${ __( 'Stat', 'block-forge' ) } ${ i + 1 }` } initialOpen={ i === 0 }>
                        <SelectControl
                            label={ __( 'Icon', 'block-forge' ) }
                            value={ stat.icon }
                            options={ ICON_OPTIONS }
                            onChange={ ( value ) => updateStat( i, 'icon', value ) }
                        />
                        <TextControl
                            label={ __( 'Value (e.g. 10 000+)', 'block-forge' ) }
                            value={ stat.value }
                            onChange={ ( value ) => updateStat( i, 'value', value ) }
                        />
                        <TextControl
                            label={ __( 'Label', 'block-forge' ) }
                            value={ stat.label }
                            onChange={ ( value ) => updateStat( i, 'label', value ) }
                        />
                        <TextareaControl
                            label={ __( 'Description', 'block-forge' ) }
                            value={ stat.description }
                            onChange={ ( value ) => updateStat( i, 'description', value ) }
                        />
                    </PanelBody>
                ) ) }
            </InspectorControls>

            <div { ...blockProps }>
                <section className="w-full py-10 px-8 bg-white">
                    <div className="max-w-6xl mx-auto">
                        { sectionTitle && (
                            <p className="text-[11px] font-semibold tracking-widest uppercase text-banner-text text-center mb-8">
                                { sectionTitle }
                            </p>
                        ) }
                        <div className="grid grid-cols-4 gap-6">
                            { stats.map( ( stat, i ) => (
                                <div key={ i } className="flex flex-col items-center text-center gap-2">
                                    <span className="text-3xl">{ ICON_EMOJIS[ stat.icon ] ?? '📌' }</span>
                                    { stat.value && (
                                        <span className="text-[20px] font-semibold text-banner-heading">{ stat.value }</span>
                                    ) }
                                    <span className="text-[12px] font-semibold text-banner-heading">{ stat.label }</span>
                                    <p className="text-[10px] text-banner-text leading-relaxed">{ stat.description }</p>
                                </div>
                            ) ) }
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
