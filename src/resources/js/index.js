const videoLinkArray = ["k5T1OfPRKF8","w01V5FI03MQ","mWxygBsbHbM"]; //"k5T1OfPRKF8","w01V5FI03MQ","mWxygBsbHbM"
let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
let videoId;
let player, currentVideoId = 0;

function updateLink(url){
    let match = url.match(regExp);
    let videoContainer = document.getElementById("youtubeLinkContainer");
    if (match && match[2].length == 11) {
        videoId = match[2];
        videoLinkArray.push(videoId);

        let nodeContainer = document.createElement("div");
        let node = document.createElement("div");
        let btn = document.createElement("button");
        nodeContainer.className = "link";
        btn.innerHTML= "X";
        btn.className = "remove-link";
        btn.id = "removeLink";
        videoContainer.appendChild(node).innerText = "";
        videoLinkArray.map((item,index)=>{
            videoContainer.appendChild(nodeContainer).appendChild(node).innerHTML = '<a id="linkId" href="' + item + '">'+"Link "+index+'</a>';;
            videoContainer.appendChild(nodeContainer).appendChild(btn);
        })

        // onYouTubeIframeAPIReady();
    } else {
        //error
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '550',
        width: '725',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {rel: 0, showinfo: 0, ecver: 2}
    });
}

function onPlayerReady(event) {
    if(videoLinkArray.length){
        event.target.loadVideoById(videoLinkArray[currentVideoId]);
    }
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        currentVideoId++;
        if (currentVideoId < videoLinkArray.length) {
            player.loadVideoById(videoLinkArray[currentVideoId]);
        }
    }
}

document.getElementById("video-link").addEventListener("keydown", function (e) {
    let urlValue = e.srcElement.value;
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        updateLink(urlValue);
    }
});
