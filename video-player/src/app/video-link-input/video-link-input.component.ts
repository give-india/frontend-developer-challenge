import { Component, OnInit } from "@angular/core";
import { VideoService } from "../services/video.service";
@Component({
  selector: "app-video-link-input",
  templateUrl: "./video-link-input.component.html",
  styleUrls: ["./video-link-input.component.scss"],
})
export class VideoLinkInputComponent implements OnInit {
  videoUrl: string = "";

  constructor(private videoservice: VideoService) {}

  ngOnInit() {}

  urlEntered() {
    // Add only if it's a valid expression
    if (this.verifyUrl(this.videoUrl)) {
      this.videoUrl = "";
    } else {
      // Show Error
    }
  }

  verifyUrl(str) {
    let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let matchedArr = str.match(regExp);

    if (matchedArr && matchedArr[2].length == 11) {
      // Add this video ID to the videoList
      this.videoservice.addVideoUrl(matchedArr[2]);
      return true;
    } else {
      return false;
    }
  }
}
