import { useBlockProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
    const { title, subtitle } = attributes;
    const blockProps = useBlockProps();

    return (
        <div { ...blockProps }>
            <header className="page-header mb-4">
                <RichText
                    tagName="h1"
                    className="type-h1 text-[#2F2F2F]"
                    value={ title }
                    onChange={ ( v ) => setAttributes( { title: v } ) }
                    placeholder={ __( 'Sök med fritext', 'block-forge' ) }
                    allowedFormats={ [] }
                />
            </header>

            <RichText
                tagName="p"
                className="type-ingress text-[#4E4E4E] mb-8"
                value={ subtitle }
                onChange={ ( v ) => setAttributes( { subtitle: v } ) }
                placeholder={ __( 'Här kan du söka efter innehåll…', 'block-forge' ) }
                allowedFormats={ [] }
            />

            {/* Static preview — the real, functional form renders on the front end. */}
            <div className="movendi-search-form max-w-[560px]" aria-hidden="true">
                <span className="block font-barlow-semicondensed font-semibold text-sm text-[#2F2F2F] mb-2">
                    { __( 'Vad letar du efter?', 'block-forge' ) }
                </span>
                <div className="flex items-stretch gap-3">
                    <div className="relative flex-1 min-w-0">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#27348B]">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="9" r="6" />
                                <path d="M17 17l-3.6-3.6" />
                            </svg>
                        </span>
                        <div className="w-full h-[52px] pl-11 pr-4 rounded-full border border-[#DDDDDD] bg-white flex items-center font-ancizar-serif text-[16px] text-[#4E4E4E]">
                            { __( 'Sök', 'block-forge' ) }
                        </div>
                    </div>
                    <div className="shrink-0 inline-flex items-center justify-center h-[52px] px-8 rounded-full bg-[#27348B] text-white font-barlow-semicondensed font-semibold uppercase tracking-wide">
                        { __( 'Sök', 'block-forge' ) }
                    </div>
                </div>
            </div>
        </div>
    );
}
