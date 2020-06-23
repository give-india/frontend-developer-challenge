import { Subject } from 'rxjs';
import { PlayerService } from './services/player.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'frontend-developer-challenge';
  showPlayer = false;
  width = window.innerWidth > 760 ? window.innerWidth * 0.60 : window.innerWidth * 0.75;
  height = window.innerHeight * 0.6;
  destroy$: Subject<boolean> = new Subject<boolean>();
  videoId = '';
  playlist: string[] = [];
  constructor(private player: PlayerService) {

  }

  ngOnInit(): void {

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.playlist = this.player.loadPlaylist();
    if (this.playlist.length > 0) {
      this.videoId = this.playlist[0];
      this.showPlayer = true;
    }
    this.player.playListUpdated().pipe(
      takeUntil(this.destroy$)
    ).subscribe((play: string[]) => {
      if (this.showPlayer === false && play.length > 0) {
        this.playlist = [...play];
        this.videoId = this.playlist[0];
        this.showPlayer = true;
      } else if (this.showPlayer === true && play.length === 0) {
        this.playlist = [];
        this.showPlayer = false;
      }
      this.playlist = [...play];
      if (this.playlist.length > 0) {
        this.videoId = this.playlist[0];
      }
    });


  }
  updatePaylist(playlist: string[]) {
    this.playlist = this.player.updatePlaylist(playlist);

  }
  stateChange(event) {
    if (event.data === 0) {
      this.playlist = this.player.updatePlaylist(this.playlist.slice(1));
    }
  }
  refresh(data) {
    this.playlist = this.player.loadPlaylist();
    this.player.updatePlaylist(this.playlist);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
