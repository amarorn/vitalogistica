import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Switch,
  Typography,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

export const Settings: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
  });

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Configurações
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Preferências Gerais
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Typography>Notificações</Typography>
                  <Switch
                    checked={settings.notifications}
                    onChange={() => handleSettingChange('notifications')}
                  />
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    my: 2,
                  }}
                >
                  <Typography>Modo Escuro</Typography>
                  <Switch
                    checked={settings.darkMode}
                    onChange={() => handleSettingChange('darkMode')}
                  />
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2,
                  }}
                >
                  <Typography>Salvamento Automático</Typography>
                  <Switch
                    checked={settings.autoSave}
                    onChange={() => handleSettingChange('autoSave')}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Informações da Conta
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" gutterBottom>
                  <strong>Nome:</strong> {user?.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Email:</strong> {user?.email}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Função:</strong> {user?.role}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}; 