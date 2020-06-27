import { Component, OnInit } from "@angular/core";
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
}
