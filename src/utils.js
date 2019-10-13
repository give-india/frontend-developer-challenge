export const  isvalidYoutubeUrl = (getURL) => {
	if(typeof getURL!=='string') return false;
	var newA = document.createElement('A');
	newA.href = getURL;
	var host = newA.hostname;
	var srch = newA.search;
	var path = newA.pathname;
	
	if(host.search(/youtube\.com|youtu\.be/)===-1) return false;
	if(host.search(/youtu\.be/)!==-1) return path.slice(1);
	if(path.search(/embed/)!==-1) return /embed\/([A-z0-9]+)(&|$)/.exec(path)[1];
	var getId = /v=([\w\-\_]*)(&|$)/.exec(srch);
	if(host.search(/youtube\.com/)!==-1) return !getId ? '':getId[1];
}