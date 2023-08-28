import { createTheme } from '@mui/material';
const theme = createTheme({
  typography: {
    fontFamily: ['Chilanka', 'cursive'].join(','),
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          border: '3px solid #08f',
          borderRadius: '16px !important',
          background: '#fff !important',
          color: '#08f !important',
          fontWeight: '800',
          fontSize: '18px',

          '&::before': {
            borderBottom: '0 !important',
          },
          input: {
            paddingTop: '18px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxSizing: 'border-box',
          color: '#fff',
          fontSize: '22px',
          padding: '5px 2rem',
          textShadow: '-1px -1px 0 #ca8a00,1px -1px 0 #ca8a00,-1px 1px 0 #ca8a00,2px 2px 0 #ca8a00',
          letterSpacing: '0.02em',
          background: 'rgb(255,215,0)',
          backgroundImage:
            'linear-gradient(to bottom,rgb(255,235,0) 0%, rgb(255,215,0) 51%, rgb(255,244,188) 100%)',
          backgroundSize: 'auto 200%',
          borderTop: '3px solid #fff',
          borderRight: '3px solid rgba(255,255,255,0.8)',
          borderBottom: '3px solid rgba(255,255,255,0.8)',
          borderLeft: '3px solid rgba(255,255,255,0.8)',
          transition: '0.1s',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#fff',
          textShadow: 'none',
        },
      },
    },
  },
  palette: {
    primary: {
      main: 'rgb(255,215,0)',
    },
    secondary: {
      main: '#08f',
    },
  },
});

export default theme;
