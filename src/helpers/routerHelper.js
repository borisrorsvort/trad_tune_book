export const tuneOrSetUrl = (id, type, currentUserId) => {
  switch (type) {
    case "sets":
      return `/tunebook/${currentUserId}/sets/${id}`;
    default:
      return `/tunebook/${currentUserId}/tunes/${id}`;
  }
};

export const currentSection = router => {
  return router.pathname && router.pathname.split("/")[3].toLowerCase();
};
