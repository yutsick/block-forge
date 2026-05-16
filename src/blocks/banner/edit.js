import { InspectorControls, MediaUpload, MediaUploadCheck, RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const BG_COLORS = {
    blue: 'bg-banner-blue',
    peach: 'bg-banner-peach',
    pink: 'bg-banner-pink/60',
};

export default function Edit({ attributes, setAttributes }) {
    const {
        title,
        description,
        backgroundColor,
        showDecoration,
        showDecorationMobile,
        decorationUrl,
        decorationId,
        decorationMobileUrl,
        decorationMobileId,
        imageUrl,
        imageAlt,
        imageId,
        imageType,
        imageTypeMobile,
        imagePosition,
        ctaType,
        primaryButton,
        secondaryButton,
        linkLabel,
        linkUrl,
        anchorId,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'relative overflow-hidden',
    });

    const isImageLeft = imagePosition === 'left';
    const isImageFull = imageType === 'full';

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Banner Settings', 'block-forge')}>
                    <SelectControl
                        label={__('Background Color', 'block-forge')}
                        value={backgroundColor}
                        options={[
                            { label: 'Blue', value: 'blue' },
                            { label: 'Peach', value: 'peach' },
                            { label: 'Pink', value: 'pink' },
                        ]}
                        onChange={(value) => setAttributes({ backgroundColor: value })}
                    />
                    <SelectControl
                        label={__('Image Style (desktop)', 'block-forge')}
                        value={imageType}
                        options={[
                            { label: 'Full', value: 'full' },
                            { label: 'Boxed', value: 'boxed' },
                        ]}
                        onChange={(value) => setAttributes({ imageType: value })}
                    />
                    <SelectControl
                        label={__('Image Style (mobile)', 'block-forge')}
                        value={imageTypeMobile}
                        options={[
                            { label: 'Full', value: 'full' },
                            { label: 'Boxed', value: 'boxed' },
                        ]}
                        onChange={(value) => setAttributes({ imageTypeMobile: value })}
                    />
                    <SelectControl
                        label={__('Image Position (desktop)', 'block-forge')}
                        value={imagePosition}
                        options={[
                            { label: 'Left', value: 'left' },
                            { label: 'Right', value: 'right' },
                        ]}
                        onChange={(value) => setAttributes({ imagePosition: value })}
                    />
                    <SelectControl
                        label={__('CTA Type', 'block-forge')}
                        value={ctaType}
                        options={[
                            { label: 'None', value: 'none' },
                            { label: 'Buttons', value: 'buttons' },
                            { label: 'Link', value: 'link' },
                        ]}
                        onChange={(value) => setAttributes({ ctaType: value })}
                    />
                    {ctaType === 'buttons' && (
                        <>
                            <TextControl
                                label={__('Primary Button Label', 'block-forge')}
                                value={primaryButton.label}
                                onChange={(value) => setAttributes({ primaryButton: { ...primaryButton, label: value } })}
                            />
                            <TextControl
                                label={__('Primary Button URL', 'block-forge')}
                                value={primaryButton.url}
                                onChange={(value) => setAttributes({ primaryButton: { ...primaryButton, url: value } })}
                            />
                            <TextControl
                                label={__('Secondary Button Label', 'block-forge')}
                                value={secondaryButton.label}
                                onChange={(value) => setAttributes({ secondaryButton: { ...secondaryButton, label: value } })}
                            />
                            <TextControl
                                label={__('Secondary Button URL', 'block-forge')}
                                value={secondaryButton.url}
                                onChange={(value) => setAttributes({ secondaryButton: { ...secondaryButton, url: value } })}
                            />
                        </>
                    )}
                    {ctaType === 'link' && (
                        <>
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
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Decoration', 'block-forge')} initialOpen={false}>
                    <p style={{ fontSize: '11px', color: '#757575', marginBottom: '12px' }}>
                        {__('Desktop — shown at the bottom of the image side.', 'block-forge')}
                    </p>
                    <ToggleControl
                        label={__('Show on desktop', 'block-forge')}
                        checked={showDecoration}
                        onChange={(value) => setAttributes({ showDecoration: value })}
                    />
                    {decorationUrl && (
                        <img src={decorationUrl} alt="" style={{ display: 'block', maxHeight: '60px', objectFit: 'contain', marginBottom: '8px' }} />
                    )}
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) => setAttributes({ decorationUrl: media.url, decorationId: media.id })}
                            allowedTypes={['image']}
                            value={decorationId}
                            render={({ open }) => (
                                <Button variant="secondary" onClick={open} style={{ marginBottom: '4px' }}>
                                    {decorationUrl ? __('Replace decoration', 'block-forge') : __('Select decoration', 'block-forge')}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                    {decorationUrl && (
                        <Button variant="link" isDestructive onClick={() => setAttributes({ decorationUrl: '', decorationId: undefined })} style={{ display: 'block', marginBottom: '16px' }}>
                            {__('Remove', 'block-forge')}
                        </Button>
                    )}

                    <p style={{ fontSize: '11px', color: '#757575', margin: '12px 0' }}>
                        {__('Mobile — always shown at bottom right.', 'block-forge')}
                    </p>
                    <ToggleControl
                        label={__('Show on mobile', 'block-forge')}
                        checked={showDecorationMobile}
                        onChange={(value) => setAttributes({ showDecorationMobile: value })}
                    />
                    {decorationMobileUrl && (
                        <img src={decorationMobileUrl} alt="" style={{ display: 'block', maxHeight: '60px', objectFit: 'contain', marginBottom: '8px' }} />
                    )}
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) => setAttributes({ decorationMobileUrl: media.url, decorationMobileId: media.id })}
                            allowedTypes={['image']}
                            value={decorationMobileId}
                            render={({ open }) => (
                                <Button variant="secondary" onClick={open} style={{ marginBottom: '4px' }}>
                                    {decorationMobileUrl ? __('Replace mobile decoration', 'block-forge') : __('Select mobile decoration', 'block-forge')}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                    {decorationMobileUrl && (
                        <Button variant="link" isDestructive onClick={() => setAttributes({ decorationMobileUrl: '', decorationMobileId: undefined })}>
                            {__('Remove', 'block-forge')}
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
                <div id={anchorId || undefined} className={`
                    relative flex items-stretch min-h-[500px]
                    ${BG_COLORS[backgroundColor]}
                    ${isImageLeft ? 'flex-row' : 'flex-row-reverse'}
                `}>

                    {/* Desktop decoration — bottom, image side */}
                    {decorationUrl && showDecoration && (
                        <img
                            src={decorationUrl}
                            alt=""
                            aria-hidden="true"
                            className={`absolute bottom-0 !m-0 ${isImageLeft ? 'left-0' : 'right-0'} h-full object-contain pointer-events-none select-none z-0`}
                        />
                    )}

                    {/* Image column */}
                    <div className={`
                        flex items-center justify-center
                        ${isImageFull
                            ? 'relative flex-[3] max-w-[47%] overflow-hidden'
                            : 'flex-[3] max-w-[47%] items-center justify-center mx-[48px]'
                        }
                    `}>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => setAttributes({
                                    imageUrl: media.url,
                                    imageAlt: media.alt,
                                    imageId: media.id,
                                })}
                                allowedTypes={['image']}
                                value={imageId}
                                render={({ open }) => (
                                    <Button onClick={open} className="w-full h-full">
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt={imageAlt}
                                                className={isImageFull
                                                    ? '!m-0 absolute inset-0 w-full h-full object-cover object-top'
                                                    : 'w-[400px] h-[260px] object-cover rounded-2xl'
                                                }
                                            />
                                        ) : (
                                            <div className="w-full h-full min-h-[200px] bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                                                {__('Select Image', 'block-forge')}
                                            </div>
                                        )}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                    </div>

                    {/* Content column */}
                    <div className="flex-[2] flex flex-col justify-center gap-6 min-w-0 px-8 py-8 max-w-xl relative z-10">
                        <RichText
                            tagName="h2"
                            className="banner__title font-barlow-semicondensed text-banner-heading text-[28px] font-semibold leading-[34px] tracking-[-0.01em]"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder={__('Title…', 'block-forge')}
                        />
                        <RichText
                            tagName="p"
                            className="banner__description type-body-lg text-grey"
                            value={description}
                            onChange={(value) => setAttributes({ description: value })}
                            placeholder={__('Description…', 'block-forge')}
                        />

                        {ctaType === 'buttons' && (
                            <div className="flex gap-4">
                                <a href={primaryButton.url} className="!no-underline inline-flex items-center px-6 py-3 bg-banner-heading !text-white rounded-full text-sm font-semibold">
                                    {primaryButton.label}
                                </a>
                                <a href={secondaryButton.url} className="!no-underline inline-flex items-center px-6 py-3 border-2 border-banner-heading text-banner-heading rounded-full text-sm font-semibold">
                                    {secondaryButton.label}
                                </a>
                            </div>
                        )}

                        {ctaType === 'link' && (
                            <a href={linkUrl} className="flex items-center gap-2 type-regular-link !no-underline">
                                {linkLabel}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 12.375L19.25 12.375" stroke="#27348B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12.5 19.125L19.25 12.375L12.5 5.625" stroke="#27348B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}
