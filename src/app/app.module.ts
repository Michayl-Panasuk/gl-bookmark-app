import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BookmarkDialogComponent } from './components/bookmark-dialog/bookmark-dialog.component';
import { GroupsListComponent } from "./components/groups-list/groups-list.component";
import { DashboardComponent } from "./containers/dashboard/dashboard.component";
import { metaReducers, reducers } from "./store/reducers";
import { BookmarksListComponent } from './components/bookmarks-list/bookmarks-list.component';
import { EffectsModule } from '@ngrx/effects';
import { BookMarkEffects } from './store/bookmarks/book-mark.effects';



@NgModule({
  declarations: [AppComponent, DashboardComponent, GroupsListComponent, BookmarkDialogComponent, BookmarksListComponent],
  entryComponents: [BookmarkDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([BookMarkEffects]),
    // EffectsModule.forFeature([]),
    StoreRouterConnectingModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
