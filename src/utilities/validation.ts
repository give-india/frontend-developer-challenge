export const isValidYoutubeURL = (url: string): boolean => {
  const regExp = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/(watch\?v=).+$/;
  return regExp.test(url);
};
