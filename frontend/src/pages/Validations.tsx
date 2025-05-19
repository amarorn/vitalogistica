import React from 'react';
import { Box, Button, Paper, Typography, Tabs, Tab, TextField, Select, MenuItem, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { motion } from 'framer-motion';

export const Validations: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box>
        {/* Cabeçalho */}
        <Box sx={{ bgcolor: '#3498DB', p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ color: 'white' }}>
              Validações Operacionais - Orçamento #4587
            </Typography>
            <Box>
              <Button
                variant="contained"
                sx={{ bgcolor: '#7F8C8D', '&:hover': { bgcolor: '#6C7A89' }, mr: 2 }}
              >
                Voltar
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: '#27AE60', '&:hover': { bgcolor: '#219A52' } }}
              >
                Aprovar
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Conteúdo principal da tela de Validações, sem abas */}
        <Box sx={{ width: '100%', mb: 2, p: 4 }}>
          {/* Resumo do Orçamento */}
          <Paper sx={{ p: 3, mb: 4, bgcolor: '#F8F9F9' }}>
            <Typography variant="h6" gutterBottom>Resumo do Orçamento</Typography>
            <Box sx={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <Box>Cliente: <b>Logística Express</b></Box>
              <Box>Data da Solicitação: <b>16/05/2025</b></Box>
              <Box>Rota: <b>São Paulo - Campinas</b></Box>
              <Box>Valor Total: <b>R$ 5.800,00</b></Box>
            </Box>
          </Paper>

          {/* Inclusão no BDG - Vitta */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom>Inclusão no BDG - Vitta</Typography>
            <RadioGroup row defaultValue="nao">
              <FormControlLabel value="sim" control={<Radio />} label="Sim" />
              <FormControlLabel value="nao" control={<Radio />} label="Não" />
            </RadioGroup>
          </Paper>

          {/* Aprovado por */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom>Aprovado por</Typography>
            <FormControl fullWidth>
              <InputLabel>Selecione um aprovador...</InputLabel>
              <Select label="Selecione um aprovador...">
                <MenuItem value="">Selecione um aprovador...</MenuItem>
                {/* Adicione opções reais aqui */}
              </Select>
            </FormControl>
          </Paper>

          {/* Validação DASA */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom>Validação DASA</Typography>
            <RadioGroup row defaultValue="2onda">
              <FormControlLabel value="mz" control={<Radio />} label="MZ" />
              <FormControlLabel value="2onda" control={<Radio />} label="2ª ONDA" />
            </RadioGroup>
          </Paper>

          {/* Informações de Exclusão */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>Informações de Exclusão</Typography>
            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              <Box>
                <TextField label="Data de Exclusão" type="date" InputLabelProps={{ shrink: true }} />
              </Box>
              <Box>
                <TextField label="Exclusão do BDG - Vitta" />
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </motion.div>
  );
}; 