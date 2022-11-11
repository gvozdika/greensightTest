export const columns = [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: '',
        accessor: 'photo',
        getProps: () => ({ type: 'photo' }),
    },
    {
        Header: 'Название, артикул',
        accessor: 'titleAndCode',
        getProps: () => ({ type: 'double' }),
    },
    {
        Header: 'Бренд',
        accessor: 'brand',
    },
    {
        Header: 'Категория',
        accessor: 'category',
    },
    {
        Header: 'Создано',
        accessor: 'created',
        getProps: () => ({ type: 'date' }),
    },
    {
        Header: 'Цена, ₽',
        accessor: 'cost',
        getProps: () => ({ type: 'cost' }),
    },
    {
        Header: 'Кол-во',
        accessor: 'count',
    },
    {
        Header: 'Статус',
        accessor: 'status',
        getProps: () => ({ type: 'status' }),
    },
    {
        Header: 'В архиве',
        accessor: 'archive',
        getProps: () => ({ type: 'status' }),
    },
];
