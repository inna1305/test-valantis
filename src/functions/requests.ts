import {md5} from 'js-md5';
import axios from 'axios';
import {IFilterValue, IResponseItems} from '../types.ts';
import getTimestamp from '../helpers/getTimestamp.ts';

interface IResponseIds {
    result: string[];
}

const URL = 'http://api.valantis.store:40000/';
const PASSWORD = 'Valantis';
const PRODUCTS_PER_PAGE = 50;

const getAuthKey = () => {
    const stamp = getTimestamp();
    return md5(`${PASSWORD}_${stamp}`);
}

const headers = {
    'X-Auth': getAuthKey(),
    'Content-Type': 'application/json'
};

export const getIds = (page: number, filterObj: IFilterValue | null): Promise<IResponseIds[]> => {
    const currentOffset = page * PRODUCTS_PER_PAGE;
    let data;
    if (filterObj) {
        data = getReqBodyToFilteredIds(filterObj);
    } else {
        data = getReqBodyToIds(currentOffset, PRODUCTS_PER_PAGE);
    }

    const result: Promise<IResponseIds[]> = axios.post(URL, data, {headers});
    return result;
}

const getReqBodyToIds = (offset: number, limit: number) => {
    const data = {
        'action': 'get_ids',
        'params': {'offset': offset, 'limit': limit + 1}
    }
    return data;
}

const getReqBodyToFilteredIds = (filterData: IFilterValue) => {
    const data = {
        'action': 'filter',
        'params': {[filterData.filter]: filterData.value}
    }
    return data;
}

export const getProducts = (ids: string[]): Promise<IResponseItems[]> => {
    const data = {
        action: 'get_items',
        'params': {'ids': ids}
    }
    const result: Promise<IResponseItems[]> = axios.post(URL, data, {headers});
    return result;
}
