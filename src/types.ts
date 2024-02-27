export interface IItem {
    brand: string | null,
    id: string,
    price: number,
    product: string
}

export interface IResponseItems {
    result: IItem[];
}

export interface IFilterValue {
    filter: FilterType,
    value: string
}

export enum FilterType {
    product = 'product',
    brand = 'brand',
    price = 'price'
}
