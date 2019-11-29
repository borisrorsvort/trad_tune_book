export const currentSection = location => {
  return location.pathname && location.pathname.split("/")[3].toLowerCase();
};
