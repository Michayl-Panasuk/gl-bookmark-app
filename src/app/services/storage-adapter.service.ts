import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import localForage from "localforage";

@Injectable({
  providedIn: "root",
})
export class StorageAdapterService {
  constructor() {}

  getItem$<T>(key: string): Observable<T> {
    return from(localForage.getItem<T>(key));
  }

  setItem$<T>(key: string, payload: T): Observable<T> {
    return from(localForage.setItem<T>(key, payload));
  }
}
