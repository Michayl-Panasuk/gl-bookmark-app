import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Bookmark } from './book-mark.model';

export const loadBookMarks = createAction(
  '[BookMark] Load BookMarks'
);

export const loadBookMarksSuccess = createAction(
  '[BookMark] Load BookMarks Success',
  props<{ bookMarks: Bookmark[] }>()
);

export const loadBookMarksError = createAction(
  '[BookMark] Load BookMarks Error'
);


export const addBookMark = createAction(
  '[BookMark] Add BookMark',
  props<{ bookMark: Bookmark }>()
);

export const addBookMarkSuccess = createAction(
  '[BookMark] Add BookMark Success',
  props<{ bookMark: Bookmark }>()
);

export const upsertBookMark = createAction(
  '[BookMark] Upsert BookMark',
  props<{ bookMark: Bookmark }>()
);

export const addBookMarks = createAction(
  '[BookMark] Add BookMarks',
  props<{ bookMarks: Bookmark[] }>()
);


export const upsertBookMarks = createAction(
  '[BookMark] Upsert BookMarks',
  props<{ bookMarks: Bookmark[] }>()
);

export const updateBookMark = createAction(
  '[BookMark] Update BookMark',
  props<{ bookMark: Update<Bookmark> }>()
);

export const updateBookMarks = createAction(
  '[BookMark] Update BookMarks',
  props<{ bookMarks: Update<Bookmark>[] }>()
);

export const deleteBookMark = createAction(
  '[BookMark] Delete BookMark',
  props<{ id: string }>()
);

export const deleteBookMarkSuccess = createAction(
  '[BookMark] Delete BookMark Success',
  props<{ id: string }>()
);

export const deleteBookMarks = createAction(
  '[BookMark] Delete BookMarks',
  props<{ ids: string[] }>()
);

export const clearBookMarks = createAction(
  '[BookMark] Clear BookMarks'
);
