import store from "../store";

export const tuneOrSetUrl = (id, type) => {
  switch (type) {
    case "sets":
      return `/tunebook/sets/${id}`;
      break;
    default:
      return `/tunebook/tunes/${id}`;
      break;
  }
};

export const currentSection = router => {
  return router.pathname.split("/")[2].toLowerCase();
};

export const randomTuneOrSetUrl = () => {
  const state = store.getState();
  const section = currentSection(state.router);
  const items = state[section][section];
  const randomIndex = Math.floor(Math.random() * (items.length - 0 + 1) + 0);
  return tuneOrSetUrl(items[randomIndex].id, section);
};
