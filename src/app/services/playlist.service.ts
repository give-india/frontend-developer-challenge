import { Injectable } from "@angular/core";
import { IVideoLink } from "../interfaces/IVideoLink";
import { Constants } from "../utilities/constants";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PlaylistService {
  private playlistSubject = new Subject<any>();

  constructor() { }

  public getNextVideo(): IVideoLink  {
    return this.getVideos()[0];
  }

  public isPlaylistEmpty(): boolean {
    return !this.getPlaylistItemCount();
  }

  public getPlaylistItemCount(): number{
    return this.getVideos().length;
  }

  public moveVideoUp(index: number) {
    let videos: IVideoLink[] = this.getVideos();
    if (index >= 1) {
      const tempVar = videos[index - 1];
      videos[index - 1] = videos[index];
      videos[index] = tempVar;
      this.setVideos(videos);
    }
  }

  public moveVideoDown(index: number) {
    let videos: IVideoLink[] = this.getVideos();
    if (index <= videos.length - 2) {
      const tempVar = videos[index + 1];
      videos[index + 1] = videos[index];
      videos[index] = tempVar;
      this.setVideos(videos);
    }
  }

  public removeVideoByIndex(index: number): void{
    let videos: IVideoLink[] = this.getVideos();
    videos.splice(index, 1);
    this.setVideos(videos);
  }

  public getVideoByIndex(index: number): IVideoLink
  {
    const videos: IVideoLink[] = this.getVideos();
    return videos[index];
  }
  public getVideos(): IVideoLink[] {
    return JSON.parse(localStorage.getItem(Constants.LinksStorageKey))
  }

  public setVideos(videos: IVideoLink[]): void{
    localStorage.setItem(Constants.LinksStorageKey, JSON.stringify(videos));
  }

  public sendUpdateToPlaylist(message: boolean): void {
    this.playlistSubject.next({ linkData: message });
  }

  public updatePlaylist(): Observable<any> {
    return this.playlistSubject.asObservable();
  }
}
