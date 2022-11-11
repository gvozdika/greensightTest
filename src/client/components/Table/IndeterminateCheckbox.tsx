import React, { useEffect, forwardRef, Ref, useRef } from 'react';
import Checkbox from '@standart/Checkbox';

export interface IndeterminateCheckboxProps {
    indeterminate?: boolean;
    id: string;
}

const useCombinedRefs = (...refs: any[]): React.MutableRefObject<any> => {
    const targetRef = React.useRef();

    useEffect(() => {
        refs.forEach(ref => {
            if (!ref) return;

            if (typeof ref === 'function') {
                ref(targetRef.current);
            } else {
                ref.current = targetRef.current;
            }
        });
    }, [refs]);

    return targetRef;
};

const IndeterminateCheckbox = forwardRef<HTMLInputElement, IndeterminateCheckboxProps>(
    ({ indeterminate, ...rest }, ref: Ref<HTMLInputElement>) => {
        const defaultRef = useRef(null);
        const combinedRef = useCombinedRefs(ref, defaultRef);

        useEffect(() => {
            if (combinedRef?.current) {
                combinedRef.current.indeterminate = indeterminate ?? false;
            }
        }, [combinedRef, indeterminate]);

        return <Checkbox name={`checkbox-${rest.id}`} innerRef={combinedRef} {...rest} />;
    }
);

export default IndeterminateCheckbox;
