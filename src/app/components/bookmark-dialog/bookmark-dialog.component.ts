import { Component, OnInit, Inject, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BookmarkGroup } from "src/app/store/groups/groups.model";
import { Bookmark } from "src/app/store/bookmarks/book-mark.model";

@Component({
  selector: "app-bookmark-dialog",
  templateUrl: "./bookmark-dialog.component.html",
  styleUrls: ["./bookmark-dialog.component.scss"],
})
export class BookmarkDialogComponent implements OnInit {
  @Input() bookmark?: Bookmark;
  @Input() groups: BookmarkGroup[];
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<BookmarkDialogComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      // label: ["", Validators.required],
      url: ["", Validators.required],
      group: ["", Validators.required],
    });
  }

  add() {
    if (this.form.invalid) {
       this.form.markAllAsTouched();
       this.form.markAsDirty();
       return;
    }
    this.dialogRef.close(this.form.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
