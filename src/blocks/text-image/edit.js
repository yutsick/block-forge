import { InspectorControls, MediaUpload, MediaUploadCheck, RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const BG_CLASSES = {
    white: 'bg-white',
    peach: 'bg-banner-peach',
    blue: 'bg-banner-blue',
    pink: 'bg-banner-pink',
};

export default function Edit({ attributes, setAttributes }) {
    const {
        title, description, linkLabel, linkUrl,
        imageUrl, imageAlt, imageId,
        imageType, imagePosition, backgroundColor,
        anchorId,
    } = attributes;

    const blockProps = useBlockProps();
    const bgClass = BG_CLASSES[backgroundColor] ?? 'bg-white';
    const isFull = imageType === 'full';
    const imgRight = imagePosition === 'right';

    const imageColumn = (
        <div className={isFull
            ? 'flex-[3] relative min-h-[280px] overflow-hidden max-w-[47%] bg-banner-blue'
            : 'w-full md:flex-1 md:max-w-[48%] shrink-0'
        }>
            <MediaUploadCheck>
                <MediaUpload
                    onSelect={(media) => setAttributes({ imageUrl: media.url, imageAlt: media.alt, imageId: media.id })}
                    allowedTypes={['image']}
                    value={imageId}
                    render={({ open }) => (
                        imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={imageAlt}
                                onClick={open}
                                className={isFull
                                    ? 'absolute inset-0 w-full h-full object-cover cursor-pointer'
                                    : 'w-full h-full max-h-[440px] object-cover rounded-2xl cursor-pointer'
                                }
                            />
                        ) : (
                            <Button
                                onClick={open}
                                className={isFull
                                    ? 'absolute inset-0 w-full h-full flex items-center justify-center bg-banner-blue/50 text-banner-heading text-sm font-semibold'
                                    : 'w-full aspect-[4/3] flex items-center justify-center bg-banner-blue rounded-2xl text-banner-heading text-sm font-semibold'
                                }
                            >
                                {__('Select Image', 'block-forge')}
                            </Button>
                        )
                    )}
                />
            </MediaUploadCheck>
        </div>
    );

    const textColumn = (
        <div className={isFull
            ? `flex-[2] ${bgClass} flex items-center px-14 py-12`
            : `flex-1 flex flex-col justify-center ${bgClass}`
        }>
            <div className={isFull ? 'max-w-sm' : ''}>
                <RichText
                    tagName="h2"
                    className={`font-semibold text-banner-heading mb-4 ${isFull ? 'text-[22px] leading-snug' : 'text-[26px] leading-tight'}`}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                    placeholder={__('Title…', 'block-forge')}
                />
                <RichText
                    tagName="p"
                    className="type-body text-banner-text leading-relaxed mb-5"
                    value={description}
                    onChange={(value) => setAttributes({ description: value })}
                    placeholder={__('Description…', 'block-forge')}
                />
                {linkLabel && isFull && (
                    <a href={linkUrl} className="inline-flex items-center gap-1 type-regular-link hover:underline">
                        {linkLabel}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 12.375L19.25 12.375" stroke="#27348B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12.5 19.125L19.25 12.375L12.5 5.625" stroke="#27348B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                )}
                {linkLabel && !isFull && (
                    <span className="inline-flex items-center gap-1 type-body font-semibold text-banner-heading">
                        {linkLabel} →
                    </span>
                )}
            </div>
        </div>
    );

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Layout', 'block-forge')}>
                    <SelectControl
                        label={__('Image Type', 'block-forge')}
                        value={imageType}
                        options={[
                            { label: __('Boxed (rounded corners)', 'block-forge'), value: 'boxed' },
                            { label: __('Full bleed', 'block-forge'), value: 'full' },
                        ]}
                        onChange={(value) => setAttributes({ imageType: value })}
                    />
                    <SelectControl
                        label={__('Image Position', 'block-forge')}
                        value={imagePosition}
                        options={[
                            { label: __('Left', 'block-forge'), value: 'left' },
                            { label: __('Right', 'block-forge'), value: 'right' },
                        ]}
                        onChange={(value) => setAttributes({ imagePosition: value })}
                    />
                    <SelectControl
                        label={__('Background Color', 'block-forge')}
                        value={backgroundColor}
                        options={[
                            { label: __('White', 'block-forge'), value: 'white' },
                            { label: __('Peach', 'block-forge'), value: 'peach' },
                            { label: __('Blue', 'block-forge'), value: 'blue' },
                            { label: __('Pink', 'block-forge'), value: 'pink' },
                        ]}
                        onChange={(value) => setAttributes({ backgroundColor: value })}
                    />
                </PanelBody>
                <PanelBody title={__('Link', 'block-forge')} initialOpen={false}>
                    <TextControl
                        label={__('Link Label', 'block-forge')}
                        value={linkLabel}
                        onChange={(value) => setAttributes({ linkLabel: value })}
                    />
                    <TextControl
                        label={__('Link URL', 'block-forge')}
                        value={linkUrl}
                        onChange={(value) => setAttributes({ linkUrl: value })}
                    />
                </PanelBody>
                <PanelBody title={__('Image', 'block-forge')} initialOpen={false}>
                    {imageUrl && (
                        <Button
                            onClick={() => setAttributes({ imageUrl: '', imageAlt: '', imageId: undefined })}
                            variant="link"
                            isDestructive
                        >
                            {__('Remove Image', 'block-forge')}
                        </Button>
                    )}
                </PanelBody>
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
                <section id={anchorId || undefined} className={`w-full flex ${isFull ? 'min-h-[360px]' : `${bgClass} py-14 px-8`}`}>
                    <div className={`w-full flex ${isFull ? '' : 'max-w-[1120px] mx-auto'} items-center gap-8 ${imgRight ? 'flex-row-reverse' : 'flex-row'}`}>
                        {imageColumn}
                        {textColumn}
                    </div>
                </section>
            </div>
        </>
    );
}
