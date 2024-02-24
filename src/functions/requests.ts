import {md5} from 'js-md5';
import axios from 'axios';
import {IResponseIds} from '../App.tsx';
import {IResponseItems} from '../types.ts';
import getTimestamp from '../helpers/getTimestamp.ts';

const URL = 'http://api.valantis.store:40000/';
const PASSWORD = 'Valantis';
const PRODUCTS_PER_PAGE = 50;

export const getAuthKey = () => {
    const stamp = getTimestamp();
    return md5(`${PASSWORD}_${stamp}`);
}

export const getIds = (page: number): Promise<IResponseIds[]> => {
    const currentOffset = page * PRODUCTS_PER_PAGE;
    const headers = {
        'X-Auth': getAuthKey(),
        'Content-Type': 'application/json'
    };
    const data = {
        action: 'get_ids',
        'params': {'offset': currentOffset, 'limit': PRODUCTS_PER_PAGE+1}
    }
    const result: Promise<IResponseIds[]> = axios.post(URL, data, {headers});
    return result;
}

export const getProducts = (ids: string[]): Promise<IResponseItems[]> => {
    const headers = {
        'X-Auth': getAuthKey(),
        'Content-Type': 'application/json'
    };
    const data = {
        action: 'get_items',
        'params': {'ids': ids}
    }
    const result: Promise<IResponseItems[]> = axios.post(URL, data, {headers});
    return result;
}
