import {md5} from 'js-md5';
import axios from 'axios';
import {IItem} from '../types.ts';
import getTimestamp from '../helpers/getTimestamp.ts';


const URL = 'http://api.valantis.store:40000/';
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

export const getIds = async (page: number): Promise<string[]> => {
    const body = getReqBodyToIds(page, PRODUCTS_PER_PAGE);
    const result = await axios.post(URL, body, {headers});
    return result.data.result;
}

export const fetchData = async (currentPage: number): Promise<IItem[]> => {
    try {
        const ids = await retryOnError(() => getIds(currentPage));
        const items = await retryOnError(() => getItems(ids));
        return items;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const retryOnError = async (fn: () => Promise<any>, retries = 3): Promise<any> => {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            console.error(`Attempt ${i + 1} failed. Retrying...`);
        }
    }
    throw new Error('All attempts failed');
}


// export const getIds = async (page: number, filterObj: IFilterValue | null): Promise<string[]> => {
//     const currentOffset = page * PRODUCTS_PER_PAGE;
//     let data;
//     if (filterObj) {
//         data = getReqBodyToFilteredIds(filterObj);
//     } else {
//         data = getReqBodyToIds(currentOffset, PRODUCTS_PER_PAGE);
//     }
//
//     const result = await axios.post(URL, data, {headers});
//     return result.data;
// }

const getReqBodyToIds = (offset: number, limit: number) => {
    const data = {
        'action': 'get_ids',
        'params': {'offset': offset, 'limit': limit}
    }
    return data;
}

// const getReqBodyToFilteredIds = (filterData: IFilterValue) => {
//     const data = {
//         'action': 'filter',
//         'params': {[filterData.filterType]: filterData.value}
//     }
//     return data;
// }

export const getItems = async (ids: string[]): Promise<IItem[]> => {
    const data = {
        action: 'get_items',
        'params': {'ids': ids}
    }
    const result = await axios.post(URL, data, {headers});
    return result.data.result;
}
