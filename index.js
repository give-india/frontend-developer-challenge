import 'normalize.css'
import './index.scss'

// const removeURLParameters = (url, parameters) => {
// 	const urlParts = url.split('?');
// 	if (urlParts.length < 2) return;

// 	let currentParameters = urlParts[1].split(/[&;]/g);
// 	const encodedParameters = parameters.map(
// 		(para) => `${encodeURIComponent(para)}=`
// 	);
// 	const filteredParameters = currentParameters.filter(
// 		(p) => !encodedParameters.some((enc) => p.startsWith(enc))
// 	);

// 	return `${urlParts[0]}?${filteredParameters.join('&')}`;
// };

// const processRequest = (details) => {
// 	const { url, tabId } = details;
// 	if (!url.includes('mime=audio')) return;

// 	if (url.includes('live=1')) {
// 		this.tabIds.set(tabId, '');
// 		this.sendMessage(tabId);
// 		return;
// 	}

// 	const parametersToBeRemoved = ['range', 'rn', 'rbuf'];
// 	const audioURL = this.removeURLParameters(url, parametersToBeRemoved);
// 	if (audioURL && this.tabIds.get(tabId) !== audioURL) {
// 		this.tabIds.set(tabId, audioURL);
// 		this.sendMessage(tabId);
// 	}
// };

function parse_str(str) {
	return str.split('&').reduce(function(params, param) {
			var paramSplit = param.split('=').map(function(value) {
					return decodeURIComponent(value.replace('+', ' '));
			});
			params[paramSplit[0]] = paramSplit[1];
			return params;
	}, {});
}

const youtube_link_submit = (vid,audio_tag) => {

	// // start playing FIFO
	// const parametersToBeRemoved = ['range', 'rn', 'rbuf'];
	// const audioURL = this.removeURLParameters(url, parametersToBeRemoved);
	// console.log(audioURL);

	// using https://www.youtube.com/get_video_info?video_id={VID}
	var audio_streams = {};
	fetch("https://"+vid+"-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https%3A%2F%2Fwww.youtube.com%2Fget_video_info%3Fvideo_id%3D" + vid).then(response => {
    if (response.ok) {
			response.text().then(data => {
				var data = parse_str(data),
					streams = (data.url_encoded_fmt_stream_map + ',' + data.adaptive_fmts).split(',');

				streams.forEach(function(s, n) {
					var stream = parse_str(s),
						itag = stream.itag * 1,
						quality = false;
					// console.log(stream);
					switch (itag) {
						case 139:
							quality = "48kbps";
							break;
						case 140:
							quality = "128kbps";
							break;
						case 141:
							quality = "256kbps";
							break;
					}
					if (quality) audio_streams[quality] = stream.url;
				});

				// console.log(audio_streams);

				audio_tag.src = audio_streams['128kbps'];
				audio_tag.play();
			})
    }
});


	// add a youtube link to the playlist
	// if (audioURL && this.tabIds.get(tabId) !== audioURL) {
	// 	this.tabIds.set(tabId, audioURL);
	// 	this.sendMessage(tabId);
	// }

	// console.log(url,audio_tag,event);
}



(function() {
	let urlInput = document.getElementById("url");
	let audio_tag = document.getElementById("player");
	
	urlInput.focus();
	urlInput.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
		 event.preventDefault();
		 document.youtube_link.submit();
		}
	});

	function getVideoId(url){
		return "rcBpQ9fwNTY";
	}

	document.youtube_link.addEventListener("submit", function(e) {
		e.preventDefault();
			// // validate url isYoutube
	// if (!url.includes('mime=audio')) return;
	// if (url.includes('live=1')) {
	// 	// this.sendMessage(tabId);
	// 	return;
	// }
	// // can't play videos with monetization settings

		youtube_link_submit(getVideoId(urlInput.value), audio_tag);
	});
})();
