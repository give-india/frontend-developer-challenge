
// Vue JS Object for VideoPlayer App 

var videoApp = new Vue({
  el: '#videoApp',
  data: {
    linkInput: '',
    playingIndex: 0,
    size: 0,
    videoQueue: [],
    player,
  },
  
  mounted: function(){   
  },

  methods: {

    addLink: function(){
      let videoObject = {};
      videoObject.url = this.linkInput;      
      videoObject.priority = this.size + 1;
      this.videoQueue.push(videoObject);      
      // player.videoId = this.getId(videoObject.url);
      // player.playVideo();            
      if(this.size === 0){
        player.loadVideoByUrl( this.getFormattedLink(videoObject.url), 0);
      }
      this.size++;
      this.linkInput = '';
    },

    isYouTubeVideo: function(link){

    },

    getId: function(link){
      // return link.match("(.+?)(\/watch\?v\=/)([a-zA-Z0-9_-]{11})+");
      return link.replace('https://www.youtube.com/watch?v=','');
    },

    getFormattedLink: function(link){
      return link.replace('https://www.youtube.com/watch?v=','https://www.youtube.com/v/');
    },

    nextVideo: function(){
      this.videoQueue.shift();      
      this.size--;
      if(this.size > 0){
        player.loadVideoByUrl(this.getFormattedLink(this.videoQueue[0].url),0);
      }
    }



  }
});

var player;

// Youtube API Function Code 

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '500',
    width: '100%',
    events: {
      // 'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: { 
      'rel': 0
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if(event.data === YT.PlayerState.ENDED){
    videoApp.nextVideo();
  }
}
function stopVideo() {
  player.stopVideo();
}

