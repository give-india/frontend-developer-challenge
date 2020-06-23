import { takeUntil } from 'rxjs/operators';
import { PlayerService } from './../services/player.service';
import { YoutubeService } from './../services/youtube.service';
import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styles: [`.data-block {
    margin: 0px auto 15px auto;
    }
    .search-button {
      display: inline-block;

    }
  `]

})
export class SearchbarComponent implements OnDestroy  {
  videoUrl: string;
  error = false;
  errorString = '';
  loading = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private youtube: YoutubeService,
              private player: PlayerService) { }


  checkIfVideoExists() {
    this.error = false;
    this.loading = true;
    let videoId = '';
    if (this.videoUrl) {
      videoId = this.youtube.getVideoId(this.videoUrl);
      if ( !videoId) {
         this.error = true;
         this.errorString = 'No Video ID found in the entered URL, please check the URL format.'
         this.videoUrl = '';
         this.loading = false;
       } else{
         this.youtube.searchVideo(videoId).pipe(
           takeUntil(this.destroy$)
         ).subscribe((data) => {
           if (data.items.length === 0) {
            this.error = true;
            this.errorString = 'No Video Found with the url you entered.';

           } else {
             this.videoUrl = '';
             this.errorString = '';
             this.error = false;
             this.addVideoToPlaylist(videoId);
           }
           this.loading = false;
         },(error) => {
           this.error = true;
           this.errorString = 'Some error Occured, please try again later.';
           this.loading = false;
         });
       }
    } else {
      this.loading = false;
    }
  }

  addVideoToPlaylist(videoId: string) {
    this.player.addVideo(videoId);
    this.videoUrl = '';

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
