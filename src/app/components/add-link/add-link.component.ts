import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ApiService } from "src/app/services/api.service";
import { ToastrService } from "ngx-toastr";
import { PlaylistService } from "src/app/services/playlist.service";
import { PlayerService } from 'src/app/services/player.service';
import { Constants } from 'src/app/utilities/constants';

@Component({
  selector: "app-add-link",
  templateUrl: "./add-link.component.html",
  styleUrls: ["./add-link.component.scss"]
})
export class AddLinkComponent implements OnInit {
  constructor(private apiService: ApiService,
              private toastr: ToastrService,
              private playlistService: PlaylistService,
              private playerService: PlayerService) {}
  youtubeLink: string;
  processing = false;
  ngOnInit() {
  }

  addLink(form: NgForm) {
    if (form.valid) {
      this.apiService.addLink(this.youtubeLink.trim()).then((successMessage) => {
        this.toastr.success("", successMessage);
        this.youtubeLink = "";
        this.playlistService.sendUpdateToPlaylist(true);
        this.playerService.sendUpdateToPlayer({
          action: Constants.NewItemAdded,
          value: 0
        });
      }, (errorMessage) => {
          this.toastr.error("", errorMessage);
      });
    }
  }
}
