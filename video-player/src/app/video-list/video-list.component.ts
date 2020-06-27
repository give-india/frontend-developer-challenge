import { Component, OnInit } from "@angular/core";
import { VideoService } from "../services/video.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-video-list",
  templateUrl: "./video-list.component.html",
  styleUrls: ["./video-list.component.scss"],
})
export class VideoListComponent implements OnInit {
  videoUrlListTemp = [];
  videoUrlListSubscription: Subscription;
  constructor(private videoservice: VideoService) {}

  ngOnInit() {
    this.videoUrlListSubscription = this.videoservice.videoUrlState$.subscribe(
      (res) => {
        this.videoUrlListTemp = res;
        // console.log(this.videoUrlListTemp);
      }
    );
  }
}
