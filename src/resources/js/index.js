const videoLinkArray = []; //Sample youtube ID: "k5T1OfPRKF8","w01V5FI03MQ","mWxygBsbHbM"
let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
let videoId;
let player, currentVideoId = 0, count=0;
let videoContainer = document.getElementById("youtubeLinkContainer");
let nodeContainer = document.createElement("ul");
nodeContainer.id = "videoContainerId";
nodeContainer.className = "link";

// Update array of youtube links
function updateLink(url){
    let match = url.match(regExp); // adds link to the playlist only if its valid youtube link
    if (match && match[2].length == 11) {
        videoId = match[2];
        videoLinkArray.push(videoId);
        updateUI();
    } else {
        //display error
    }

    if(videoLinkArray.length > 0){
        let tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
}

// Render the UI with updated Array
function updateUI(){
    count = 0;
    let node = document.createElement("li");
    let btn = document.createElement("button");
    btn.innerHTML= "X";
    btn.className = "remove-link";
    btn.id = "removeLink";
    videoContainer.appendChild(node).innerText = "";
    videoLinkArray.map((item,index)=>{
        videoContainer.appendChild(nodeContainer).appendChild(node).innerHTML = '<a id="linkId" href="' + item + '">'+"Link "+item+'</a>';;
        videoContainer.appendChild(nodeContainer).appendChild(node).appendChild(btn);
    })
}

// Triggers when youtube api is ready
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '550',
        width: '725',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {rel: 0}
    });
}

function onPlayerReady(event) {
    if(videoLinkArray.length){
        event.target.loadVideoById(videoLinkArray[currentVideoId]);
    }
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        let list = document.getElementById('videoContainerId');
        videoLinkArray.splice(currentVideoId,1);
        count = 0;
        if(videoLinkArray.length > 0)
        {
            list.removeChild(list.childNodes[count]);
            count++;
        }
        else{
            document.getElementById('videoContainerId').innerHTML = "";
        }
        if (currentVideoId < videoLinkArray.length) {
            player.loadVideoById(videoLinkArray[currentVideoId]);
        }
    }
}

// Adds youtube link to the playlist
document.getElementById("video-link").addEventListener("keydown", function (e) {
    let urlValue = e.srcElement.value;
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        document.getElementById('video-link').value = "";
        updateLink(urlValue);
    }
});
