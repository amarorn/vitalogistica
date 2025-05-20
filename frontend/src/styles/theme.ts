import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1E3951',
      light: '#42536a',
      dark: '#162838',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F8AB14',
      light: '#FFD25A',
      dark: '#C4880F',
      contrastText: '#1E3951',
    },
    success: {
      main: '#22c55e',
      light: '#4ade80',
      dark: '#15803d',
      contrastText: '#fff',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#b91c1c',
      contrastText: '#fff',
    },
    info: {
      main: '#1E3951',
      light: '#42536a',
      dark: '#162838',
      contrastText: '#fff',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
    text: {
      primary: '#1E3951',
      secondary: '#F8AB14',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#1E3951',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1E3951',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#1E3951',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#1E3951',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#1E3951',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#1E3951',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
          fontWeight: 600,
          boxShadow: '0 2px 8px 0 rgba(30,57,81,0.08)',
        },
        containedPrimary: {
          backgroundColor: '#1E3951',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#162838',
          },
        },
        containedSecondary: {
          backgroundColor: '#F8AB14',
          color: '#1E3951',
          '&:hover': {
            backgroundColor: '#C4880F',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(30,57,81,0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #1E3951 0%, #F8AB14 100%)',
        },
      },
    },
  },
}); 