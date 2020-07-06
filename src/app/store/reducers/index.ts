import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";
import { environment } from "../../../environments/environment";
import {
  reducer as bookmarksReducer,
  State as BookMarksState,
} from "../bookmarks/book-mark.reducer";
import {
  reducer as groupsReducer,
  State as GroupsState,
} from "../groups/groups.reducer";

import * as fromRouter from "@ngrx/router-store";

export interface AppState {
  bookmarks: BookMarksState;
  groups: GroupsState;
  router: fromRouter.RouterReducerState<any>;
}

export const reducers: ActionReducerMap<AppState> = {
  bookmarks: bookmarksReducer,
  groups: groupsReducer,
  router: fromRouter.routerReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
