import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IVideoLink } from "src/app/interfaces/IVideoLink";
import { PlaylistService } from "src/app/services/playlist.service";

@Component({
  selector: "app-playlist",
  templateUrl: "./playlist.component.html",
  styleUrls: ["./playlist.component.scss"]
})
export class PlaylistComponent implements OnInit {
  subscription: Subscription;
  videos: IVideoLink[] = [];
  constructor(private playlistService: PlaylistService) {
    this.subscription = this.playlistService.updatePlaylist().subscribe(update => {
      this.loadData();
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.videos = JSON.parse(localStorage.links);
  }

}
