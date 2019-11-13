import { createStore } from 'redux';
import { checklistReducer } from './reducer';
import { INITIAL_CHECKLIST } from './types';

export const store = createStore(checklistReducer, INITIAL_CHECKLIST);
