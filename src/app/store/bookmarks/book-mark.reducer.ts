import {
  Action,
  createReducer,
  on,
  createSelector,
  createFeatureSelector,
} from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as BookMarkActions from "./book-mark.actions";
import { Bookmark } from "./book-mark.model";

export const bookMarksFeatureKey = "bookMarks";

export interface State extends EntityState<Bookmark> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Bookmark> = createEntityAdapter<Bookmark>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
});

const _reducer = createReducer(
  initialState,
  on(BookMarkActions.addBookMarkSuccess, (state, action) =>
    adapter.addOne(action.bookMark, state)
  ),
  on(BookMarkActions.upsertBookMark, (state, action) =>
    adapter.upsertOne(action.bookMark, state)
  ),
  on(BookMarkActions.addBookMarks, (state, action) =>
    adapter.addMany(action.bookMarks, state)
  ),
  on(BookMarkActions.upsertBookMarks, (state, action) =>
    adapter.upsertMany(action.bookMarks, state)
  ),
  on(BookMarkActions.updateBookMark, (state, action) =>
    adapter.updateOne(action.bookMark, state)
  ),
  on(BookMarkActions.updateBookMarks, (state, action) =>
    adapter.updateMany(action.bookMarks, state)
  ),
  on(BookMarkActions.deleteBookMarkSuccess, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(BookMarkActions.deleteBookMarks, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(BookMarkActions.loadBookMarks, (state, action) => ({
    ...state,
    loading: false,
  })),
  on(BookMarkActions.loadBookMarksSuccess, (state, action) =>
    adapter.setAll(action.bookMarks, { ...state, loaded: true, loading: true })
  ),
  on(BookMarkActions.loadBookMarksError, (state, action) => ({
    ...state,
    loaded: true,
    loading: false,
  })),
  on(BookMarkActions.clearBookMarks, (state) => adapter.removeAll(state))
);

export function reducer(state, action) {
  return _reducer(state, action);
}

export const bookMarkSelectors = adapter.getSelectors();
