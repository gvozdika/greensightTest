import React from 'react';
import Picture from '@standart/Picture';
import { useTheme, scale } from '@greensight/gds';

const browsers = [
    {
        name: 'Google Chrome',
        link: 'https://www.google.com/intl/ru_ru/chrome/',
        image: './chromeLogo.png',
    },
    {
        name: 'Mozilla Firefox',
        link: 'https://www.mozilla.org/ru/firefox/new/',
        image: './firefoxLogo.png',
    },
    {
        name: 'Opera',
        link: 'https://www.opera.com/ru',
        image: './operaLogo.png',
    },
    {
        name: 'Edge',
        link: 'https://www.microsoft.com/ru-ru/edge',
        image: './edgeLogo.png',
    },
];

const UnsupportedBrowsers = () => {
    const { colors } = useTheme();
    return (
        <div css={{ padding: `${scale(4)}px ${scale(1)}px`, textAlign: 'center' }}>
            <h1>Ваш браузер устарел</h1>
            <p css={{ marginTop: scale(2), marginBottom: scale(2) }}>
                Для быстрой и стабильной работы рекомендуем установить последнюю версию одного из этих браузеров:
            </p>
            <div>
                {browsers?.map(b => (
                    <a
                        target="_blank"
                        rel="noreferrer noopener nofollow"
                        href={b.link}
                        css={{
                            padding: `${scale(4)}px ${scale(3)}px`,
                            ':hover': { color: colors?.success },
                        }}
                        key={b.name}
                    >
                        <img
                            src={b.image}
                            alt={b.name}
                            css={{
                                width: scale(10),
                                height: scale(10),
                                textAlign: 'center',
                                margin: 'auto',
                                display: 'block',
                            }}
                        />
                        <p css={{ marginTop: scale(1) }}>{b.name}</p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default UnsupportedBrowsers;
