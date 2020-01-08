import { YOUTUBE_URL_REGEX } from "utils";

export const parseVideoId = (urlText: string) => {
  var regExp = YOUTUBE_URL_REGEX;
  var match = urlText.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
};
