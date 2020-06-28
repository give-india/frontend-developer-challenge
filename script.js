
Vue.use(VueStorage);
// VueStorage is used to store data at the client's local Storage.


// Initialising Player Variable for Youtube VideoPlayer Controls
var player;


// Vue JS Object for VideoPlayer App 
var videoApp = new Vue({
  el: '#videoApp',
  data: {
    linkInput: '', //Input Text that's entered.
    lastIndex: 0, // Last Index of Queue.
    size: 0, // Size of Queue
    videoQueue: [], // Video Queue
    playerLoaded: false,  
    currentTime: 0, //Video Current Time (in Seconds)
  },

  // Watcher functions that takes care of change of value of the mentioned vairables. 
  // These handlers store the data on the localStorage upon change in the values (except for PlayerLoaded: bool)

  watch:{
    videoQueue: function (videos){
      Vue.ls.set('videoQueue',videos);
    },
    size: function(value){
      Vue.ls.set('size',value);
      if(value > 0){        
      }
    },
    lastIndex: function(value){
      Vue.ls.set('lastIndex',value);
    },
    playerLoaded: function(loaded){
      if(loaded){
        if(this.videoQueue.length){
          this.loadVideo(this.videoQueue[0].url);          
        }
      }
    },

    currentTime: function(time){
      Vue.ls.set('currentTime',time);
    }    
  },

  // Upon creation the instance, variables are updated if any information is found in LocalStorage; 
  created: function(){
    this.videoQueue = Vue.ls.get('videoQueue',[]);  
    this.size = Vue.ls.get('size',0);
    this.currentTime = Vue.ls.get('currentTime',0);
    this.lastIndex = Vue.ls.get('lastIndex',0);
  },

  methods: {

    addLink: function(){
      if(this.isYouTubeVideo(this.linkInput)){      
        let videoObject = {};
        videoObject.url = this.linkInput;      
        videoObject.priority = this.lastIndex++;
        this.videoQueue.push(videoObject);            
        if(this.size === 0){
          this.loadVideo(videoObject.url);
        }
        this.size++;
        this.linkInput = '';
      }
      else{
        alert('Please Enter a Valid Youtube URL');
        this.linkInput = '';
      }
    },

    isYouTubeVideo: function(link){
      if(link.indexOf('https://www.youtube.com/watch?v=') === 0){
        return true;
      }
      else if(link.indexOf('https://youtu.be/') === 0){
        return true;
      }
      else{
        return false;
      }
    },
   
    getFormattedLink: function(link){
      if(link.indexOf('https://www.youtube.com/watch?v=') === 0)
        return link.replace('https://www.youtube.com/watch?v=','https://www.youtube.com/v/');
      else if(link.indexOf('https://youtu.be/') === 0)
        return link.replace('https://youtu.be/','https://www.youtube.com/v/');
    },

    // Plays the Next Video 
    nextVideo: function(){
      this.videoQueue.shift(); // Popping the first element of the Video Queue
      this.size--; // Decrementing Video Size.
      this.currentTime = 0; // Setting Current Time for new video as 0s.
      if(this.size > 0){
        this.loadVideo(this.videoQueue[0].url);
        this.playVideo();      
      }
      else{
        alert('No Videos in the Queue');
      }
    },

    loadVideo: function(url){      
      player.loadVideoByUrl(this.getFormattedLink(url), this.currentTime);
    },
    
    playVideo: function(){      
      player.playVideo();
    },

    // Clear Queue 
    clearQueue: function(){
      this.videoQueue = [];
      this.size = 0;
      this.lastIndex = 0;
      player.stopVideo();
    },

    // Method to swap elements of array in order to re-order the items 
    swap: function(i, j){
      console.log(this.videoQueue[i], this.videoQueue[j]);
      let temp = this.videoQueue[i];
      this.videoQueue.splice(i,1,this.videoQueue[j]);
      this.videoQueue.splice(j,1,temp);
      console.log(this.videoQueue[i], this.videoQueue[j]);
    },

  // Method to move up the video in the priority Order 
    moveUp: function(e){
      let p = e.target.parentElement.getAttribute('priority');         
      let index = this.videoQueue.findIndex(obj => obj.priority == p);      
      if(index > 1){
        this.swap(index, index-1);
      }
      else{
        alert('Video is already being played, Can\'t be moved up');
      }
    },

    // Method to move down the video in the priority Order 
    moveDown: function(e){
      let p = e.target.parentElement.getAttribute('priority');         
      let index = this.videoQueue.findIndex(obj => obj.priority == p);      
      if(index >= 1){
        if(this.videoQueue[index + 1]){
          this.swap(index, index+1);
        }
        else{
          alert('Video Can\'t be moved down');
        }
      }
    },
    

    // Method to play any video from the queue randomly 
    play: function(e){
      let p = e.target.parentElement.getAttribute('priority');
      let index = this.videoQueue.findIndex(obj => obj.priority == p);
      let video = this.videoQueue[index];
      if(index >= 1){
        this.videoQueue.splice(index,1);
        this.videoQueue.splice(0,0,video);        
        this.currentTime = 0;
        this.loadVideo(this.videoQueue[0].url);                
      }
      else{
        alert('Video Already Playing or not in the Queue');
      }
    }

  }
});

// Youtube API Function Code 

function onYouTubeIframeAPIReady() {  
  player = new YT.Player('player', {
    height: '500',
    width: '100%',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: { 
      'rel': 0
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  videoApp.playerLoaded = true;
  player.mute(); 
  // Video Player Muted to enable autoplay on browsers 
  event.target.playVideo();
}


// Set Interval Function to update current time of video from youtube API's getCurrentTime function 
setInterval(function(){
  if(videoApp.playerLoaded){
    videoApp.currentTime = player.getCurrentTime();  
  }
},100)

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
  if(event.data === YT.PlayerState.ENDED){
    videoApp.nextVideo();
    // upon the current playing video ends, load a new video and play it 
  }
}

