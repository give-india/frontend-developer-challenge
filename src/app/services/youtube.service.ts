import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
   constructor(private http: HttpClient) { }

  getVideoId(url: string): string {
    const regex = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const id = url.match(regex);
    if (id != null) {
      return id[2];
    }
    return;
  }
  searchVideo(videoId: string): Observable<any> {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyCBzxj8_MpBeynsyq5fHV1zdISRma_IXNY`;
    const headers = new Headers({
      Accept: 'application/json'
    });
    return this.http.get(url)
  }


}
