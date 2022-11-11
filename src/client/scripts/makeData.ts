const getRandomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

const newTableItem = (id: number) => {
    return {
        id: `2003${id}`,
        photo: getRandomItem(['https://spoonacular.com/cdn/ingredients_100x100/apple.jpg', '']),
        titleAndCode: getRandomItem([
            ['Бургер из свинины и говядины «ПРОМАГРО», охлажденный, 200 г', 4650096570695],
            ['Бургер из свинины и говядины', 4650096570695],
        ]),
        brand: getRandomItem(['ПРОМАГРО', 'Мираторг']),
        category: 'Полуфабрикаты мясные, фарш',
        created: new Date(),
        cost: 199838,
        count: getRandomItem([15, 32, 64, 71, 86, 43, 25, 13]),
        status: 'Согласовано',
        archive: getRandomItem(['Да', 'Нет']),
    };
};

export default (len: number) => [...Array(len).keys()].map(el => newTableItem(el));
