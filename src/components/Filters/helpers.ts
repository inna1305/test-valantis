import {FilterType, IFilterValue} from '../../types.ts';

export const validatePrice = (input: string) => {
    if (typeof input !== 'string') {
        return false;
    }
    const isNumeric = /^\d+$/.test(input);

    const number = parseInt(input, 10);
    const isInRange = !isNaN(number) && number > 0 && number <= 10000000;

    return isNumeric && isInRange;
}

export const getDataForRequest = (type: FilterType, data: string | number): IFilterValue => {
    return {
        filter: type,
        value: data
    };
}