import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { Button, Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const linkIcon = (
    <svg class="!fill-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
    </svg>

);

/**
 * Reusable URL picker. Opens a popover with core's LinkControl
 * (autocomplete search for pages/posts + free-text URL fallback).
 *
 * Stores a plain URL string in the parent attribute.
 *
 * Props:
 *   - label:        string  – field label shown above the button (full mode only)
 *   - url:          string  – current value
 *   - onChange:     (url:string) => void
 *   - placeholder?: string  – text on the button when empty (full mode only)
 *   - compact?:     bool    – render as a small icon button instead of full bar
 */
export default function LinkPicker({ label, url, onChange, placeholder, compact = false }) {
    const [isOpen, setIsOpen] = useState(false);

    if (compact) {
        return (
            <span style={{ position: 'relative', display: 'inline-flex' }}>
                <Button
                    icon={linkIcon}
                    size="small"
                    label={url || __('Set URL', 'block-forge')}
                    showTooltip
                    isPressed={!!url}
                    onClick={() => setIsOpen((v) => !v)}
                />
                {isOpen && (
                    <Popover
                        placement="bottom-start"
                        onClose={() => setIsOpen(false)}
                        focusOnMount="firstElement"
                    >
                        <div style={{ minWidth: '320px' }}>
                            <LinkControl
                                value={{ url }}
                                onChange={({ url: next }) => onChange(next || '')}
                                settings={[]}
                            />
                            {url && (
                                <div style={{ padding: '8px 16px', borderTop: '1px solid #e0e0e0' }}>
                                    <Button
                                        variant="link"
                                        isDestructive
                                        onClick={() => { onChange(''); setIsOpen(false); }}
                                    >
                                        {__('Remove link', 'block-forge')}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Popover>
                )}
            </span>
        );
    }

    return (
        <div style={{ marginBottom: '12px' }}>
            {label && (
                <label
                    style={{
                        display: 'block',
                        marginBottom: '4px',
                        fontSize: '11px',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                    }}
                >
                    {label}
                </label>
            )}
            <Button
                variant="secondary"
                onClick={() => setIsOpen((v) => !v)}
                style={{ width: '100%', justifyContent: 'flex-start', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
                {url || placeholder || __('Choose a page or paste a URL…', 'block-forge')}
            </Button>
            {isOpen && (
                <Popover
                    placement="bottom-start"
                    onClose={() => setIsOpen(false)}
                    focusOnMount="firstElement"
                >
                    <LinkControl
                        value={{ url }}
                        onChange={({ url: next }) => onChange(next || '')}
                        settings={[]}
                    />
                </Popover>
            )}
            {url && (
                <Button
                    variant="link"
                    isDestructive
                    onClick={() => onChange('')}
                    style={{ marginTop: '4px' }}
                >
                    {__('Remove link', 'block-forge')}
                </Button>
            )}
        </div>
    );
}
