import { CheckListItem } from './types';

// Action names

export enum ActionType {
    ADD_ITEM = "ADD_ITEM",
    EDIT_ITEM = "EDIT_ITEM",
    REMOVE_ITEM = "REMOVE_ITEM",
    SET_ITEMS = "SET_ITEMS"
}

// Action data structures.

export interface AddItemAction {
    type: ActionType.ADD_ITEM;
    item: Readonly<CheckListItem>;
}

export interface RemoveItemAction {
    type: ActionType.REMOVE_ITEM;
    itemId: string;
}

export interface EditItemAction {
    type: ActionType.EDIT_ITEM;
    item: Readonly<Partial<CheckListItem> & Pick<CheckListItem, "id">>;
}

export interface SetItemsAction {
    type: ActionType.SET_ITEMS;
    items: Iterable<Readonly<CheckListItem>>;
}

export type CheckListAction = AddItemAction | RemoveItemAction | EditItemAction | SetItemsAction;

// Action creators.
// https://redux.js.org/basics/actions#action-creators
// Action creators can also be asynchronous and have side-effects.

export function addItem(item: CheckListItem): AddItemAction {
    return { type: ActionType.ADD_ITEM, item };
}

export function removeItem(itemId: string): RemoveItemAction {
    return { type: ActionType.REMOVE_ITEM, itemId };
}

export function editItem(item: EditItemAction['item']): EditItemAction {
    return { type: ActionType.EDIT_ITEM, item };
}

export function setItems(items: Iterable<Readonly<CheckListItem>>): SetItemsAction {
    return { type: ActionType.SET_ITEMS, items };
}

export function clearItems(): SetItemsAction {
    return { type: ActionType.SET_ITEMS, items: [] };
}
