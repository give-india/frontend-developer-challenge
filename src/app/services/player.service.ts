import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  public isRestricted = /iphone|ipad|Andorid/i.test(navigator.userAgent);
  public playlist: string[] = [];
  public player: any;
  playlistUpdate = new Subject<string[]>();
  constructor() { }

  playListUpdated(): Observable<string[]> {
    return this.playlistUpdate.asObservable();
  }
  loadPlaylist() {
    this.playlist = JSON.parse(localStorage.getItem('playlist'));
    if ( !this.playlist || this.playlist.length === 0) {
      this.playlist = [];
      return [];
    }
    else {
      return this.playlist;
    }
  }



  addVideo(videoId: string) {
    if (this.playlist.indexOf(videoId) === -1){
      this.playlist = this.updatePlaylist(this.playlist.concat(videoId));
    }
  }
  updatePlaylist(playlist: string[]): string[] {
    let newPlay = [...playlist];
    localStorage.setItem('playlist', JSON.stringify(newPlay));
    this.playlist = [...newPlay];
    this.playlistUpdate.next(newPlay);
    return newPlay;
  }
}
