export const routes = {
  '/tunebook': {
    title: 'Tunebook',
    '/:tuneId': {
      title: 'Tune',
    },
  },
  '/sets': {
    title: 'Sets',
    '/:setId': {
      title: 'Set',
    },
  },
  '/': {
    title: 'Home',
  },
};
