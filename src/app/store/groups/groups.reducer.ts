import { BookmarkGroup } from './groups.model';
import { createReducer } from '@ngrx/store';

export interface State {
  entities: BookmarkGroup[];
}

export const initialState: State = {
  entities: [
    {
      label: 'Work',
      key: 'work',
    },
    {
      label: 'Leisure',
      key: 'leisure',
    },
    {
      label: 'Home',
      key: 'home',
    },
  ],
};

const _reducer = createReducer(initialState);

export function reducer(state, action) {
  return _reducer(state, action);
}
