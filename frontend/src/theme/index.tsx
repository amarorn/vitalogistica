import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2C3E50',
      light: '#34495E',
      dark: '#2980B9',
    },
    secondary: {
      main: '#3498DB',
      light: '#ECF0F1',
      dark: '#2C3E50',
    },
    error: {
      main: '#E74C3C',
    },
    warning: {
      main: '#F1C40F',
    },
    success: {
      main: '#27AE60',
    },
    background: {
      default: '#ECF0F1',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#7F8C8D',
    },
    divider: '#BDC3C7',
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h4: {
      fontSize: '28px',
      fontWeight: 500,
      color: '#2C3E50',
    },
    h6: {
      fontSize: '18px',
      fontWeight: 500,
      color: '#2C3E50',
    },
    subtitle1: {
      fontSize: '16px',
      color: '#7F8C8D',
    },
    subtitle2: {
      fontSize: '14px',
      color: '#7F8C8D',
    },
    body1: {
      fontSize: '14px',
      color: '#2C3E50',
    },
    body2: {
      fontSize: '14px',
      color: '#7F8C8D',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2C3E50',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#34495E',
          color: '#FFFFFF',
          width: 250,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#2980B9',
            '&:hover': {
              backgroundColor: '#2980B9',
            },
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '18px',
          color: '#FFFFFF',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
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
          backgroundColor: '#2980B9',
          '&:hover': {
            backgroundColor: '#2C3E50',
          },
        },
        containedSuccess: {
          backgroundColor: '#27AE60',
          '&:hover': {
            backgroundColor: '#219A52',
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
              borderColor: '#BDC3C7',
            },
            '&:hover fieldset': {
              borderColor: '#7F8C8D',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        },
      },
    },
  },
}); 