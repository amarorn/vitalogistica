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
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)', boxShadow: '0 4px 24px rgba(37,99,235,0.08)' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }}>
            Sistema de Gestão de Orçamentos
          </Typography>
          <IconButton color="inherit" sx={{ ml: 2 }}>
            <HelpIcon />
          </IconButton>
          <IconButton sx={{ ml: 1 }}>
            <Avatar sx={{ bgcolor: theme.palette.secondary.main, color: '#fff', fontWeight: 700 }}>U</Avatar>
          </IconButton>
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