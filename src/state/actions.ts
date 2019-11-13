import { CheckListItemState } from './types';

// Action names

export enum ActionType {
    ADD_ITEM = 'CheckList/ADD_ITEM',
    EDIT_ITEM = 'CheckList/EDIT_ITEM',
    REMOVE_ITEM = 'CheckList/REMOVE_ITEM',
    SET_ITEMS = 'CheckList/SET_ITEMS'
}

// Action data structures.

export interface AddItemAction {
    type: ActionType.ADD_ITEM;
    item: Readonly<CheckListItemState>;
}

export interface RemoveItemAction {
    type: ActionType.REMOVE_ITEM;
    itemId: string;
}

export interface EditItemAction {
    type: ActionType.EDIT_ITEM;
    item: Readonly<Partial<CheckListItemState> & Pick<CheckListItemState, 'id'>>;
}

export interface SetItemsAction {
    type: ActionType.SET_ITEMS;
    items: Iterable<Readonly<CheckListItemState>>;
}

export type CheckListAction = AddItemAction | RemoveItemAction | EditItemAction | SetItemsAction;

// Action creators.
// https://redux.js.org/basics/actions#action-creators
// Action creators can also be asynchronous and have side-effects.

export function addItem(item: CheckListItemState | Omit<CheckListItemState, 'id'>): AddItemAction {
    if (!('id' in item)) {
        item = { ...item, id: (Date.now() * 1000 + Math.round(Math.random() * 1000)).toString(36) };
    }
    return { type: ActionType.ADD_ITEM, item };
}

export function removeItem(itemId: string): RemoveItemAction {
    return { type: ActionType.REMOVE_ITEM, itemId };
}

export function editItem(item: EditItemAction['item']): EditItemAction {
    return { type: ActionType.EDIT_ITEM, item };
}

export function setItems(items: Iterable<Readonly<CheckListItemState>>): SetItemsAction {
    return { type: ActionType.SET_ITEMS, items };
}

export function clearItems(): SetItemsAction {
    return { type: ActionType.SET_ITEMS, items: [] };
}
