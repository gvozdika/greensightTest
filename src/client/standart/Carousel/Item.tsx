import React from 'react';
import { useTheme, scale } from '@greensight/gds';
import typography from '@scripts/typography';

export interface CarouselItemProps extends React.HTMLProps<HTMLDivElement> {
    /** Slide content */
    children: React.ReactNode;
}

export const CarouselItem = ({ children, ...props }: CarouselItemProps) => {
    const { colors } = useTheme();

    return (
        <div
            className="swiper-slide"
            css={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: scale(63),
                maxWidth: '100%',
                height: scale(75),
                color: colors?.white,
                ...typography('headline'),
                '&:nth-of-type(odd)': {
                    backgroundColor: colors?.brand,
                },
                '&:nth-of-type(even)': {
                    backgroundColor: colors?.brandSecond,
                },
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default CarouselItem;
