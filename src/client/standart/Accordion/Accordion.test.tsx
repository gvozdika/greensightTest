import React from 'react';
import { render, screen, fireEvent } from '@test-utils';
import Accordion from '.';

test('content should be in document', () => {
    const title = 'Title 1';
    const text = 'Panel';
    const hiddenText = 'Collapsed panel';

    render(
        <Accordion preExpanded={['0']}>
            <Accordion.Item uuid={'0'}>
                <Accordion.Heading>
                    <Accordion.Button>{title}</Accordion.Button>
                </Accordion.Heading>
                <Accordion.Panel>{text}</Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item uuid={'1'}>
                <Accordion.Heading>
                    <Accordion.Button>Title 2</Accordion.Button>
                </Accordion.Heading>
                <Accordion.Panel>{hiddenText}</Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );

    const testTitle = screen.getByText(title);
    const testText = screen.getByText(text);
    const testHiddenText = screen.getByText(hiddenText);
    expect(testTitle).toBeInTheDocument();
    expect(testText).toBeInTheDocument();
    expect(testHiddenText).not.toBeVisible();
});

test('height animation should work', () => {
    const title = 'Title 1';

    render(
        <Accordion animationType="height">
            <Accordion.Item>
                <Accordion.Heading>
                    <Accordion.Button>{title}</Accordion.Button>
                </Accordion.Heading>
                <Accordion.Panel>Panel 1</Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Heading>
                    <Accordion.Button>Title 2</Accordion.Button>
                </Accordion.Heading>
                <Accordion.Panel>Panel 2</Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );

    const button = screen.getByText(title);
    fireEvent.click(button);
    const transition = screen.getByText('Panel 1').parentElement;
    expect(transition).toHaveStyle(`transition: height ease 300ms; height: 0px;`);
    fireEvent.click(button);
    expect(transition).toHaveStyle(`height: 0px;`);
});

test('fadeIn animation should work', () => {
    const title = 'Title 1';

    render(
        <Accordion animationType="fadeIn" transitionTimeout={600} transitionTimeoutExit={0}>
            <Accordion.Item>
                <Accordion.Heading>
                    <Accordion.Button>{title}</Accordion.Button>
                </Accordion.Heading>
                <Accordion.Panel>Panel 1</Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Heading>
                    <Accordion.Button>Title 2</Accordion.Button>
                </Accordion.Heading>
                <Accordion.Panel>Panel 2</Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
    const button = screen.getByText(title);

    fireEvent.click(button);
    const transition = screen.getByText('Panel 1').parentElement;
    expect(transition).toHaveStyle(`animation: fade-in 600ms ease;`);
    fireEvent.click(button);
});

test('custom animation should work', () => {
    const title = 'Title 1';

    render(
        <Accordion
            animationType="custom"
            onEnter={instance => {
                instance.style.transition = `transform ease 600ms`;
                instance.style.transform = `scale(0,0)`;
            }}
            onEntering={instance => {
                instance.style.transform = `scale(1,1)`;
            }}
            onExit={instance => {
                instance.style.transform = `scale(0,0)`;
            }}
        >
            <Accordion.Item>
                <Accordion.Heading>
                    <Accordion.Button>{title}</Accordion.Button>
                </Accordion.Heading>
                <Accordion.Panel>Panel 1</Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );

    const button = screen.getByText(title);
    fireEvent.click(button);
    const transition = screen.getByText('Panel 1').parentElement;
    expect(transition).toHaveStyle(`transition: transform ease 600ms; transform: scale(1,1);`);
    fireEvent.click(button);
    expect(transition).toHaveStyle(`transform: scale(0,0);`);
});

test('empty custom animation', () => {
    const title = 'Title 1';

    render(
        <Accordion animationType="custom">
            <Accordion.Item>
                <Accordion.Heading>
                    <Accordion.Button>{title}</Accordion.Button>
                </Accordion.Heading>
                <Accordion.Panel>Panel 1</Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );

    const button = screen.getByText(title);
    fireEvent.click(button);
    const transition = screen.getByText('Panel 1').parentElement;
    expect(transition).toBeVisible();
    fireEvent.click(button);
});

test('should throw error', () => {
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => undefined);

    const incorrectUsing = () => {
        return render(<Accordion.Panel>Panel 1</Accordion.Panel>);
    };

    expect(incorrectUsing).toThrowError('This component must be used within a <Accordion> component');

    spy.mockRestore();
});
