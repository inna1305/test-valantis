import {IItem} from '../../types.ts';

export const getUniqueItems = (items: IItem[]): IItem[] => {
    if (items.length === 0) {
        return [];
    }
    const notUniq: IItem[] = [];
    const uniqIds = new Set<string>();
    const result: IItem[] = [];
    items.forEach((item) => {
        if (uniqIds.has(item.id)) {
            notUniq.push(item);
            return;
        }
        uniqIds.add(item.id);
        result.push(item);
    });
    return result;
};

