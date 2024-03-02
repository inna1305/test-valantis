import {IFilterValue, IItem} from '../types.ts';

export interface IReducerState {
    items: IItem[];
    currentPage: number;
    nextButtonIsActive: boolean,
    filter: IFilterValue | null
}

export interface IReducerAction {
    type: Action;
    items?: IItem[],
    currentPage?: number;
    nextButtonIsActive?: boolean,
    filter?: IFilterValue | null
}

export enum Action {
    setItems = 'set_items',
    stepForward = 'step_forward',
    stepBack = 'step_back',
    setFilter = 'set_filter',
    resetFilters = 'reset_filters',
}

export const initialState: IReducerState = {items: [], filter: null, nextButtonIsActive: false, currentPage: 1};

export function reducer(state: IReducerState, action: IReducerAction): IReducerState {
    switch (action.type) {
        case Action.setItems: {
            return {
                ...state,
                filter: null,
                items: action.items!,
                currentPage: action.currentPage!,
                nextButtonIsActive: action.nextButtonIsActive!
            }
        }
        case Action.setFilter: {
            const newFilter: IFilterValue = {
                filterType: state.filter!.filterType,
                value: state.filter!.value
            }
            const newItems = [...state.items];
            return {
                ...state,
                filter: newFilter,
                items: newItems,
                currentPage: 1,
                nextButtonIsActive: state.nextButtonIsActive
            }
        }
        case Action.resetFilters: {
            const newItems = [...state.items];
            return {
                ...state,
                items: newItems,
                filter: null,
                currentPage: 1,
                nextButtonIsActive: state.nextButtonIsActive
            }
        }
        case Action.stepForward: {
            const newItems = [...state.items];
            return {
                ...state,
                items: newItems,
                currentPage: state.currentPage + 1,
                nextButtonIsActive: state.nextButtonIsActive
            };
        }
        case Action.stepBack: {
            //обработать currentPage === 1
            const newItems = [...state.items];
            return {
                ...state,
                items: newItems,
                currentPage: state.currentPage - 1,
                nextButtonIsActive: state.nextButtonIsActive
            };
        }
    }
    throw Error('Unknown action: ' + action.type);
}
