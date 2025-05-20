import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1E3951',
      light: '#42536a',
      dark: '#162838',
    },
    secondary: {
      main: '#F8AB14',
      light: '#FFD25A',
      dark: '#C4880F',
    },
    error: {
      main: '#E74C3C',
    },
    warning: {
      main: '#F8AB14',
    },
    success: {
      main: '#27AE60',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
    text: {
      primary: '#1E3951',
      secondary: '#F8AB14',
    },
    divider: '#1E3951',
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h4: {
      fontSize: '28px',
      fontWeight: 500,
      color: '#1E3951',
    },
    h6: {
      fontSize: '18px',
      fontWeight: 500,
      color: '#1E3951',
    },
    subtitle1: {
      fontSize: '16px',
      color: '#F8AB14',
    },
    subtitle2: {
      fontSize: '14px',
      color: '#F8AB14',
    },
    body1: {
      fontSize: '14px',
      color: '#1E3951',
    },
    body2: {
      fontSize: '14px',
      color: '#F8AB14',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E3951',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1E3951',
          color: '#fff',
          width: 250,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#F8AB14',
            color: '#1E3951',
            '&:hover': {
              backgroundColor: '#C4880F',
            },
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '18px',
          color: '#1E3951',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          boxShadow: '0 1px 3px rgba(30,57,81,0.12)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          textTransform: 'none',
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
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '5px',
            '& fieldset': {
              borderColor: '#1E3951',
            },
            '&:hover fieldset': {
              borderColor: '#F8AB14',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          boxShadow: '0 1px 3px rgba(30,57,81,0.12)',
        },
      },
    },
  },
}); 