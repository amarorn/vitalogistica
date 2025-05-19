import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface CalculationFormData {
  kmPerDay: string;
  daysQuantity: string;
  totalKm: string;
  consumptionAverage: string;
  totalFuel: string;
  fuelPrice: string;
  overtime: string;
  extraKmMonthly: string;
  extraKmCost: string;
  employeeOvertime: string;
}

interface CalculationResults {
  fuelCost: number;
  overtimeCost: number;
  additionalVariableCost: number;
  totalCost: number;
  profit: number;
  taxes: number;
  finalTotal: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`calculation-tabpanel-${index}`}
      aria-labelledby={`calculation-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
  },
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
}));

const MotionBox = motion(Box);

export const Calculations: React.FC = () => {
  const [formData, setFormData] = useState<CalculationFormData>({
    kmPerDay: '85',
    daysQuantity: '22',
    totalKm: '1870',
    consumptionAverage: '8.5',
    totalFuel: '220',
    fuelPrice: '5.59',
    overtime: '320',
    extraKmMonthly: '0',
    extraKmCost: '2.50',
    employeeOvertime: '0',
  });

  const [results, setResults] = useState<CalculationResults>({
    fuelCost: 1229.80,
    overtimeCost: 320.00,
    additionalVariableCost: 0,
    totalCost: 1549.80,
    profit: 3400.20,
    taxes: 850.00,
    finalTotal: 5800.00,
  });

  const handleInputChange = (field: keyof CalculationFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateResults = useCallback(() => {
    // Implementar lógica de cálculo aqui
    const kmPerDay = parseFloat(formData.kmPerDay);
    const days = parseFloat(formData.daysQuantity);
    const consumption = parseFloat(formData.consumptionAverage);
    const fuelPrice = parseFloat(formData.fuelPrice);
    const overtime = parseFloat(formData.overtime);

    const totalKm = kmPerDay * days;
    const totalFuel = totalKm / consumption;
    const fuelCost = totalFuel * fuelPrice;

    setFormData((prev) => ({
      ...prev,
      totalKm: totalKm.toFixed(0),
      totalFuel: totalFuel.toFixed(0),
    }));

    setResults({
      fuelCost,
      overtimeCost: overtime,
      additionalVariableCost: 0,
      totalCost: fuelCost + overtime,
      profit: (fuelCost + overtime) * 1.687,
      taxes: 850.00,
      finalTotal: 5800.00,
    });
  }, [formData.kmPerDay, formData.daysQuantity, formData.consumptionAverage, formData.fuelPrice, formData.overtime]);

  useEffect(() => {
    calculateResults();
  }, [calculateResults]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 600,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 4
          }}
        >
          Cálculos
        </Typography>
      </motion.div>

      <MotionBox
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <StyledPaper>
          <Box>
            {/* Cabeçalho */}
            <Box sx={{ bgcolor: '#3498DB', p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ color: 'white' }}>
                  Cálculos e Margens - Orçamento #4587
                </Typography>
                <Box>
                  <Button
                    variant="contained"
                    sx={{ 
                      bgcolor: '#7F8C8D',
                      '&:hover': { bgcolor: '#6C7A89' },
                      mr: 2
                    }}
                    onClick={() => window.history.back()}
                  >
                    Voltar
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#27AE60',
                      '&:hover': { bgcolor: '#219A52' },
                    }}
                  >
                    Salvar
                  </Button>
                </Box>
              </Box>
            </Box>

            <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                {/* Coluna 1: Parâmetros de Cálculo */}
                <Box sx={{ flex: 1 }}>
                  <Paper sx={{ p: 3, bgcolor: '#F8F9F9' }}>
                    <Typography variant="h6" gutterBottom>
                      Parâmetros de Cálculo
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                      {/* Primeira coluna de campos */}
                      <Box sx={{ flex: '1 1 200px' }}>
                        <TextField
                          fullWidth
                          label="KM por dia"
                          value={formData.kmPerDay}
                          onChange={handleInputChange('kmPerDay')}
                          required
                          sx={{ mb: 3 }}
                        />
                        
                        <TextField
                          fullWidth
                          label="Quantidade de dias"
                          value={formData.daysQuantity}
                          onChange={handleInputChange('daysQuantity')}
                          required
                          sx={{ mb: 3 }}
                        />
                        
                        <TextField
                          fullWidth
                          label="KM total"
                          value={formData.totalKm}
                          InputProps={{ readOnly: true }}
                          sx={{ mb: 3, bgcolor: '#ECF0F1' }}
                        />
                        
                        <TextField
                          fullWidth
                          label="Média de consumo (km/l)"
                          value={formData.consumptionAverage}
                          onChange={handleInputChange('consumptionAverage')}
                          required
                          sx={{ mb: 3 }}
                        />
                        
                        <TextField
                          fullWidth
                          label="Total de combustível (L)"
                          value={formData.totalFuel}
                          InputProps={{ readOnly: true }}
                          sx={{ mb: 3, bgcolor: '#ECF0F1' }}
                        />
                        
                        <TextField
                          fullWidth
                          label="Valor do combustível (R$/L)"
                          value={formData.fuelPrice}
                          onChange={handleInputChange('fuelPrice')}
                          required
                        />
                      </Box>

                      {/* Segunda coluna de campos */}
                      <Box sx={{ flex: '1 1 200px' }}>
                        <TextField
                          fullWidth
                          label="Hora extra"
                          value={formData.overtime}
                          onChange={handleInputChange('overtime')}
                          required
                          sx={{ mb: 3 }}
                        />
                        
                        <TextField
                          fullWidth
                          label="KM excedente mensal"
                          value={formData.extraKmMonthly}
                          onChange={handleInputChange('extraKmMonthly')}
                          sx={{ mb: 3 }}
                        />
                        
                        <TextField
                          fullWidth
                          label="Custo por KM excedente"
                          value={formData.extraKmCost}
                          onChange={handleInputChange('extraKmCost')}
                          sx={{ mb: 3 }}
                        />
                        
                        <TextField
                          fullWidth
                          label="HE funcionários"
                          value={formData.employeeOvertime}
                          onChange={handleInputChange('employeeOvertime')}
                          sx={{ mb: 3 }}
                        />
                        
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            bgcolor: '#E67E22',
                            '&:hover': { bgcolor: '#D35400' },
                            height: '50px',
                            mt: 2
                          }}
                          onClick={calculateResults}
                        >
                          Calcular
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
                </Box>

                {/* Coluna 2: Resultado dos Cálculos */}
                <Box sx={{ flex: 1 }}>
                  <Paper sx={{ p: 3, bgcolor: '#F8F9F9' }}>
                    <Typography variant="h6" gutterBottom>
                      Resultado dos Cálculos
                    </Typography>

                    {/* Card de valor total */}
                    <Paper sx={{ p: 3, mb: 3, bgcolor: '#E8F8F5', border: '1px solid #1ABC9C' }}>
                      <Typography variant="subtitle1" color="text.secondary">
                        Valor Total Final (R$)
                      </Typography>
                      <Typography variant="h3" sx={{ color: '#16A085', mt: 1 }}>
                        {formatCurrency(results.finalTotal)}
                      </Typography>
                    </Paper>

                    {/* Tabela de custos */}
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow sx={{ bgcolor: '#3498DB' }}>
                            <TableCell sx={{ color: 'white' }}>Detalhamento de Custos</TableCell>
                            <TableCell align="right" sx={{ color: 'white' }}>Valor</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>Custo de combustível</TableCell>
                            <TableCell align="right">{formatCurrency(results.fuelCost)}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Hora extra</TableCell>
                            <TableCell align="right">{formatCurrency(results.overtimeCost)}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Custo variável adicional</TableCell>
                            <TableCell align="right">{formatCurrency(results.additionalVariableCost)}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Custo total</TableCell>
                            <TableCell align="right">{formatCurrency(results.totalCost)}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Lucro (68,7%)</TableCell>
                            <TableCell align="right" sx={{ color: '#27AE60' }}>{formatCurrency(results.profit)}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Impostos (14,8%)</TableCell>
                            <TableCell align="right" sx={{ color: '#E74C3C' }}>{formatCurrency(results.taxes)}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Box>
              </Box>
              {/* Barra de progresso, se desejar */}
              <Box sx={{ mt: 4 }}>
                <LinearProgress variant="determinate" value={75} />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  3 de 4 - Custos e Margens
                </Typography>
              </Box>
            </Paper>
          </Box>
        </StyledPaper>
      </MotionBox>
    </Box>
  );
}; 