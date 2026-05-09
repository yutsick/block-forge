import { InspectorControls, MediaUpload, MediaUploadCheck, RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const BG_COLORS = {
    blue: 'bg-banner-blue',
    peach: 'bg-banner-peach',
    pink: 'bg-banner-pink',
};

export default function Edit({ attributes, setAttributes }) {
    const {
        title,
        description,
        backgroundColor,
        showDecoration,
        imageUrl,
        imageAlt,
        imageId,
        imageType,
        imagePosition,
        ctaType,
        primaryButton,
        secondaryButton,
        linkLabel,
        linkUrl,
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
                    <ToggleControl
                        label={__('Show Decoration', 'block-forge')}
                        checked={showDecoration}
                        onChange={(value) => setAttributes({ showDecoration: value })}
                    />
                    <SelectControl
                        label={__('Image Type', 'block-forge')}
                        value={imageType}
                        options={[
                            { label: 'Full', value: 'full' },
                            { label: 'Wrapped', value: 'wrapped' },
                        ]}
                        onChange={(value) => setAttributes({ imageType: value })}
                    />
                    <SelectControl
                        label={__('Image Position', 'block-forge')}
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
            </InspectorControls>

            <div {...blockProps}>
                <div className={`
                    relative flex items-center h-[280px]
                    ${BG_COLORS[backgroundColor]}
                    ${isImageLeft ? 'flex-row pr-[80px]' : 'flex-row-reverse pl-[80px]'}
                ` }>

                    { /* Image */}
                    <div className={`
                        shrink-0 flex items-center justify-center
                        ${isImageFull
                            ? 'w-[352px] h-[280px] overflow-visible relative'
                            : 'w-[200px] h-[180px] overflow-hidden rounded-2xl mx-[24px]'
                        }
                    ` }>
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
                                                    ? 'absolute w-[252px] h-[280px] object-cover -top-[15px] left-[85px]'
                                                    : 'w-full h-full object-cover'
                                                }
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                                                {__('Select Image', 'block-forge')}
                                            </div>
                                        )}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                    </div>

                    { /* Content */}
                    <div className="flex-1 flex flex-col gap-4 min-w-0 pb-4 pr-4">
                        <RichText
                            tagName="h2"
                            className="banner__title text-banner-heading text-[28px] font-semibold leading-[34px] tracking-[-0.58px]"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder={__('Title…', 'block-forge')}
                        />
                        <RichText
                            tagName="p"
                            className="banner__description text-banner-text text-[14px] leading-[20px] tracking-[-0.3px]"
                            value={description}
                            onChange={(value) => setAttributes({ description: value })}
                            placeholder={__('Description…', 'block-forge')}
                        />

                        {ctaType === 'buttons' && (
                            <div className="flex gap-3">
                                <a href={primaryButton.url} className="inline-flex items-center px-4 py-2 bg-banner-heading text-white rounded-full text-xs font-semibold">
                                    {primaryButton.label}
                                </a>
                                <a href={secondaryButton.url} className="inline-flex items-center px-4 py-2 border-2 border-banner-heading text-banner-heading rounded-full text-xs font-semibold">
                                    {secondaryButton.label}
                                </a>
                            </div>
                        )}

                        {ctaType === 'link' && (
                            <a href={linkUrl} className="inline-flex items-center gap-2 text-banner-heading text-xs font-semibold underline">
                                {linkLabel} →
                            </a>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}