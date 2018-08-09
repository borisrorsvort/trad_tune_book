export const routes = {
  "/tunebook/:userId": {
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
