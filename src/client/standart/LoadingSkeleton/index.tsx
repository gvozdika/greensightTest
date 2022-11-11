import React from 'react';
import { useTheme } from '@greensight/gds';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export interface SkeletonProps {
    height: number;
    width?: number;
    count?: number;
    duration?: number;
    circle?: boolean;
}

const LoadingSkeleton = ({ height, width, count, duration, circle }: SkeletonProps) => {
    const { colors } = useTheme();

    return (
        <SkeletonTheme color={colors?.grey90} highlightColor={colors?.grey60}>
            <Skeleton height={height} width={width} count={count} duration={duration} circle={circle} />
        </SkeletonTheme>
    );
};

export default LoadingSkeleton;
