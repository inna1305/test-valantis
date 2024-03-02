import {IItem} from '../../types.ts';

export const getUniqueItems = (items: IItem[]): IItem[] => {
    if (items.length === 0) {
        return [];
    }
    const uniqIds = new Set<string>();
    const result: IItem[] = [];
    items.forEach((item) => {
        if (uniqIds.has(item.id)) {
            return;
        }
        uniqIds.add(item.id);
        result.push(item);
    });
    return result;
};

