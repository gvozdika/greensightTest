import React, { useRef, useEffect, useCallback, useState } from 'react';
import { CSSObject } from '@emotion/core';
import 'lazysizes';
import { toArray } from '@scripts/helpers';

interface ResponsiveImage {
    /** Width descriptors */
    srcSet: string;
    /** Fallback image (max size recommended) */
    src: string;
}

interface LazyProps {
    /** Placeholder from image-trace-loader */
    trace?: string;
}

interface LazyImage extends LazyProps {
    /** Image */
    src: string;
}

interface LazyResponsiveImage extends LazyProps {
    /** Image */
    src: ResponsiveImage;
}

type IImage = string | ResponsiveImage | LazyImage | LazyResponsiveImage;

interface Media {
    /** Image */
    image: IImage;
    /** Minimum image width */
    width: number;
}

export interface PictureProps extends Omit<React.HTMLProps<HTMLImageElement>, 'media' | 'crossOrigin'> {
    /** Image */
    image: IImage;
    /** Alt text (a11y) */
    alt: string;
    /** WebP format support (production only by default) */
    webp?: boolean;
    /** Art direction settings */
    media?: Media | Media[];
    /** Lazy loading */
    lazy?: boolean;
    /** Sizes attribute */
    sizes?: string;
    /** Imitation of background image (object-fit) */
    bg?: boolean;
    /** Carousel specific lazy loading (swiper lazy) */
    carousel?: boolean;
    /** Image real width for space reserve with lazy loading */
    width?: number;
    /** Image real height for space reserve with lazy loading  */
    height?: number;
}

const Picture = ({
    image,
    alt = '',
    webp = process.env.NODE_ENV === 'production',
    media,
    lazy,
    carousel,
    sizes,
    bg,
    width = 16,
    height = 9,
    ...props
}: PictureProps) => {
    const [showImage, setShowImage] = useState(!lazy);
    const pictureRef = useRef<HTMLPictureElement>(null);

    const onPictureLoad = useCallback(() => {
        if (lazy) setShowImage(true);
    }, [lazy]);

    useEffect(() => {
        const picture = pictureRef.current;
        if (picture) {
            picture.addEventListener('lazyloaded', onPictureLoad);
        }
        return () => {
            if (picture) picture.removeEventListener('lazyloaded', onPictureLoad);
        };
    }, [pictureRef, onPictureLoad]);

    const lazyCSS: CSSObject = {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        objectFit: 'cover',
        objectPosition: 'center center',
        transition: 'opacity 500ms ease',
    };

    return (
        <div css={{ position: 'relative' }}>
            {lazy && (
                <>
                    <div css={{ width: '100%', paddingBottom: `${(width / height) * 100}%` }} />
                    <img
                        src={getPlaceholder(image)}
                        alt=""
                        aria-hidden
                        css={{ ...lazyCSS, opacity: Number(!showImage) }}
                    />
                </>
            )}
            <picture css={{ display: 'block', ...(bg && { height: '100%' }) }} ref={pictureRef}>
                {media &&
                    toArray(media).map((mediaItem: Media) => (
                        <React.Fragment key={mediaItem.width}>
                            {webp && (
                                <source
                                    type="image/webp"
                                    media={`(min-width: ${mediaItem.width}px)`}
                                    srcSet={getSrc(mediaItem.image, true)}
                                    data-srcset={lazy ? changeFormatToWebp(getImageSource(mediaItem.image)) : undefined}
                                    // sizes={
                                    //     mediaItem.image.sizes && isResponsiveLazy(mediaItem.image) ? mediaItem.sizes : undefined
                                    // }
                                    // data-sizes={
                                    //     lazy && isResponsiveLazy(mediaItem.image) && !mediaItem.sizes ? 'auto' : undefined
                                    // }
                                />
                            )}
                            <source
                                media={`(min-width: ${mediaItem.width}px)`}
                                srcSet={getSrc(mediaItem.image, false)}
                                data-srcset={lazy ? getImageSource(mediaItem.image) : undefined}
                                // sizes={mediaItem.sizes && isResponsiveLazy(mediaItem.image) ? mediaItem.sizes : undefined}
                                // data-sizes={
                                //     lazy && isResponsiveLazy(mediaItem.image) && !mediaItem.sizes ? 'auto' : undefined
                                // }
                            />
                        </React.Fragment>
                    ))}
                {webp && (
                    <source
                        type="image/webp"
                        srcSet={getSrc(image, true)}
                        data-srcset={lazy ? changeFormatToWebp(getImageSource(image)) : undefined}
                        sizes={sizes && isResponsiveLazy(image) ? sizes : undefined}
                        data-sizes={lazy && isResponsiveLazy(image) && !sizes ? 'auto' : undefined}
                    />
                )}
                <img
                    src={!isResponsive(image) ? getSrc(image, false) : image.src}
                    data-src={lazy && !isResponsiveLazy(image) ? getImageSource(image) : undefined}
                    srcSet={isResponsiveLazy(image) ? getSrc(image, false) : undefined}
                    data-srcset={lazy && isResponsiveLazy(image) ? getImageSource(image) : undefined}
                    sizes={sizes && isResponsiveLazy(image) ? sizes : undefined}
                    data-sizes={lazy && isResponsiveLazy(image) && !sizes ? 'auto' : undefined}
                    // width={width}
                    // height={height}
                    alt={alt}
                    className={lazy ? (carousel ? 'swiper-lazy' : 'lazyload') : undefined}
                    css={{
                        display: 'block',
                        ...(bg && {
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: '50% 50%',
                        }),
                        ...(lazy && { ...lazyCSS, opacity: Number(showImage) }),
                    }}
                    {...props}
                />
            </picture>
        </div>
    );
};

const isResponsiveLazy = (image: IImage): image is LazyResponsiveImage =>
    typeof image !== 'string' && typeof image.src !== 'string' && image.src.srcSet !== undefined;

const isSimpleLazy = (image: IImage): image is LazyImage =>
    typeof image !== 'string' && 'trace' in image && typeof image.src === 'string';

const isResponsive = (image: IImage): image is ResponsiveImage =>
    typeof image !== 'string' && !isResponsiveLazy(image) && !isSimpleLazy(image);

const changeFormatToWebp = (str: string | undefined) => (str ? str.replace(/\.(jpe?g|png)/g, '.webp') : undefined);

const getPlaceholder = (image: IImage) => (isSimpleLazy(image) || isResponsiveLazy(image) ? image.trace : undefined);

const getImageSource = (image: IImage) => {
    let imageSource;

    if (typeof image === 'string') {
        imageSource = image;
    } else if (typeof image.src === 'string') {
        imageSource = image.src;
    } else if (isResponsiveLazy(image)) {
        imageSource = image.src.srcSet;
    }

    return imageSource;
};

const getSrc = (image: IImage, webp: boolean) => {
    let src;

    if (webp) {
        const source = getImageSource(image);
        if (source) src = changeFormatToWebp(source);
    } else {
        src = getImageSource(image);
    }

    return src;
};

export default Picture;
