export const extractId = url => {
    const start = url.indexOf('v=')+2;

    return url.substr(start,url.length-1);
}

 export const validated = url => {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    return url.match(regex) && url.indexOf('youtube.com') > 0 && url.indexOf('v=')>0
}