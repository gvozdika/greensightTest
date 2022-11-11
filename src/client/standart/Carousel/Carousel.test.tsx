import React, { useState } from 'react';
import { render, screen, fireEvent } from '@test-utils';
import Carousel from '.';
import Picture from '@standart/Picture';
import { SwiperInstance } from 'react-id-swiper';
import cat1 from '@images/simple/cat_1.jpg';
import cat2 from '@images/simple/cat_2.jpg';
import cat3 from '@images/simple/cat_3.jpg';

test('content should render', () => {
    render(
        <Carousel>
            <Carousel.Item>Slide 1</Carousel.Item>
            <Carousel.Item>Slide 2</Carousel.Item>
            <Carousel.Item>Slide 3</Carousel.Item>
        </Carousel>
    );

    const title = screen.getByText('Slide 1');

    expect(title).toBeInTheDocument();
});

test('navigation should render', () => {
    const { container } = render(
        <Carousel navigation>
            <Carousel.Item>Slide 1</Carousel.Item>
            <Carousel.Item>Slide 2</Carousel.Item>
            <Carousel.Item>Slide 3</Carousel.Item>
        </Carousel>
    );

    const navButton = container.querySelector('.swiper-button-next');
    expect(navButton).toBeInTheDocument();
});

test('pagination should render', () => {
    const { container } = render(
        <Carousel pagination>
            <Carousel.Item>Slide 1</Carousel.Item>
            <Carousel.Item>Slide 2</Carousel.Item>
            <Carousel.Item>Slide 3</Carousel.Item>
        </Carousel>
    );

    const pagination = container.querySelector('.swiper-pagination');
    expect(pagination).toBeInTheDocument();
});

test('carousel with images', () => {
    render(
        <Carousel lazy>
            <Carousel.Item>
                <Picture image={cat1} alt="Cat 1" lazy carousel />
            </Carousel.Item>
            <Carousel.Item>
                <Picture image={cat2} alt="Cat 2" lazy carousel />
            </Carousel.Item>
            <Carousel.Item>
                <Picture image={cat3} alt="Cat 3" lazy carousel />
            </Carousel.Item>
        </Carousel>
    );

    const image = screen.getAllByRole('img')[0];
    expect(image).toHaveAttribute('src');
});

test('carousel with links should slide with TAB', () => {
    const { container } = render(
        <Carousel>
            <Carousel.Item>
                <a href="/">Link 1</a>
            </Carousel.Item>
            <Carousel.Item>
                <a href="/">Link 2</a>
            </Carousel.Item>
        </Carousel>
    );
    const carousel = container.querySelector('.swiper-container') as any;
    const firstLink = screen.getByText('Link 1');
    const secondLink = screen.getByText('Link 2');
    const tab = {
        key: 'Tab',
        keyCode: 9,
    };

    if (carousel) {
        firstLink.focus();
        fireEvent.keyDown(firstLink, tab);
        secondLink.focus();
        fireEvent.keyDown(secondLink, tab);
        fireEvent.keyDown(secondLink, {
            key: 'Enter',
            keyCode: 13,
        });
    }

    expect(carousel?.swiper.activeIndex).toBe(1);
});

test('carousel with outside controls', () => {
    const Example = () => {
        const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
        const goNext = () => {
            swiper?.slideNext();
        };
        const goPrev = () => {
            swiper?.slidePrev();
        };
        return (
            <>
                <button onClick={goPrev}>Prev</button>
                <button onClick={goNext}>Next</button>
                <Carousel setSwiper={setSwiper}>
                    <Carousel.Item>Slide 1</Carousel.Item>
                    <Carousel.Item>Slide 2</Carousel.Item>
                </Carousel>
            </>
        );
    };

    const { container } = render(<Example></Example>);

    const carousel = container.querySelector('.swiper-container') as any;
    const prevButton = screen.getByText('Prev');
    const nextButton = screen.getByText('Next');

    fireEvent.click(nextButton);
    expect(carousel?.swiper.activeIndex).toBe(1);
    fireEvent.click(prevButton);
    expect(carousel?.swiper.activeIndex).toBe(0);
});
