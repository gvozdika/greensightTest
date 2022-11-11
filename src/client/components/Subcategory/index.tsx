import React from 'react';
import { typography, scale, Layout } from '@greensight/gds';
import ProductCard, { ProductCardProps } from '@components/ProductCard';

export interface SubcategoryProps {
    name: string;
    products: Omit<ProductCardProps, 'onAddToCart'>[];
    onAddToCart: ProductCardProps['onAddToCart'];
}

const Subcategory = ({ name, products, onAddToCart }: SubcategoryProps) => {
    return (
        <section>
            <h2 css={{ ...typography('h2'), marginBottom: scale(2) }}>{name}</h2>
            <Layout auto={scale(25)}>
                {products.map(product => (
                    <Layout.Item key={product.id}>
                        <ProductCard {...product} onAddToCart={onAddToCart} />
                    </Layout.Item>
                ))}
            </Layout>
        </section>
    );
};

export default Subcategory;
