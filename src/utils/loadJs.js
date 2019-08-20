export default function loadJS(src) {
  const script = document.createElement("script");
  script.id = "video-iframe";
  script.src = src;
  const firstScriptTag = document.getElementsByTagName("script")[0];
  if (!document.querySelector("#video-iframe")) {
    firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
  }
  return true;
}
