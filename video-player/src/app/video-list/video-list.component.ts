import { Component, OnInit, OnDestroy } from "@angular/core";
import { VideoService } from "../services/video.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-video-list",
  templateUrl: "./video-list.component.html",
  styleUrls: ["./video-list.component.scss"],
})
export class VideoListComponent implements OnInit, OnDestroy {
  videoUrlListTemp = [];
  videoUrlListSubscription: Subscription;
  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.videoUrlListSubscription = this.videoService.videoUrlState$.subscribe(
      (res) => {
        this.videoUrlListTemp = res;
        // console.log(this.videoUrlListTemp);
      }
    );
  }

  ngOnDestroy() {
    this.videoUrlListSubscription.unsubscribe();
  }

  itemRemovedFromList(index) {
    this.videoService.removeVideoUrl(index);
  }
}
