import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Constants } from "./utilities/constants";
import { PlaylistService } from "./services/playlist.service";
import { PlayerService } from "./services/player.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(translate: TranslateService, private playlistService: PlaylistService, private playerService: PlayerService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang("en");

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use("en");
    window.addEventListener("storage", (event) => {
      if (event.key === Constants.LinksStorageKey) {
        this.playlistService.sendUpdateToPlaylist(true);
        this.playerService.sendUpdateToPlayer({
          action: Constants.RefreshPlayer,
          value: 0
        });
      }
    });
  }
}
