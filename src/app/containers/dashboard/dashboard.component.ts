import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription, combineLatest } from "rxjs";
import { BookmarkGroup } from "src/app/store/groups/groups.model";
import { Bookmark } from "src/app/store/bookmarks/book-mark.model";
import { Store, select } from "@ngrx/store";
import {
  bookmarkSelectors,
  groupsSelector,
  selectQueryParam,
} from "src/app/store/selectors";
import { AppState } from "src/app/store/reducers";
import { FormControl } from "@angular/forms";
import { take, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Router } from "@angular/router";
import { MatDialogModule, MatDialog } from "@angular/material/dialog";
import * as BookMarkActions from "src/app/store/bookmarks/book-mark.actions";
import { BookmarkDialogComponent } from "src/app/components/bookmark-dialog/bookmark-dialog.component";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  groups$: Observable<BookmarkGroup[]>;
  selectedGroup$: Observable<BookmarkGroup>;
  bookmarks$: Observable<Bookmark[]>;
  filteredBookmarks$: Observable<Bookmark[]>;

  searchTermControl = new FormControl("");

  readonly s = new Subscription();
  constructor(
    private store: Store<AppState>,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.store.dispatch(BookMarkActions.loadBookMarks());
    this.store
      .pipe(select(selectQueryParam("search"), take(1)))
      .subscribe((v) => this.searchTermControl.patchValue(v));
    this.groups$ = this.store.select(groupsSelector.selectAll);
    this.selectedGroup$ = this.store.select(groupsSelector.selectedGroup);
    this.filteredBookmarks$ = this.store.select(
      bookmarkSelectors.selectFilteredBookmarks
    );

    this.s.add(
      this.searchTermControl.valueChanges
        .pipe(debounceTime(100), distinctUntilChanged())
        .subscribe((v) =>
          this.router.navigate([], {
            queryParams: { search: v },
            queryParamsHandling: "merge",
          })
        )
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onBookmarkAdd() {
    this.groups$.pipe(take(1)).subscribe((g) => {
      const dialogRef = this.dialog.open(BookmarkDialogComponent);
      dialogRef.componentInstance.groups = g;

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.store.dispatch(
            BookMarkActions.addBookMark({
              bookMark: new Bookmark(result.url, result.group),
            })
          );
        }
      });
    });
  }

  onBookmarkDelete(id: string) {
    this.store.dispatch(BookMarkActions.deleteBookMark({ id }));
  }
}
