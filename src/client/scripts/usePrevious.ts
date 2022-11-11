import { useRef, useEffect } from 'react';

const usePrevious = <T>(value: T) => {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};

export default usePrevious;
