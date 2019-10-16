function addUrl(ytUrl) {
    var videoId = validateYouTubeUrl(ytUrl)
    var apikey = "AIzaSyBUAVDEHjBB-loSpj2-JNOKJool818T0-E"
    playVideo(videoId);
    getTitle(videoId, apikey);
}

function playVideo(videoId) {
    document.getElementById("videoData").src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
}

function validateYouTubeUrl(url) {
    if (url != undefined || url != '') {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return 'error';
        }
    }
}

function createPlaylist(videoTitle, videoId) {
    var ul = document.getElementById("playlistData");
    var li = document.createElement('li');
    var span = document.createElement('span');
    span.innerHTML = "X";
    span.onclick = function() {
        this.parentNode.parentNode.removeChild(this.parentNode);
    };
    var p = document.createElement('p');
    p.innerHTML = videoTitle;
    p.onclick = function() {
        playVideo(videoId)
    }
    li.appendChild(p);
    li.appendChild(span);
    ul.appendChild(li);
}

function getTitle(videoId, apiKey) {
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/videos?id=" + videoId + "&key=" + apiKey + "&fields=items(snippet(title))&part=snippet",
        dataType: "jsonp",
        success: function(data) {
            var videoTitle = data.items[0].snippet.title;
            createPlaylist(videoTitle, videoId)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(textStatus, +' | ' + errorThrown);
        }
    });
}