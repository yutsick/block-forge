import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, RangeControl, SelectControl, TextControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const BG_CLASSES = {
    white: 'bg-white',
    dark:  'bg-gray-900',
    blue:  'bg-banner-blue',
    peach: 'bg-banner-peach',
};

export default function Edit( { attributes, setAttributes } ) {
    const { sectionTitle, sectionDescription, backgroundColor, visibleLinks, cards } = attributes;

    const blockProps = useBlockProps();
    const bgClass = BG_CLASSES[ backgroundColor ] ?? 'bg-white';
    const isDark  = backgroundColor === 'dark';

    const updateCard = ( cardIndex, field, value ) => {
        const updated = cards.map( ( c, i ) => i === cardIndex ? { ...c, [ field ]: value } : c );
        setAttributes( { cards: updated } );
    };

    const updateLink = ( cardIndex, linkIndex, field, value ) => {
        const updated = cards.map( ( c, ci ) => {
            if ( ci !== cardIndex ) return c;
            const links = c.links.map( ( l, li ) => li === linkIndex ? { ...l, [ field ]: value } : l );
            return { ...c, links };
        } );
        setAttributes( { cards: updated } );
    };

    const addLink = ( cardIndex ) => {
        const updated = cards.map( ( c, i ) =>
            i === cardIndex ? { ...c, links: [ ...c.links, { label: '', url: '' } ] } : c
        );
        setAttributes( { cards: updated } );
    };

    const removeLink = ( cardIndex, linkIndex ) => {
        const updated = cards.map( ( c, i ) => {
            if ( i !== cardIndex ) return c;
            return { ...c, links: c.links.filter( ( _, li ) => li !== linkIndex ) };
        } );
        setAttributes( { cards: updated } );
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={ __( 'Section', 'block-forge' ) }>
                    <TextControl
                        label={ __( 'Section Title', 'block-forge' ) }
                        value={ sectionTitle }
                        onChange={ ( v ) => setAttributes( { sectionTitle: v } ) }
                    />
                    <TextareaControl
                        label={ __( 'Section Description', 'block-forge' ) }
                        value={ sectionDescription }
                        onChange={ ( v ) => setAttributes( { sectionDescription: v } ) }
                    />
                    <SelectControl
                        label={ __( 'Background Color', 'block-forge' ) }
                        value={ backgroundColor }
                        options={ [
                            { label: __( 'White', 'block-forge' ), value: 'white' },
                            { label: __( 'Dark',  'block-forge' ), value: 'dark'  },
                            { label: __( 'Blue',  'block-forge' ), value: 'blue'  },
                            { label: __( 'Peach', 'block-forge' ), value: 'peach' },
                        ] }
                        onChange={ ( v ) => setAttributes( { backgroundColor: v } ) }
                    />
                    <RangeControl
                        label={ __( 'Links visible before "Show more"', 'block-forge' ) }
                        value={ visibleLinks }
                        onChange={ ( v ) => setAttributes( { visibleLinks: v } ) }
                        min={ 1 }
                        max={ 10 }
                    />
                </PanelBody>

                { cards.map( ( card, ci ) => (
                    <PanelBody key={ ci } title={ `${ __( 'Card', 'block-forge' ) } ${ ci + 1 }` } initialOpen={ ci === 0 }>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={ ( media ) => {
                                    const updated = cards.map( ( c, i ) =>
                                        i === ci ? { ...c, imageUrl: media.url, imageAlt: media.alt, imageId: media.id } : c
                                    );
                                    setAttributes( { cards: updated } );
                                } }
                                allowedTypes={ [ 'image' ] }
                                value={ card.imageId }
                                render={ ( { open } ) => (
                                    <Button onClick={ open } variant="secondary" style={ { marginBottom: '8px' } }>
                                        { card.imageUrl ? __( 'Replace Image', 'block-forge' ) : __( 'Select Image', 'block-forge' ) }
                                    </Button>
                                ) }
                            />
                        </MediaUploadCheck>
                        <TextControl
                            label={ __( 'Title', 'block-forge' ) }
                            value={ card.title }
                            onChange={ ( v ) => updateCard( ci, 'title', v ) }
                        />
                        <TextareaControl
                            label={ __( 'Description', 'block-forge' ) }
                            value={ card.description }
                            onChange={ ( v ) => updateCard( ci, 'description', v ) }
                        />
                        <TextControl
                            label={ __( '"Show more" label', 'block-forge' ) }
                            value={ card.showMoreLabel }
                            onChange={ ( v ) => updateCard( ci, 'showMoreLabel', v ) }
                        />
                        <p style={ { fontWeight: 600, marginBottom: '8px', fontSize: '11px', textTransform: 'uppercase' } }>
                            { __( 'Links', 'block-forge' ) }
                        </p>
                        { card.links.map( ( link, li ) => (
                            <div key={ li } style={ { display: 'flex', gap: '6px', marginBottom: '8px', alignItems: 'flex-start' } }>
                                <div style={ { flex: 1 } }>
                                    <TextControl
                                        label={ `${ __( 'Label', 'block-forge' ) } ${ li + 1 }` }
                                        value={ link.label }
                                        onChange={ ( v ) => updateLink( ci, li, 'label', v ) }
                                    />
                                    <TextControl
                                        label={ __( 'URL', 'block-forge' ) }
                                        value={ link.url }
                                        onChange={ ( v ) => updateLink( ci, li, 'url', v ) }
                                    />
                                </div>
                                <Button
                                    onClick={ () => removeLink( ci, li ) }
                                    variant="link"
                                    isDestructive
                                    style={ { marginTop: '24px' } }
                                >✕</Button>
                            </div>
                        ) ) }
                        <Button onClick={ () => addLink( ci ) } variant="secondary" style={ { marginTop: '4px' } }>
                            { __( '+ Add Link', 'block-forge' ) }
                        </Button>
                    </PanelBody>
                ) ) }
            </InspectorControls>

            <div { ...blockProps }>
                <section className={ `w-full ${ bgClass } py-10 px-8` }>
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8">
                            <h2 className={ `text-[20px] font-semibold mb-2 ${ isDark ? 'text-gray-100' : 'text-banner-heading' }` }>
                                { sectionTitle }
                            </h2>
                            <p className={ `text-[13px] max-w-2xl ${ isDark ? 'text-gray-400' : 'text-banner-text' }` }>
                                { sectionDescription }
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            { cards.map( ( card, ci ) => (
                                <div key={ ci } className="flex flex-col gap-3">
                                    { card.imageUrl ? (
                                        <img src={ card.imageUrl } alt={ card.imageAlt } className="w-full rounded-xl aspect-[16/9] object-cover" />
                                    ) : (
                                        <div className="w-full rounded-xl aspect-[16/9] bg-banner-blue" />
                                    ) }
                                    <h3 className={ `text-[15px] font-semibold ${ isDark ? 'text-gray-100' : 'text-banner-heading' }` }>
                                        { card.title }
                                    </h3>
                                    <p className={ `text-[11px] leading-relaxed ${ isDark ? 'text-gray-400' : 'text-banner-text' }` }>
                                        { card.description }
                                    </p>
                                    <ul className="flex flex-col gap-1">
                                        { card.links.slice( 0, visibleLinks ).map( ( link, li ) => (
                                            <li key={ li } className={ `text-[11px] font-medium ${ isDark ? 'text-blue-400' : 'text-banner-heading' }` }>
                                                { link.label } →
                                            </li>
                                        ) ) }
                                        { card.links.length > visibleLinks && (
                                            <li className={ `text-[10px] font-semibold ${ isDark ? 'text-gray-400' : 'text-banner-text' }` }>
                                                +{ card.links.length - visibleLinks } { __( 'more', 'block-forge' ) } ({ card.showMoreLabel })
                                            </li>
                                        ) }
                                    </ul>
                                </div>
                            ) ) }
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
