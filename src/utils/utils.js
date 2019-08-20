import CONSTANTS from "@/constants.js";
const getVideoId = str => str.match(CONSTANTS.INPUT_COMPONENT.YOUTUBE_REGEX)[2];
export default getVideoId;
