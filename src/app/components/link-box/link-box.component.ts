import { Component, OnInit, Input } from "@angular/core";
import { IVideoLink } from "src/app/interfaces/IVideoLink";
import { PlaylistService } from "src/app/services/playlist.service";
import { PlayerService } from 'src/app/services/player.service';
import { Constants } from 'src/app/utilities/constants';

@Component({
  selector: "app-link-box",
  templateUrl: "./link-box.component.html",
  styleUrls: ["./link-box.component.scss"]
})
export class LinkBoxComponent implements OnInit {
  @Input()
  videoData: IVideoLink;

  @Input()
  videoPosition: number;

  totalVideos: number;
  constructor(private playlistService: PlaylistService,private playerService: PlayerService) {
    this.totalVideos = this.playlistService.getPlaylistItemCount();
  }
  moveUp() {
    this.playlistService.moveVideoUp(this.videoPosition);
    this.playlistService.sendUpdateToPlaylist(true);
    if (this.videoPosition === 1) {
      this.playerService.sendUpdateToPlayer({
        action: Constants.ItemChange,
        value: 0
      });
    }
  }

  moveDown() {
    this.playlistService.moveVideoDown(this.videoPosition);
    this.playlistService.sendUpdateToPlaylist(true);
    if (this.videoPosition === 0) {
      this.playerService.sendUpdateToPlayer({
        action: Constants.ItemChange,
        value: 0
      });
    }
  }

  deleteVideo() {
    this.playlistService.removeVideoByIndex(this.videoPosition);
    this.playlistService.sendUpdateToPlaylist(true);
    if (this.videoPosition === 0) {
      this.playerService.sendUpdateToPlayer({
        action: Constants.ItemChange,
        value: 0
      });
    }
  }

  ngOnInit() {
  }

}
