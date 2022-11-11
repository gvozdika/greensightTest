import React from 'react';
import { scale } from '@greensight/gds';
import Loader from '@standart/Loader';

export interface LoadWrapperProps extends React.HTMLProps<HTMLDivElement> {
    /** Wrapped component */
    children: React.ReactNode;
    /** Loading state */
    isLoading: boolean;
    /** Error text */
    error: string | undefined;
    /** Empty result state */
    isEmpty?: boolean;
    /** Empty result text */
    emptyMessage?: React.ReactNode;
}

const LoadWrapper = ({ children, isLoading, error, isEmpty, emptyMessage, ...props }: LoadWrapperProps) => {
    return (
        <div {...props}>
            {isLoading && <Loader css={{ margin: `${scale(3)}px auto` }} />}
            {!isLoading && error && <div>{error}</div>}
            {!isLoading && !error && isEmpty && emptyMessage}
            {!isLoading && !error && !isEmpty && children}
        </div>
    );
};

export default LoadWrapper;
