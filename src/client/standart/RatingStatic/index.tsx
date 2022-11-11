import * as React from 'react';
import { useTheme, scale, VisuallyHidden } from '@greensight/gds';
import Star from '@svg/star.svg';

export interface RatingStaticProps extends React.HTMLProps<HTMLDivElement> {
    /** Rating value */
    value: number;
    /** Alternative text */
    status: string;
    /** Maximum value. Defines icons count */
    max?: number;
    /** Custom icon */
    Icon?: SVGRIcon;
}

const RatingStatic = ({ value, status, max = 5, Icon = Star, ...props }: RatingStaticProps) => {
    const { colors } = useTheme();
    const iconSize = scale(4);

    return (
        <div {...props}>
            {[...new Array(max).keys()].map((_, index) => {
                const isPartiallyFilled = index + 1 === Math.floor(value) + 1 && value % 1 !== 0;
                const trimmedValue = Number((value - Math.floor(value)).toFixed(2));
                return (
                    <div
                        key={index}
                        css={{ position: 'relative', display: 'inline-block', ...(index && { marginLeft: scale(1) }) }}
                    >
                        <Icon
                            css={{
                                width: iconSize,
                                height: iconSize,
                                fill: index + 1 <= value ? colors?.brandSecond : colors?.grey40,
                            }}
                        />
                        {isPartiallyFilled && (
                            <div
                                css={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    overflow: 'hidden',
                                    width: trimmedValue * iconSize,
                                }}
                            >
                                <Icon css={{ width: iconSize, height: iconSize, fill: colors?.brandSecond }} />
                            </div>
                        )}
                        <VisuallyHidden>{status}</VisuallyHidden>
                    </div>
                );
            })}
        </div>
    );
};

export default RatingStatic;
