interface SortItem {
    title: string;
    value: string;
}

interface FiltItem {
    title: string;
    value: string;
}

export const SortItems: SortItem[] = [
    { title: 'Сначала популярные', value: 'popular' },
    { title: 'Сначала дешевые', value: 'asc' },
    { title: 'Сначала дорогие', value: 'desc' },
    { title: 'По рейтингу', value: 'rate' },
];

export const FilterItems: FiltItem[] = [
    { title: 'Все', value: 'all' },
    { title: 'Флагманы', value: 'flagman' },
    { title: 'Средний сегмент', value: 'middle' },
    { title: 'Бюджетные', value: 'budget' },
];
