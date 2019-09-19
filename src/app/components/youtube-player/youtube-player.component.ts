import { Component, OnInit } from "@angular/core";
import { PlaylistService } from "src/app/services/playlist.service";
import { IVideoLink } from "src/app/interfaces/IVideoLink";
import { Subscription } from 'rxjs';
import { IPlayerCommunication } from 'src/app/interfaces/IPlayerCommunication';
import { PlayerService } from 'src/app/services/player.service';
import { Constants } from 'src/app/utilities/constants';

@Component({
  selector: "app-youtube-player",
  templateUrl: "./youtube-player.component.html",
  styleUrls: ["./youtube-player.component.scss"]
})
export class YoutubePlayerComponent implements OnInit {
  subscription : Subscription;
  constructor(private playlistService: PlaylistService, private playerService: PlayerService) {
    this.subscription = this.playerService.updatePlayer().subscribe((update) => {
      this.parseActionFromCommunicator(update);
    });
  }
  player: YT.Player;
  totalVideos = 0;
  id = "";
  ngOnInit() {
    this.initializePlayer();
  }

  initializePlayer() {
    if (!this.playlistService.isPlaylistEmpty()) {
      const video: IVideoLink = this.playlistService.getNextVideo();
      this.id = video.id;
      this.totalVideos = this.playlistService.getVideos().length;
    }
  }

  savePlayer(player) {
    this.player = player;
    player.playVideo();
  }

  onStateChange(event) {
    if (event.data === 0) {
      this.playlistService.removeVideoByIndex(0);
      if (!this.playlistService.isPlaylistEmpty()) {
        this.playNext();
        this.playlistService.sendUpdateToPlaylist(true);
      }
    }
  }

  playNext() {
    const video: IVideoLink = this.playlistService.getNextVideo();
    this.player.loadVideoById(video.id);
    this.totalVideos = this.playlistService.getVideos().length;
  }

  parseActionFromCommunicator(params: IPlayerCommunication){
    switch (params.action) {
      case Constants.NewItemAdded:
        if (this.playlistService.getPlaylistItemCount() === 1) {
          this.initializePlayer();
        }
        break;
      case Constants.ItemChange:
        this.totalVideos = this.playlistService.getVideos().length;
        if (this.totalVideos !== 0) {
          this.player.loadVideoById(this.playlistService.getVideoByIndex(params.value).id);
        }
        break;
      case Constants.RefreshPlayer:
        this.totalVideos = this.playlistService.getVideos().length;
        if (this.totalVideos !== 0) {
          this.player.loadVideoById(this.playlistService.getVideoByIndex(0).id);
        }
        break;
    }
  }

}
