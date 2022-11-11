const mock = async <T>({
    time = 500,
    data,
}: {
    time?: number;
    data?: T;
} = {}) => {
    await new Promise(resolve => setTimeout(resolve, time));
    return { data };
};

export default mock;

export const mockSearchResultItems = [
    {
        name: 'Крупа ячменная',
        image: 'https://placehold.it/48x48',
        price: '199',
        link: '/product/krupa-yachmennaya',
    },
    {
        category: 'Клиенты',
        name: 'Клиентская база',
        link: '/clients',
    },
    {
        name: 'Крупа пшеничная',
        image: 'https://placehold.it/48x48',
        price: '55.2',
        link: '/product/krupa-yachmennaya',
    },
    {
        category: 'Справочники',
        name: 'Категории',
        link: '/spravochnik',
    },
    {
        name: 'Андрей Сергеевич Попов',
        category: 'Контакты',
        link: '/product/krupa-yachmennaya',
    },
    {
        name: 'Василий Петрович Попов',
        category: 'Контакты',
        link: '/contacts',
    },
    {
        name: 'Иван Иванович Иванов',
        category: 'Контакты',
        link: '/contacts',
    },
    {
        category: 'Клиенты',
        name: 'Клиентская база',
        link: '/clients',
    },
    {
        name: 'Рис цельнозерненый',
        image: 'https://placehold.it/48x48',
        price: '88.34',
        link: '/product/krupa-yachmennaya',
    },
    {
        category: 'Клиенты',
        name: 'Клиентская база',
        link: '/clients',
    },
];
