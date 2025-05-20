import React from 'react';
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Tooltip,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Description as DescriptionIcon,
  People as PeopleIcon,
  Calculate as CalculateIcon,
  CheckCircle as ValidationIcon,
  Business as OperationalIcon,
  AttachMoney as FinancialIcon,
  Assessment as ReportsIcon,
  AdminPanelSettings as AdminIcon,
  Help as HelpIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Orçamentos', icon: <DescriptionIcon />, path: '/orcamentos' },
  { text: 'Fornecedores', icon: <PeopleIcon />, path: '/fornecedores' },
  { text: 'Cálculos e Custos', icon: <CalculateIcon />, path: '/calculos' },
  { text: 'Validações', icon: <ValidationIcon />, path: '/validacoes' },
  { text: 'Gestão Operacional', icon: <OperationalIcon />, path: '/operacional' },
  { text: 'Financeiro', icon: <FinancialIcon />, path: '/financeiro' },
  { text: 'Relatórios', icon: <ReportsIcon />, path: '/relatorios' },
  { text: 'Administração', icon: <AdminIcon />, path: '/admin' },
];

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          borderTopLeftRadius: 24,
          borderBottomLeftRadius: 24,
          height: 72,
          display: 'flex',
          justifyContent: 'center',
          px: 4,
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(30, 57, 81, 0.85)',
          boxSizing: 'border-box',
          boxShadow: '0 2px 16px 0 rgba(30,57,81,0.10), inset 0 1px 8px 0 rgba(248,171,20,0.08)',
          transition: 'background 0.4s, box-shadow 0.4s',
        }}
      >
        <Toolbar disableGutters sx={{ minHeight: 72, width: '100%' }}>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{
                fontWeight: 800,
                letterSpacing: 1,
                color: '#fff',
                textShadow:
                  '0 2px 8px rgba(30,57,81,0.18), 0 1px 16px rgba(248,171,20,0.10)',
                fontSize: { xs: '1.2rem', md: '2.2rem' },
                textAlign: 'center',
                width: '100%',
                filter: 'brightness(1.08)',
                transition: 'text-shadow 0.4s',
              }}
            >
            Sistema de Gestão de Orçamentos
          </Typography>
          </Box>
          <Box sx={{ position: 'absolute', right: 32, display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" sx={{ ml: 2, transition: 'background 0.3s', '&:hover': { background: 'rgba(248,171,20,0.12)' } }}>
            <HelpIcon />
          </IconButton>
            <IconButton sx={{ ml: 1, transition: 'background 0.3s', '&:hover': { background: 'rgba(248,171,20,0.18)' } }}>
              <Avatar sx={{ bgcolor: theme.palette.secondary.main, color: '#fff', fontWeight: 700, boxShadow: '0 2px 8px 0 rgba(30,57,81,0.10)' }}>U</Avatar>
          </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
            background: 'linear-gradient(180deg, #1e293b 0%, #2563eb 100%)',
            color: '#fff',
            borderRight: 'none',
            boxShadow: '2px 0 16px 0 rgba(37,99,235,0.08)',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            {menuItems.map((item) => {
              const isDev = [
                'Gestão Operacional',
                'Financeiro',
                'Relatórios',
                'Administração',
              ].includes(item.text);
              return isDev ? (
                <Tooltip title="Em desenvolvimento" arrow key={item.text}>
                  <span>
                    <ListItemButton
                      disabled
                      sx={{
                        py: 1.5,
                        opacity: 0.5,
                        cursor: 'not-allowed',
                        borderRadius: 2,
                        mx: 1,
                      }}
                    >
                      <ListItemIcon sx={{ color: '#a78bfa', minWidth: 40 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </span>
                </Tooltip>
              ) : (
                <ListItemButton
                  key={item.text}
                  selected={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    mx: 1,
                    '&.Mui-selected': {
                      background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)',
                      color: '#fff',
                    },
                    '&:hover': {
                      background: 'rgba(124,58,237,0.12)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: '#60a5fa', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        {children}
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: theme.palette.background.default,
            borderTop: `1px solid ${theme.palette.divider}`,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Sistema de Gestão de Orçamentos © {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}; 