var tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var playlistId = [];
var player;
var songIndex;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('existing-iframe', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}
function onPlayerReady(event) {
  // document.getElementById('existing-iframe').style.borderColor = '#FF6D00';
}
function changeBorderColor(playerStatus) {
  var color;
  if (playerStatus == -1) {
    // color = "#37474F"; // unstarted = gray
  } else if (playerStatus == 0) {
    // color = "#FFFF00";
    deleteCurrentVideo() // ended = yellow
    playNextSong()

  } else if (playerStatus == 1) {
    // color = "#33691E"; // playing = green
  } else if (playerStatus == 2) {
    // color = "#DD2C00"; // paused = red
  } else if (playerStatus == 3) {
    // color = "#AA00FF"; // buffering = purple
  } else if (playerStatus == 5) {
    // color = "#FF6DOO"; // video cued = orange
  }
  // if (color) {
  //   document.getElementById('existing-iframe').style.borderColor = color;
  // }
}
function onPlayerStateChange(event) {
  changeBorderColor(event.data);
}
var title;
var img;
$(document).ready(function () {
  var x = 0;

  $("#addUrl").click(function (e) {
    e.preventDefault();
    var userUrl = validate($("#youtubeUrl").val())
     if(playlistId.indexOf(userUrl) != -1){
       alert("already in list")
     }
    else if (userUrl) {
      $('#youtubeUrl').val('')
      playlistId.push(userUrl);


      if (playlistId.length == 1) {


        player.loadVideoById(playlistId[0])

        $('iframe').removeClass('d-none')
      }
      else {
      }
      jsonCall()
    }
    else {
      alert("invalid url")
      invalidUrl()
    }







  });



  function jsonCall() {
    var key = "AIzaSyAUFJ6Cc9Buu7UHoA0mtifO1O50qnpYvLY"

    var URL = 'https://www.googleapis.com/youtube/v3/videos';


    var options = {
      part: 'snippet',
      key: key,
      maxResults: 1,
      id: playlistId[playlistId.length - 1]
    }

    loadVids();

    function loadVids() {
      $.getJSON(URL, options, function (data) {
        console.log(data)
        title = data.items[0].snippet.title
        img=data.items[0].snippet.thumbnails.default.url
        createListItem()
      });
    }





  }



});


function createListItem() { var a=''
                            if(title.length>30){a='...'}
  
  $('#playlist').append(`<li class='col-sm-11 mb-2'style="padding:0;"><img class="rounded border border-light" src=${img}><span class='ml-3'>
                   ${title.slice(0, 25)+a}
                    </span><a class='float-right mr-3 text-danger mt-4 delete'>X</a></li>`)
  $("li").css("cursor", "pointer")
  let temp1,temp2;
  $("ul").sortable({ containment: "parent",
                      items: "> li:not(:first)",
                      start: function (event, ui) { temp1=ui.item.index("li");console.log(temp1) },
                     update: function (event, ui) { temp2=ui.item.index("li");console.log(temp2)
                                                  playlistId.splice(temp2,0,playlistId.splice(temp1,1)[0]) } });

  deleteFromList()



}

function validate(url) {
  var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return (url.match(p)) ? RegExp.$1 : false;
}

function invalidUrl() {

}
function playNextSong() {
  if(playlistId[0])
  player.loadPlaylist(playlistId[0])
  else{player.stopVideo()}
  
}
function deleteCurrentVideo() {
  console.log(playlistId.shift())
  $('#playlist li:first').remove()
}
function deleteFromList() {
  
  $('.delete').off("click").on("click", function () {
    console.log("deleteFromList")
    $(this).parent().remove()
    playlistId.splice(($(this).parent().index("#playlist li")) - 1, 1)
  })
  $('.delete:first').off("click").on("click", function () {
    deleteCurrentVideo()
    playNextSong()
    deleteFromList()
  })
  

}
