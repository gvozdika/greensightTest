import menuIcons from '@scripts/menuIcons';

export default [
    {
        id: 1,
        text: 'Каталог',
        link: '/catalog',
        Icon: menuIcons.package,
        subMenu: [
            {
                id: 1,
                text: 'Товары',
                subMenu: [
                    { id: 1, text: 'В продаже', active: true, link: '/catalog/sale' },
                    { id: 2, text: 'В продакшн' },
                    { id: 3, text: 'На модерации', link: '/catalog/moder' },
                ],
            },
            {
                id: 2,
                text: 'Товарные группы',
            },
            {
                id: 3,
                text: 'Импорт',
                subMenu: [
                    { id: 1, text: 'В продаже импорт', active: true, link: '/import/sale' },
                    { id: 2, text: 'В продакшн импорт' },
                    { id: 3, text: 'На модерации импорт', link: '/import/moder' },
                ],
            },
        ],
    },
    {
        id: 2,
        text: 'Заказы',
        link: '/orders',
        Icon: menuIcons.cart,
        subMenu: [
            { id: 1, text: 'Новые заказы' },
            { id: 2, text: 'test 2' },
            { id: 3, text: 'test 3' },
        ],
    },
    {
        id: 3,
        text: 'Заявки',
        link: '/requests',
        Icon: menuIcons.trello,
    },
    {
        id: 4,
        text: 'Контент',
        link: '/',
        Icon: menuIcons.image,
        subMenu: [
            { id: 1, text: 'Товары' },
            { id: 2, text: 'test 3' },
            { id: 3, text: 'test 4' },
        ],
    },
    { id: 5, text: 'Логистика', link: '/', Icon: menuIcons.truck },
    { id: 6, text: 'Склады', link: '/', Icon: menuIcons.package },
    { id: 7, text: 'Клиенты', link: '/', Icon: menuIcons.users },
    { id: 8, text: 'Реферальные партнеры', link: '/', Icon: menuIcons.globe },
    { id: 9, text: 'Мерчанты', link: '/', Icon: menuIcons.award },
    { id: 10, text: 'Маркетинг', link: '/', Icon: menuIcons.birka },
    { id: 11, text: 'Товары', link: '/', Icon: menuIcons.message },
];
