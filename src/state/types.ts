// Provides types to the state store.

// https://redux.js.org/basics/reducers#designing-the-state-shape
// In a more complex app, you're going to want different entities to reference each other.
// We suggest that you keep your state as normalized as possible, without any nesting.
// Keep every entity in an object stored with an ID as a key, and use IDs to reference it from other entities, or lists.

export interface CheckListItem {
    id: string;
    title: string;
    due?: Date;
    isDone: boolean;
}

// This is the root object of our state.
export interface CheckListState {
    items: CheckListItem[];
}

export const INITIAL_CHECKLIST: CheckListState = {
    items: [
        {
            id: "initial1",
            title: "Initial item 1",
            isDone: false
        },
        {
            id: "initial2",
            title: "Initial item 2",
            due: new Date(),
            isDone: false
        },
        {
            id: "initial3",
            title: "Initial item 3",
            isDone: true
        },
    ]
};
