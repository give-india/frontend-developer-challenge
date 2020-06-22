import { PlayerService } from './../services/player.service';
import { YoutubeService } from './../services/youtube.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  videoUrl: string;
  error = false;
  errorString = '';
  loading = false;
  constructor(private youtube: YoutubeService,
              private player: PlayerService) { }

  ngOnInit() {
  }

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
         this.youtube.searchVideo(videoId).subscribe((data) => {
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
    }
  }

  addVideoToPlaylist(videoId: string) {
    this.player.addVideo(videoId);
    this.videoUrl = '';

  }

}
