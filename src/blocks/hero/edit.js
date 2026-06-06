import { InspectorControls, MediaUpload, MediaUploadCheck, RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, RadioControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ElementStylePanel from '../../components/ElementStylePanel';
import LinkPicker from '../../components/LinkPicker';
import { toInlineStyle } from '../../components/typeStyles';

export default function Edit({ attributes, setAttributes }) {
    const {
        bgType, imageUrl, imageAlt, imageId, videoUrl, videoId,
        title, description, primaryButton, secondaryButton, anchorId,
        titleStyle, descriptionStyle, primaryButtonStyle, secondaryButtonStyle,
    } = attributes;

    const blockProps = useBlockProps();
    const isVideo = bgType === 'video';

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Background', 'block-forge')}>
                    <RadioControl
                        label={__('Background type', 'block-forge')}
                        selected={bgType}
                        options={[
                            { label: __('Image', 'block-forge'), value: 'image' },
                            { label: __('Video', 'block-forge'), value: 'video' },
                        ]}
                        onChange={(value) => setAttributes({ bgType: value })}
                    />

                    {isVideo ? (
                        <div style={{ marginTop: '12px' }}>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => setAttributes({ videoUrl: media.url, videoId: media.id })}
                                    allowedTypes={['video']}
                                    value={videoId}
                                    render={({ open }) => (
                                        <Button onClick={open} variant="secondary" style={{ marginBottom: '8px', display: 'block' }}>
                                            {videoUrl ? __('Replace Video', 'block-forge') : __('Select Video', 'block-forge')}
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>
                            {videoUrl && (
                                <Button
                                    onClick={() => setAttributes({ videoUrl: '', videoId: undefined })}
                                    variant="link"
                                    isDestructive
                                >
                                    {__('Remove Video', 'block-forge')}
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div style={{ marginTop: '12px' }}>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => setAttributes({ imageUrl: media.url, imageAlt: media.alt, imageId: media.id })}
                                    allowedTypes={['image']}
                                    value={imageId}
                                    render={({ open }) => (
                                        <Button onClick={open} variant="secondary" style={{ marginBottom: '8px', display: 'block' }}>
                                            {imageUrl ? __('Replace Image', 'block-forge') : __('Select Image', 'block-forge')}
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>
                            {imageUrl && (
                                <Button
                                    onClick={() => setAttributes({ imageUrl: '', imageAlt: '', imageId: undefined })}
                                    variant="link"
                                    isDestructive
                                >
                                    {__('Remove Image', 'block-forge')}
                                </Button>
                            )}
                        </div>
                    )}
                </PanelBody>

                <PanelBody title={__('Primary Button', 'block-forge')}>
                    <LinkPicker
                        label={__('URL', 'block-forge')}
                        url={primaryButton.url}
                        onChange={(value) => setAttributes({ primaryButton: { ...primaryButton, url: value } })}
                    />
                </PanelBody>

                <PanelBody title={__('Secondary Button', 'block-forge')}>
                    <LinkPicker
                        label={__('URL', 'block-forge')}
                        url={secondaryButton.url}
                        onChange={(value) => setAttributes({ secondaryButton: { ...secondaryButton, url: value } })}
                    />
                </PanelBody>
                <ElementStylePanel
                    title={__('Title style', 'block-forge')}
                    value={titleStyle}
                    onChange={(v) => setAttributes({ titleStyle: v })}
                />
                <ElementStylePanel
                    title={__('Description style', 'block-forge')}
                    value={descriptionStyle}
                    onChange={(v) => setAttributes({ descriptionStyle: v })}
                />
                <ElementStylePanel
                    title={__('Primary button style', 'block-forge')}
                    value={primaryButtonStyle}
                    onChange={(v) => setAttributes({ primaryButtonStyle: v })}
                    includeBackground
                    includeBorder
                />
                <ElementStylePanel
                    title={__('Secondary button style', 'block-forge')}
                    value={secondaryButtonStyle}
                    onChange={(v) => setAttributes({ secondaryButtonStyle: v })}
                    includeBackground
                    includeBorder
                />

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
                <section
                    id={anchorId || undefined}
                    className={`relative w-full ${isVideo ? 'min-h-[760px]' : 'min-h-[420px]'} flex items-center overflow-hidden ${!isVideo && !imageUrl ? 'bg-black/60' : 'bg-transparent'}`}
                >
                    {isVideo && videoUrl && (
                        <video
                            src={videoUrl}
                            className="absolute inset-0 w-full h-full object-cover !m-0"
                            autoPlay muted loop playsInline
                            style={{ pointerEvents: 'none' }}
                        />
                    )}

                    {!isVideo && imageUrl && (
                        <img
                            src={imageUrl}
                            alt={imageAlt}
                            className="absolute inset-0 w-full h-full object-cover !m-0"
                        />
                    )}

                    {isVideo && (
                        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
                    )}

                    {!isVideo && imageUrl && (
                        <div className="absolute inset-0 bg-black/35" />
                    )}

                    <div className="relative z-10 w-full max-w-[1120px] mx-auto px-8 py-16 text-center flex flex-col items-center">
                        <RichText
                            tagName="h1"
                            className={`hero__title font-semibold mb-6 max-w-2xl ${isVideo ? '!text-[#AED9E9] text-[48px] leading-[54px]' : '!text-white text-[36px] leading-[42px]'}`}
                            style={toInlineStyle(titleStyle)}
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder={__('Hero heading…', 'block-forge')}
                        />
                        <RichText
                            tagName="p"
                            className="hero__description !text-white text-[16px] leading-[24px] mb-8 max-w-lg"
                            style={toInlineStyle(descriptionStyle)}
                            value={description}
                            onChange={(value) => setAttributes({ description: value })}
                            placeholder={__('Description…', 'block-forge')}
                        />
                        <div className="flex flex-wrap gap-4 justify-center">
                            <RichText
                                tagName="span"
                                className="hero__btn inline-flex items-center justify-center px-8 py-3 bg-banner-pink !text-black rounded-full text-sm font-semibold font-barlow-semicondensed"
                                style={toInlineStyle(primaryButtonStyle)}
                                value={primaryButton.label}
                                onChange={(value) => setAttributes({ primaryButton: { ...primaryButton, label: value } })}
                                placeholder={__('Primary button…', 'block-forge')}
                                allowedFormats={[]}
                            />
                            <RichText
                                tagName="span"
                                className="hero__btn inline-flex items-center justify-center px-8 py-3 border border-white text-white rounded-full text-sm font-semibold font-barlow-semicondensed"
                                style={toInlineStyle(secondaryButtonStyle)}
                                value={secondaryButton.label}
                                onChange={(value) => setAttributes({ secondaryButton: { ...secondaryButton, label: value } })}
                                placeholder={__('Secondary button…', 'block-forge')}
                                allowedFormats={[]}
                            />
                        </div>
                    </div>

                    {isVideo && (
                        <div className="absolute bottom-4 right-6 z-20 w-10 h-10 rounded-full border-2 border-white/70 flex items-center justify-center text-white bg-black/20 pointer-events-none">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="white"><rect x="2" y="1" width="4" height="14" rx="1" /><rect x="10" y="1" width="4" height="14" rx="1" /></svg>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}
