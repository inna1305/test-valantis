import {IFilterValue, IItem} from '../../../types.ts';

export interface IReducerState {
    items: IItem[];
    currentPage: number;
    nextButtonIsActive: boolean,
    filter: IFilterValue | null,
}

export interface IReducerAction {
    type: Action;
    items: IItem[],
    currentPage: number;
    nextButtonIsActive: boolean,
    filter?: IFilterValue | null,
}

export enum Action {
    setItems = 'set_items',
    setItemsByFilter = 'set_filter',
    resetFilters = 'reset_filters',
}

export const initialState: IReducerState = {items: [], filter: null, nextButtonIsActive: false, currentPage: 1};

export function reducer(state: IReducerState, action: IReducerAction): IReducerState {
    switch (action.type) {
        case Action.setItems: {
            return {
                ...state,
                filter: null,
                items: action.items,
                currentPage: action.currentPage,
                nextButtonIsActive: action.nextButtonIsActive
            }
        }
        case Action.setItemsByFilter: {
            const newFilter: IFilterValue = {
                filterType: action.filter!.filterType,
                value: action.filter!.value
            }
            return {
                ...state,
                filter: newFilter,
                items: action.items,
                currentPage: action.currentPage,
                nextButtonIsActive: action.nextButtonIsActive
            }
        }
        case Action.resetFilters: {
            return {
                ...state,
                items: action.items,
                filter: null,
                currentPage: action.currentPage,
                nextButtonIsActive: action.nextButtonIsActive
            }
        }
    }
    throw Error('Unknown action: ' + action.type);
}
