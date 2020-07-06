import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Bookmark } from "./book-mark.model";
import {
  loadBookMarks,
  upsertBookMarks,
  loadBookMarksSuccess,
  loadBookMarksError,
  addBookMark,
  addBookMarkSuccess,
  deleteBookMarkSuccess,
  deleteBookMark,
} from "./book-mark.actions";
import {
  switchMap,
  map,
  catchError,
  withLatestFrom,
  tap,
} from "rxjs/operators";
import { BookMarksService } from "src/app/services/book-marks.service";
import { Store } from "@ngrx/store";
import { bookmarkSelectors } from "src/app/store/selectors";
import { AppState } from "../reducers";

@Injectable()
export class BookMarkEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private bookmarksService: BookMarksService
  ) {}

  @Effect()
  getBookmarks$ = this.actions$.pipe(
    ofType(loadBookMarks),
    switchMap((action) =>
      this.bookmarksService.fetchBookmarks$().pipe(
        map((bookmarks) =>
          loadBookMarksSuccess({
            bookMarks: bookmarks || [
              new Bookmark(
                "https://material.angular.io/components/list/overview",
                "work"
              ),
            ],
          })
        )
      )
    )
  );

  @Effect()
  addBookmark$ = this.actions$.pipe(
    ofType(addBookMark),
    withLatestFrom(this.store$.select(bookmarkSelectors.selectAllBookmarks)),
    switchMap(([action, bookmarks]) =>
      this.bookmarksService
        .saveBookmarks$([...bookmarks, action.bookMark])
        .pipe(map(() => addBookMarkSuccess({ bookMark: action.bookMark })))
    )
  );

  @Effect()
  deleteBookmark$ = this.actions$.pipe(
    ofType(deleteBookMark),
    withLatestFrom(this.store$.select(bookmarkSelectors.selectAllBookmarks)),
    switchMap(([action, bookmarks]) =>
      this.bookmarksService
        .saveBookmarks$(bookmarks.filter((_) => _.id === action.id))
        .pipe(
          map(() => {
            return deleteBookMarkSuccess({ id: action.id });
          })
        )
    )
  );
}
