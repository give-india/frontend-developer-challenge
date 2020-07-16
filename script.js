$("#inputURL").keypress(function(event) { 
	if (event.keyCode === 13) { 
		addtoplaylist(); 
	} 
});    

var videoIds = [];
function addtoplaylist(event){
	if($('#inputURL').val() && $('#inputURL').val().indexOf("youtube.com")>-1){
		var node = 	$('#playlist-container'); 
		var youtube_video_id = $('#inputURL').val().split("?v=")[1].split("&")[0];
		var childnode = '<div class="playlist-item">'
					+	'<a class="playlist-item-thumbnail"><img src="https://img.youtube.com/vi/'+youtube_video_id+'/sddefault.jpg"/></a>'
					+   '<a class="playlist-item-remove">X</a>'
					+	'</div>';	 
		$(childnode).appendTo(node); 
	} else{
		alert("invalid URL");
	}	
	$('#inputURL').val("");
	
	if(videoIds.indexOf(youtube_video_id) < 0){
		videoIds.push(youtube_video_id);
	}
}

var player;
$(document).on("click", ".playlist-item-thumbnail" , function(event) {
	if($('#video-placeholder').length > 0){
		$('#video-placeholder').remove();
	}
	
	var vdoPlaceholder = '<div id="video-placeholder"></div>';
	$(vdoPlaceholder).appendTo($('#youtube-container'));

	var videoId = $(event.target)[0].currentSrc.split("/sddefault.jpg")[0].split("/vi/")[1];			
	player = new YT.Player('video-placeholder', {
		width: 660,
		height: 580,
		videoId: videoId,
		playerVars: {
			color: 'white',
			playlist: videoIds
		},
		events: {
			'onStateChange': onPlayerStateChange
		}
	});	
});

$(document).on("click", ".playlist-item-remove" , function(event) {
	$(event.target).parent().remove();
	var removedVideoId = $(event.target).siblings().find('img')[0].currentSrc.split("/sddefault.jpg")[0].split("/vi/")[1];
	for(var i=0;i<videoIds.length;i++){
		if(videoIds.indexOf(removedVideoId) > -1){
			videoIds.splice(i,1);
		}
	}
});

var currentPlayingVideoId;
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		currentPlayingVideoId = player.getVideoData().video_id;
	}
	if (event.data == YT.PlayerState.ENDED) {
		var currentEndedVideoId = currentPlayingVideoId;
		var loop = $('.playlist-item').find('img');
		for(var i=0;i<loop.length;i++){
			id=loop[i].currentSrc.split("/sddefault.jpg")[0].split("/vi/")[1];
			if(id==currentEndedVideoId){
				loop[i].closest('.playlist-item').remove();
			}
		}
		for(var i=0;i<videoIds.length;i++){
			if(videoIds.indexOf(currentEndedVideoId) > -1){
				videoIds.splice(i,1);
			}
		}
	}
}



	