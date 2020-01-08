import { updateThemeForStyle } from "styles/colors/themeOptions";

const initializeColors = () => {
  updateThemeForStyle("dark");
};

export const init = () => {
  initializeColors();
};
