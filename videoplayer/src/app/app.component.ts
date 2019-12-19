import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'videoplayer';
  
  height: 550;
  width: 550;
  playlist = []; 
  url:string;
  videoinfo:any;
  player: YT.Player;
  // id= "qDuKsiwS5xw";
  id :string;
  constructor() {}

  ngOnInit() {  
    
  }

  savePlayer(player) {
    this.player = player;
    player.loadVideoById(this.id);
    let data = player.getVideoData();
    console.log('player instance', player);
  }
  onStateChange(event) {
    // console.log('player state', event.data);
    if(event.data == 0){
      if(this.playlist.length > 0){
        this.playlist.reverse().pop();
        this.playing(this.playlist[0]);
        this.savePlayer(this.player);
      }
    }
  }

  
//  current playing
  playing(_url){
    this.id = _url;
   this.savePlayer(this.player);
  }
 

  onSearch(form:NgForm){
    if(form.value.search){
      this.url = form.value.search;
      
      if(this.url.match("https://www.youtube.com")){
        this.videoinfo = this.url;
        this.id = this.url.replace("https://www.youtube.com/watch?v=","");
        // console.log(this.id);
        if(this.playlist.length > 0)
        {this.playlist.push(this.id);}
        else{
          this.playlist.push(this.id);
          this.savePlayer(this.player);
        }
        
      }     
      else{
        alert("please enter valid youtube link.");
      }
            form.reset();
    }


  }

  deletelink(message:number){
    this.playlist.splice((message),1);
    if(message>0)
    this.playing(this.playlist[message-1]);
    if(message==0 && this.playlist.length>0){
      this.playing(this.playlist[0]);
      this.savePlayer(this.player);
    }
    else{
      this.url = "";
    }
  }

 

  upward(id:number){
    if(id>0){
      let lnk = this.playlist[id-1];
      this.playlist[id-1] = this.playlist[id];
      this.playlist[id] = lnk;
      if(id-1 == 0){
        this.playing(this.playlist[0]);
        this.savePlayer(this.player);
      }
    }
    
  }
  downward(id:number){
    if(id>=0 && id != this.playlist.length-1){
      let lnk = this.playlist[id+1];
      this.playlist[id+1] = this.playlist[id];
      this.playlist[id] = lnk;

      if(id == 0)
      {
        this.playing(this.playlist[0]);
         this.savePlayer(this.player);
      }
    }
  }


}
