export const commonStyles = theme => ({
  container: {
    display: 'flex',
    paddingTop: '112px',
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    height: '100vh',
    willChange: 'overflow',
    backfaceVisibility: 'hidden'
  },
  sideNav: {
    width: '250px',
    flex: 'unset',
    order: 0,
    background: 'white',
    overflow: 'auto',
    height: 'auto',
    borderRight: '1px solid #efefef'
  },
  content: {
    flex: '1',
    overflow: 'auto',
    height: 'auto',
    padding: '20px',
    background: '#fafafa'
  }
});
