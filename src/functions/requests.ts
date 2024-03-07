import {md5} from 'js-md5';
import axios from 'axios';
import {IFilterValue, IItem} from '../types.ts';
import getTimestamp from '../helpers/getTimestamp.ts';
import {retryOnError} from '../helpers/retryRequest.ts';

const URL = 'https://api.valantis.store:41000/';
const PASSWORD = 'Valantis';
export const PRODUCTS_PER_PAGE = 50;

const getAuthKey = () => {
    const stamp = getTimestamp();
    return md5(`${PASSWORD}_${stamp}`);
}

const headers = {
    'X-Auth': getAuthKey(),
    'Content-Type': 'application/json'
};

export const getIds = async (page: number, filterObj: IFilterValue | null): Promise<string[]> => {
    const currentOffset = page * PRODUCTS_PER_PAGE;
    let body;
    if (filterObj) {
        body = getReqBodyToFilteredIds(filterObj);
    } else {
        body = getReqBodyToIds(currentOffset, PRODUCTS_PER_PAGE);
    }

    const result = await axios.post(URL, body, {headers});
    return result.data.result.slice(0, PRODUCTS_PER_PAGE);
}

export const getItems = async (ids: string[]): Promise<IItem[]> => {
    const data = {
        action: 'get_items',
        'params': {'ids': ids}
    }
    const result = await axios.post(URL, data, {headers});
    return result.data.result;
}

export const fetchData = async (currentPage: number, filterObj: IFilterValue | null): Promise<IItem[]> => {
    try {
        const ids = await retryOnError(() => getIds(currentPage, filterObj));
        return await retryOnError(() => getItems(ids));
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getReqBodyToIds = (offset: number, limit: number) => {
    return {
        'action': 'get_ids',
        'params': {'offset': offset, 'limit': limit}
    }
}

const getReqBodyToFilteredIds = (filterData: IFilterValue) => {
    return {
        'action': 'filter',
        'params': {[filterData.filterType]: filterData.value}
    }
}


