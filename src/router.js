export const routes = {
  "/tunebook": {
    "/tunes": {
      title: "Tunes",
      "/:tuneId": {
        title: "Tune"
      }
    },
    "/sets": {
      title: "Sets",
      "/:setId": {
        title: "Set"
      }
    }
  },
  "/": {
    title: "Home"
  }
};
