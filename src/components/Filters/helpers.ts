import {FilterType, IFilterValue} from '../../types.ts';

export const validatePrice = (input: string) => {
    const isNumeric = /^\d+$/.test(input);
    const number = parseInt(input, 10);
    const isInRange = !isNaN(number) && number > 0 && number <= 10000000;
    return isNumeric && isInRange;
}

export const getDataForRequest = (type: FilterType, data: string): IFilterValue => {
    let currentData: string | number = data;
    if (type === FilterType.price) {
        currentData = Number(data);
    }
    return {
        filterType: type,
        value: currentData
    };
}

export const validateData = (typeOfData: FilterType, value: string): string => {
    if (value.length === 0) {
        return 'Пожалуйста, введите значение';
    }
    if (typeOfData === FilterType.price) {
        if (!validatePrice(value)) {
            return 'Пожалуйста, введите корректное число';
        }
    }
    return '';
}

