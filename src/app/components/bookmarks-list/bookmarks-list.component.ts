import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Bookmark } from "src/app/store/bookmarks/book-mark.model";

@Component({
  selector: "app-bookmarks-list",
  templateUrl: "./bookmarks-list.component.html",
  styleUrls: ["./bookmarks-list.component.scss"],
})
export class BookmarksListComponent implements OnInit {
  @Input() items: Bookmark[];
  @Output() delete = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  onDelete(id: string, event: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.delete.emit(id);
  }
}
