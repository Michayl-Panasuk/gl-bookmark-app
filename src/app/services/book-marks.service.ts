import { Injectable } from "@angular/core";
import { StorageAdapterService } from "./storage-adapter.service";
import { Observable } from "rxjs";
import { take, tap, switchMap } from "rxjs/operators";
import { Bookmark } from '../store/bookmarks/book-mark.model';

const bookmarkKey = "bookmark_app";
@Injectable({
  providedIn: "root",
})
export class BookMarksService {
  constructor(private storage: StorageAdapterService) {}

  saveBookmarks$(bookmarks: Bookmark[]) {
    return this.storage.setItem$(bookmarkKey, bookmarks);
  }

  fetchBookmarks$(): Observable<Bookmark[]> {
    return this.storage.getItem$(bookmarkKey);
  }
}
