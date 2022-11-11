import React from 'react';
import { useTheme, typography, scale, Button } from '@greensight/gds';
import Picture from '@standart/Picture';
import PlusIcon from '@svg/plus.svg';

export interface ProductCardProps {
    id: number;
    name: string;
    image: string;
    price: number;
    onAddToCart: (id: number) => void;
}

const ProductCard = ({ id, name, image, price, onAddToCart }: ProductCardProps) => {
    const { colors } = useTheme();

    return (
        <article css={{ border: `2px solid ${colors?.black}`, padding: `${scale(1)}px ${scale(2)}px` }}>
            <p css={{ ...typography('title'), marginBottom: scale(1) }}>{name}</p>
            <Picture image={image} alt={name} css={{ marginBottom: scale(1), img: { margin: '0 auto' } }} />
            <p css={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong css={typography('title')}>{price} ₽</strong>
                <Button size="sm" onClick={() => onAddToCart(id)} Icon={PlusIcon} hidden>
                    Добавить {name} в корзину
                </Button>
            </p>
        </article>
    );
};

export default ProductCard;
