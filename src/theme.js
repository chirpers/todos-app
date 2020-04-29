import { createMuiTheme } from '@material-ui/core/styles';
  
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Roboto, sans-serif',
      'Circular Std, sans-serif',
    ].join(','),
    fontSize: 12,
    useNextVariants: true,
  },
  palette: {
  },
  overrides: {
    MuiButton: {
      root: {
        variant: 'contained',
      },
    },
  },
});


export default theme;
