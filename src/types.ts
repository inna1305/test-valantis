export interface IFilterValue {
    filter: FilterType,
    value: string | number
}

export enum FilterType {
    product = 'product',
    brand = 'brand',
    price = 'price'
}

export interface IItem {
    brand: string | null,
    id: string,
    price: number,
    product: string
}
