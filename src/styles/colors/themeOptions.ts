export const themeOptions = [
  {
    "--bg-primary": "#ffffff",
    "--bg-secondary": "#888888",
    "--bg-ternary": "#0c0b0b",
    "--element": "#4ECDC4",
    "--text-primary": "#eeeeee",
    "--text-secondary": "#666666",
    "--text-ternary": "#AAAAAA",
    name: "light"
  },
  {
    "--bg-primary": "#2f2f2f",
    "--bg-secondary": "#36393f",
    "--bg-ternary": "#0c0b0b",
    "--element": "#1890ff",
    "--text-primary": "#ffffff",
    "--text-secondary": "#e8e8e8",
    "--text-ternary": "#d1d1d1",
    name: "dark"
  }
];

export const updateThemeForStyle = (themeName: string) => {
  const selectedTheme: any =
    themeOptions.find(t => t.name.toLowerCase() === themeName.toLowerCase()) ||
    {};
  const html = document.getElementsByTagName("html")[0];
  Object.keys(selectedTheme).forEach((property, i) => {
    if (property === "name") {
      return;
    }
    html.style.setProperty(property, selectedTheme[`${property}`]);
  });
};
