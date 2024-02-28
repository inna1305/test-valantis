import {md5} from 'js-md5';
import axios, {AxiosResponse} from 'axios';
import {IFilterValue} from '../types.ts';
import getTimestamp from '../helpers/getTimestamp.ts';


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


export const getIds = (page: number, filterObj: IFilterValue | null): Promise<AxiosResponse> => {
    const currentOffset = page * PRODUCTS_PER_PAGE;
    let data;
    if (filterObj) {
        data = getReqBodyToFilteredIds(filterObj);
    } else {
        data = getReqBodyToIds(currentOffset, PRODUCTS_PER_PAGE);
    }

    const result: Promise<AxiosResponse> = axios.post(URL, data, {headers});
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

export const getProducts = (ids: string[]): Promise<AxiosResponse> => {
    const data = {
        action: 'get_items',
        'params': {'ids': ids}
    }
    const result = axios.post(URL, data, {headers});
    return result;
}
