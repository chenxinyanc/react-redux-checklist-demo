import { CheckListState, INITIAL_CHECKLIST } from './types';
import { CheckListAction, ActionType } from './actions';

// https://redux.js.org/basics/reducers#handling-actions
// The reducer is a pure function that takes the previous state and an action, and returns the next state.

// https://github.com/reduxjs/redux/issues/1960
// It seems that throwing Error in Reducer is not recommended.
// Still, we can use assertion or telemetry to tell if the action dispatcher has made some foundamental mistake.

export function checklistReducer(state: Readonly<CheckListState> | undefined, action: CheckListAction): CheckListState {
    state = state ?? INITIAL_CHECKLIST;
    switch (action.type) {
        case ActionType.ADD_ITEM:
            {
                console.assert(state.items.every(s => s.id !== action.item.id));
                return {
                    ...state,
                    items: [
                        ...state.items,
                        // Make defensive copy.
                        { ...action.item }
                    ]
                };
            }
            break;
        case ActionType.REMOVE_ITEM:
            {
                const index = state.items.findIndex(v => v.id === action.itemId);
                console.assert(index >= 0);
                if (index < 0) return state;
                const items = [...state.items];
                items.splice(index, 1);
                return {
                    ...state,
                    items
                }
            }
            break;
        case ActionType.EDIT_ITEM:
            {
                const index = state.items.findIndex(v => v.id === action.item.id);
                console.assert(index >= 0);
                if (index < 0) return state;
                const items = [...state.items];
                items[index] = { ...items[index], ...action.item };
                return {
                    ...state,
                    items
                }
            }
            break;
        case ActionType.SET_ITEMS:
            {
                return {
                    ...state,
                    // Make deep clone if necessary.
                    items: [...action.items]
                }
            }
            break;
        default:
            // Handle unknown action by returning unchanged state.
            return state;
    }
}