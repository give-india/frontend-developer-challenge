import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { VideoService } from "../services/video.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-video",
  templateUrl: "./video.component.html",
  styleUrls: ["./video.component.scss"],
})
export class VideoComponent implements OnInit {
  videoUrl = "";
  videoUrlListSubscription: Subscription;
  @Output() videoFinished = new EventEmitter<any>();

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.videoUrlListSubscription = this.videoService.videoUrlState$.subscribe(
      (res) => {
        this.videoUrl = res[0];
      }
    );
  }

  ngOnDestroy() {
    this.videoUrlListSubscription.unsubscribe();
  }

  videoStateChanged(state) {
    if (state.data == 0) {
      this.videoService.removeVideoUrl(0);
    }
  }

  videoLoaded(data) {
    data.target.playVideo();
  }
}
