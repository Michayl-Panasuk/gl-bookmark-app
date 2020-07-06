import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from "@angular/core";
import { BookmarkGroup } from "src/app/store/groups/groups.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-groups-list",
  templateUrl: "./groups-list.component.html",
  styleUrls: ["./groups-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GroupsListComponent implements OnInit {
  @Input() items: BookmarkGroup[];
  @Input() selectedItem: BookmarkGroup;
  constructor(private router: Router) {}

  ngOnInit() {}

  get selectedKey() {
    return (this.selectedItem && this.selectedItem.key) || null;
  }

  onItemClick(item: BookmarkGroup) {
    this.router.navigate([], {
      queryParams: { group: item.key !== this.selectedKey ? item.key : null },
      queryParamsHandling: "merge",
    });
  }
}
