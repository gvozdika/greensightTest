/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, EffectCallback } from 'react';

const useMount = (effect: EffectCallback) => {
    useEffect(effect, []);
};

export default useMount;
