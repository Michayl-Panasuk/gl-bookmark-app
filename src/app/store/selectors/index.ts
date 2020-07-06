import * as fromRouter from "@ngrx/router-store";
import { AppState } from "../reducers";
import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromBookmarks from "../bookmarks/book-mark.reducer";
import { State as GroupsState } from "../groups/groups.reducer";
import { Bookmark } from "../bookmarks/book-mark.model";

export const selectRouter = createFeatureSelector<
  fromRouter.RouterReducerState<any>
>("router");

export const bookmarksSliceSelector = createFeatureSelector<
  fromBookmarks.State
>("bookmarks");
export const groupsSliceSelector = createFeatureSelector<GroupsState>("groups");

export const {
  selectCurrentRoute,
  selectQueryParams,
  selectQueryParam,
  selectRouteParams,
  selectRouteParam,
  selectRouteData,
  selectUrl,
} = fromRouter.getSelectors(selectRouter);

const selectAllGroups = createSelector(
  groupsSliceSelector,
  (groupSlice) => groupSlice.entities
);

export const groupsSelector = {
  selectAll: selectAllGroups,
  selectedGroup: createSelector(
    selectAllGroups,
    selectQueryParam("group"),
    (groups, qParam) => {
      return groups.find((_) => _.key === qParam) || undefined;
    }
  ),
};

const selectBookmarkIds = createSelector(
  bookmarksSliceSelector,
  fromBookmarks.bookMarkSelectors.selectIds
);
const selectBookmarkEntities = createSelector(
  bookmarksSliceSelector,
  fromBookmarks.bookMarkSelectors.selectEntities
);
const selectAllBookmarks = createSelector(
  bookmarksSliceSelector,
  fromBookmarks.bookMarkSelectors.selectAll
);

const selectBookmarkTotal = createSelector(
  bookmarksSliceSelector,
  fromBookmarks.bookMarkSelectors.selectTotal
);

const selectBookmarkLoaded = createSelector(
  bookmarksSliceSelector,
  (slice) => slice.loaded
);

const selectBookmarkLoading = createSelector(
  bookmarksSliceSelector,
  (slice) => slice.loading
);

function termChecker(bookmark: Bookmark, term: string) {
  return bookmark.url.includes(term);
}

function groupChecker(bookmark: Bookmark, group: string) {
  return bookmark.group === group;
}

const selectFilteredBookmarks = createSelector(
  selectAllBookmarks,
  selectQueryParam("group"),
  selectQueryParam("search"),
  (bookMarks, group, searchTerm) => {
    if (group || searchTerm) {
      const checkers = [];
      group && checkers.push((item) => groupChecker(item, group));
      searchTerm && checkers.push((item) => termChecker(item, searchTerm));

      return bookMarks.filter((_) => checkers.every((checker) => checker(_)));
    }
    return bookMarks;
  }
);

export const bookmarkSelectors = {
  selectBookmarkIds,
  selectBookmarkEntities,
  selectAllBookmarks,
  selectFilteredBookmarks,
  selectBookmarkLoading,
  selectBookmarkLoaded,
  selectBookmarkTotal
};
