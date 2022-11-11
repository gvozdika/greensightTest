import React, { useState, useEffect } from 'react';
import { Swiper, Navigation, Pagination, A11y, Autoplay, EffectFade, Lazy, Keyboard } from 'swiper/js/swiper.esm';
import CustomSwiper from 'react-id-swiper/lib/ReactIdSwiper.custom';
import { GetSwiper, ReactIdSwiperProps, ReactIdSwiperChildren, SwiperInstance } from 'react-id-swiper';
import { useTheme, scale } from '@greensight/gds';
import 'swiper/css/swiper.css';
import CarouselItem, { CarouselItemProps } from './Item';
import ArrowLeftIcon from '@svg/arrow-left.svg';
import ArrowRightIcon from '@svg/arrow-right.svg';

export interface CarouselCompositionProps {
    Item: React.FC<CarouselItemProps>;
}

export interface CarouselProps extends Omit<ReactIdSwiperProps, 'navigation' | 'pagination'> {
    /** List of slides */
    children: ReactIdSwiperChildren;
    /** Enable navigation */
    navigation?: boolean;
    /** Enable pagination */
    pagination?: boolean;
    /** Images lazy loading */
    lazy?: boolean;
    /** Swiper state setter for external state usage */
    setSwiper?: GetSwiper;
    /** Centered mode */
    centeredMode?: boolean;
}

export const Carousel: React.FC<CarouselProps> & CarouselCompositionProps = ({
    children,
    navigation,
    pagination,
    lazy,
    setSwiper,
    ...props
}) => {
    const [instance, setInstance] = useState<SwiperInstance | null>(null);

    const { colors } = useTheme();

    useEffect(() => {
        if (setSwiper) setSwiper(instance);
        if (instance) {
            instance.$wrapperEl.on('keydown keyup', (e: KeyboardEvent) => {
                if (e.keyCode == 9) {
                    const slide = document.activeElement?.closest('.swiper-slide');
                    const activeSlideIndex = slide?.parentNode && [...slide.parentNode.children].indexOf(slide);
                    const carousel = instance.$el[0];

                    carousel.scrollLeft = 0;

                    if (activeSlideIndex) instance.slideTo(activeSlideIndex);
                }
            });
        }
    }, [instance, setSwiper]);

    const swiperProps: ReactIdSwiperProps = {
        a11y: {
            prevSlideMessage: 'Предыдущий слайд',
            nextSlideMessage: 'Следующий слайд',
            firstSlideMessage: 'Первый слайд',
            lastSlideMessage: 'Последний слайд',
            paginationBulletMessage: 'Перейти к слайду {{index}}',
        },
        grabCursor: true,
        watchOverflow: true,
    };

    const params = {
        Swiper,
        modules: [Navigation, Pagination, A11y, Autoplay, EffectFade, Lazy, Keyboard],
        ...swiperProps,
    };

    if (navigation) {
        params.navigation = {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        };
        const buttonCSS = {
            width: scale(4),
            height: '100%',
            marginTop: 0,
            transform: 'translateY(-50%)',
            fill: colors?.white,
            transition: 'fill ease 300ms',
            '&.swiper-button-disabled': {
                opacity: 0.5,
            },
            ':focus': {
                outline: 'none',
            },
            '::after': {
                content: 'none',
            },
            '.js-focus-visible &.focus-visible:focus': {
                fill: colors?.black,
            },
        };
        params.renderPrevButton = () => (
            <button type="button" className="swiper-button-prev" css={{ ...buttonCSS, left: 0 }}>
                <ArrowLeftIcon title="Предыдущий слайд" />
            </button>
        );
        params.renderNextButton = () => (
            <button type="button" className="swiper-button-next" css={{ ...buttonCSS, right: 0 }}>
                <ArrowRightIcon title="Следующий слайд" />
            </button>
        );
    }

    if (pagination) {
        params.pagination = {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        };
    }

    if (lazy) {
        params.lazy = {
            loadPrevNext: true,
            loadOnTransitionStart: true,
        };
        params.preloadImages = false;
    }

    const carouselCSS = {
        width: scale(75),
        maxWidth: '100%',
        '.swiper-pagination-bullets': {
            display: 'flex',
            justifyContent: 'center',
            height: scale(4),
            bottom: 0,
        },
        '.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet': {
            margin: 0,
        },
        '.swiper-pagination-bullet': {
            flexShrink: 0,
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: scale(4),
            height: '100%',
            borderRadius: 0,
            verticalAlign: 'middle',
            background: 'none',
            opacity: 1,
        },
        '.swiper-pagination-bullet::after': {
            content: '""',
            width: scale(2),
            height: scale(2),
            borderRadius: '50%',
            backgroundColor: colors?.white,
            opacity: 0.5,
        },
        '.swiper-pagination-bullet-active::after': {
            opacity: 1,
        },
        '.swiper-pagination-bullet:focus': {
            outlineOffset: -2,
        },
    };

    return (
        <div css={carouselCSS}>
            <CustomSwiper getSwiper={setInstance} {...params} {...props}>
                {children}
            </CustomSwiper>
        </div>
    );
};

Carousel.Item = CarouselItem;

export default Carousel;
