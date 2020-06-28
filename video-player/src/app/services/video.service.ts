import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class VideoService {
  videoUrlList = [];
  videoUrlState = new BehaviorSubject(this.videoUrlList);

  constructor() {}

  addVideoUrl(url) {
    this.videoUrlList = [...this.videoUrlList, url];
    this.videoUrlState.next(this.videoUrlList);
  }

  removeVideoUrl(index) {
    this.videoUrlList = this.videoUrlList.filter((val, i) => {
      return i != index;
    });
    this.videoUrlState.next(this.videoUrlList);
  }

  modifyVideoUrlList(list) {
    this.videoUrlList = list;
    this.videoUrlState.next(this.videoUrlList);
  }

  // Getters
  get videoUrlState$() {
    return this.videoUrlState.asObservable();
  }
}
