import theme from '../../shared/Styles/theme';
export const MobileMenu = {
  bmBurgerButton: {
    position: 'fixed',
    width: '30px',
    height: '25px',
    top: '22px',
    right: '30px',
  },
  bmBurgerBars: {
    background: theme.colors.black40,
    borderRadius: '30px',
    height: '3.5px',
  },
  bmBurgerBarsHover: {
    background: theme.colors.black60,
  },
  bmCrossButton: {
    height: '30px',
    width: '30px',
    top: '22px',
    right: '30px',
    outline: 'none',
  },
  bmCross: {
    background: theme.colors.black40,
    height: '5px',
    width: '30px',
    top: '5px',
    left: '-15px',
    borderRadius: '5px',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
  },
  bmMenu: {
    background: theme.colors.black5,
    padding: '2.5em 1.5em 0',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: theme.colors.red,
    padding: '0.8em',
    top: '8em',
    display: 'grid',
    height: '250px',
    textAlign: 'center',
    fontSize: '24px',
    marginTop: '60px',
  },
  bmItem: {
    textAlign: 'center',
    lineHeight: '7rem',
    fontSize: '36px',
    padding: '40px',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

export default MobileMenu;
