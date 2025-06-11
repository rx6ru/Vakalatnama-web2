"use client";

import { useEffect, useRef, useState, useCallback } from 'react';

interface TextPressureProps {
    text?: string;
    fontFamily?: string;
    fontUrl?: string;
    width?: boolean;
    weight?: boolean;
    italic?: boolean;
    alpha?: boolean;
    flex?: boolean;
    stroke?: boolean;
    scale?: boolean;
    textColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    className?: string;
    minFontSize?: number;
}

const TextPressure: React.FC<TextPressureProps> = ({
    text = 'Compressa',
    fontFamily = 'Compressa VF',
    fontUrl = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',
    width = true,
    weight = true,
    italic = true,
    alpha = false,
    flex = true,
    stroke = false,
    scale = false,
    textColor = '#FFFFFF',
    strokeColor = '#FF0000',
    strokeWidth = 2,
    className = '',
    minFontSize = 24,
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
    const rafIdRef = useRef<number | null>(null);

    const mouseRef = useRef({ x: 0, y: 0 });
    const cursorRef = useRef({ x: 0, y: 0 });

    const [fontSize, setFontSize] = useState(minFontSize);
    const [scaleY, setScaleY] = useState(1);
    const [lineHeight, setLineHeight] = useState(1);
    const [fontLoaded, setFontLoaded] = useState(false);

    // Memoize chars to prevent unnecessary re-renders
    const chars = text.split('');

    const dist = useCallback((a: { x: number; y: number }, b: { x: number; y: number }) => {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        return Math.sqrt(dx * dx + dy * dy);
    }, []);

    // Font loading effect
    useEffect(() => {
        if (!fontUrl) {
            setFontLoaded(true);
            return;
        }

        const font = new FontFace(fontFamily, `url(${fontUrl})`);
        font.load()
            .then(() => {
                document.fonts.add(font);
                setFontLoaded(true);
            })
            .catch((error) => {
                console.warn('Failed to load font:', error);
                setFontLoaded(true); // Still proceed with fallback
            });
    }, [fontUrl, fontFamily]);

    // Mouse/touch event handlers
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorRef.current.x = e.clientX;
            cursorRef.current.y = e.clientY;
        };
        
        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                cursorRef.current.x = touch.clientX;
                cursorRef.current.y = touch.clientY;
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });

        // Initialize cursor position
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            mouseRef.current.x = centerX;
            mouseRef.current.y = centerY;
            cursorRef.current.x = centerX;
            cursorRef.current.y = centerY;
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    // Resize handler
    const setSize = useCallback(() => {
        if (!containerRef.current || !titleRef.current || !fontLoaded) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        if (containerRect.width === 0 || containerRect.height === 0) return;

        // Calculate font size based on container width and text length
        let newFontSize = containerRect.width / Math.max(chars.length / 2, 1);
        newFontSize = Math.max(newFontSize, minFontSize);

        setFontSize(newFontSize);
        setScaleY(1);
        setLineHeight(1);

        // Use setTimeout instead of requestAnimationFrame for more reliable measurement
        setTimeout(() => {
            if (!titleRef.current) return;
            const textRect = titleRef.current.getBoundingClientRect();

            if (scale && textRect.height > 0 && containerRect.height > 0) {
                const yRatio = containerRect.height / textRect.height;
                setScaleY(Math.min(yRatio, 3)); // Cap the scale to prevent extreme distortion
                setLineHeight(Math.min(yRatio, 3));
            }
        }, 0);
    }, [scale, chars.length, minFontSize, fontLoaded]);

    // Resize effect
    useEffect(() => {
        setSize();
        
        const resizeObserver = new ResizeObserver(() => {
            setSize();
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        // Fallback for older browsers
        window.addEventListener('resize', setSize);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', setSize);
        };
    }, [setSize]);

    // Animation loop
    useEffect(() => {
        if (!fontLoaded) return;

        const animate = () => {
            // Smooth cursor following
            mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
            mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

            if (titleRef.current) {
                const titleRect = titleRef.current.getBoundingClientRect();
                const maxDist = Math.max(titleRect.width / 2, 1); // Prevent division by zero

                spansRef.current.forEach((span) => {
                    if (!span) return;

                    const rect = span.getBoundingClientRect();
                    if (rect.width === 0 || rect.height === 0) return; // Skip invisible elements

                    const charCenter = {
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2,
                    };

                    const d = dist(mouseRef.current, charCenter);

                    const getAttr = (distance: number, minVal: number, maxVal: number) => {
                        const normalizedDistance = Math.min(distance / maxDist, 1);
                        const val = maxVal - (maxVal - minVal) * normalizedDistance;
                        return Math.max(minVal, Math.min(maxVal, val));
                    };

                    const wdth = width ? Math.floor(getAttr(d, 5, 200)) : 100;
                    const wght = weight ? Math.floor(getAttr(d, 100, 900)) : 400;
                    const italVal = italic ? getAttr(d, 0, 1).toFixed(2) : '0';
                    const alphaVal = alpha ? getAttr(d, 0.1, 1).toFixed(2) : '1'; // Minimum opacity 0.1

                    // Batch DOM updates
                    const fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
                    
                    if (span.style.fontVariationSettings !== fontVariationSettings) {
                        span.style.fontVariationSettings = fontVariationSettings;
                    }
                    
                    if (span.style.opacity !== alphaVal) {
                        span.style.opacity = alphaVal;
                    }
                });
            }

            rafIdRef.current = requestAnimationFrame(animate);
        };

        rafIdRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
            }
        };
    }, [width, weight, italic, alpha, dist, fontLoaded]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, []);

    if (!fontLoaded) {
        return (
            <div className="relative flex items-center justify-center w-full h-full overflow-hidden bg-transparent">
                <div className="text-white opacity-50">Loading...</div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full overflow-hidden bg-transparent ${className}`}
        >
            <style>{`
                @font-face {
                    font-family: '${fontFamily}';
                    src: url('${fontUrl}') format('woff2');
                    font-display: swap;
                    font-style: normal;
                }
                
                .text-pressure-container {
                    font-feature-settings: "kern" 1;
                    text-rendering: optimizeLegibility;
                }
                
                .stroke span {
                    position: relative;
                    color: ${textColor};
                }
                
                .stroke span::after {
                    content: attr(data-char);
                    position: absolute;
                    left: 0;
                    top: 0;
                    color: transparent;
                    z-index: -1;
                    -webkit-text-stroke-width: ${Math.max(strokeWidth, 0)}px;
                    -webkit-text-stroke-color: ${strokeColor};
                    text-stroke-width: ${Math.max(strokeWidth, 0)}px;
                    text-stroke-color: ${strokeColor};
                }
                
                .text-pressure-span {
                    transition: font-variation-settings 0.1s ease-out;
                    will-change: font-variation-settings, opacity;
                }
            `}</style>

            <h1
                ref={titleRef}
                className={`text-pressure-title text-pressure-container ${flex ? 'flex justify-between' : ''} ${stroke ? 'stroke' : ''} uppercase text-center`}
                style={{
                    fontFamily: `'${fontFamily}', sans-serif`,
                    fontSize: `${fontSize}px`,
                    lineHeight,
                    transform: `scale(1, ${scaleY})`,
                    transformOrigin: 'center top',
                    margin: 0,
                    fontWeight: 100,
                    color: stroke ? 'transparent' : textColor,
                    letterSpacing: flex ? 'normal' : '0.05em',
                }}
            >
                {chars.map((char, i) => (
                    <span
                        key={`${char}-${i}`} // More stable key
                        ref={(el) => {
                            spansRef.current[i] = el;
                        }}
                        data-char={char}
                        className="inline-block text-pressure-span"
                        style={{
                            fontVariationSettings: "'wght' 400, 'wdth' 100, 'ital' 0",
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char} {/* Non-breaking space for better spacing */}
                    </span>
                ))}
            </h1>
        </div>
    );
};

export default TextPressure;