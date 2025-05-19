import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  SelectChangeEvent,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { CNPJInput } from '../../components/CNPJInput';

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
  backdropFilter: 'blur(10px)',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(37,99,235,0.1)',
  border: '1px solid rgba(255,255,255,0.2)',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  '& .MuiTableCell-head': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    fontSize: '0.95rem',
  },
}));

interface Supplier {
  id: number;
  name: string;
  cnpj: string;
  proposedValue: number;
  status: 'active' | 'inactive';
}

interface SupplierFormData {
  name: string;
  cnpj: string;
  proposedValue: string;
  status: 'active' | 'inactive';
}

export const Suppliers: React.FC = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState<SupplierFormData>({
    name: '',
    cnpj: '',
    proposedValue: '',
    status: 'active',
  });
  const [formErrors, setFormErrors] = useState<Partial<SupplierFormData>>({});

  // Dados de exemplo
  const suppliers: Supplier[] = [
    {
      id: 1,
      name: 'Transportes São Paulo Ltda',
      cnpj: '12.345.678/0001-90',
      proposedValue: 5800.00,
      status: 'active',
    },
    {
      id: 2,
      name: 'Logística Expressa Brasil',
      cnpj: '98.765.432/0001-10',
      proposedValue: 6200.00,
      status: 'active',
    },
    {
      id: 3,
      name: 'Transporte Rápido e Seguro',
      cnpj: '45.678.901/0001-23',
      proposedValue: 5950.00,
      status: 'active',
    },
    {
      id: 4,
      name: 'Viação Continental',
      cnpj: '34.567.890/0001-45',
      proposedValue: 6100.00,
      status: 'inactive',
    },
    {
      id: 5,
      name: 'Transportadora Cidade Nova',
      cnpj: '56.789.012/0001-67',
      proposedValue: 5750.00,
      status: 'active',
    },
  ];

  const handleOpenDialog = (supplier?: Supplier) => {
    if (supplier) {
      setSelectedSupplier(supplier);
      setFormData({
        name: supplier.name,
        cnpj: supplier.cnpj,
        proposedValue: supplier.proposedValue.toString(),
        status: supplier.status,
      });
    } else {
      setSelectedSupplier(null);
      setFormData({
        name: '',
        cnpj: '',
        proposedValue: '',
        status: 'active',
      });
    }
    setFormErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSupplier(null);
    setFormData({
      name: '',
      cnpj: '',
      proposedValue: '',
      status: 'active',
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors: Partial<SupplierFormData> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Nome é obrigatório';
    }
    
    if (!formData.cnpj.trim()) {
      errors.cnpj = 'CNPJ é obrigatório';
    } else if (formData.cnpj.replace(/\D/g, '').length !== 14) {
      errors.cnpj = 'CNPJ inválido';
    }
    
    if (!formData.proposedValue) {
      errors.proposedValue = 'Valor proposto é obrigatório';
    } else if (isNaN(Number(formData.proposedValue)) || Number(formData.proposedValue) <= 0) {
      errors.proposedValue = 'Valor proposto inválido';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Implementar lógica de salvamento
      handleCloseDialog();
    }
  };

  const handleDelete = (id: number) => {
    // Implementar lógica de exclusão
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? '#2ECC71' : '#7F8C8D';
  };

  const handleInputChange = (field: keyof SupplierFormData) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    const value = event.target.value as string;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Limpa o erro do campo quando ele é alterado
    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      status: event.target.value as 'active' | 'inactive',
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ 
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
      }}>
        {/* Cabeçalho */}
        <Box sx={{ 
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          p: 3,
          mb: 3,
          borderRadius: '0 0 20px 20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}>
          <Container maxWidth="xl">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" sx={{ 
                color: 'white',
                fontWeight: 700,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}>
                Gestão de Fornecedores
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
                sx={{
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                  fontWeight: 600,
                  '&:hover': {
                    background: 'rgba(255,255,255,0.3)',
                  },
                }}
              >
                Novo Fornecedor
              </Button>
            </Box>
          </Container>
        </Box>

        <Container maxWidth="xl">
          {/* Barra de pesquisa e filtros */}
          <StyledPaper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500 }}>
                Pesquisar Fornecedores:
              </Typography>
              <TextField
                fullWidth
                placeholder="Digite o nome ou CNPJ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: theme.palette.primary.main }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'rgba(255,255,255,0.7)',
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  borderRadius: 2,
                  fontWeight: 600,
                }}
              >
                Buscar
              </Button>
              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                sx={{
                  borderRadius: 2,
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                }}
              >
                Filtros
              </Button>
            </Box>
          </StyledPaper>

          {/* Tabela de fornecedores */}
          <StyledPaper>
            <TableContainer>
              <Table>
                <StyledTableHead>
                  <TableRow>
                    <TableCell>Nome do Fornecedor</TableCell>
                    <TableCell>CNPJ</TableCell>
                    <TableCell>Valor Proposto (R$)</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {suppliers.map((supplier) => (
                    <TableRow 
                      key={supplier.id}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(37,99,235,0.02)',
                        },
                      }}
                    >
                      <TableCell>{supplier.name}</TableCell>
                      <TableCell>{supplier.cnpj}</TableCell>
                      <TableCell>{formatCurrency(supplier.proposedValue)}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            bgcolor: supplier.status === 'active' ? theme.palette.success.main : theme.palette.grey[500],
                            color: 'white',
                            py: 0.5,
                            px: 2,
                            borderRadius: 15,
                            display: 'inline-block',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          }}
                        >
                          {supplier.status === 'active' ? 'Ativo' : 'Inativo'}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleOpenDialog(supplier)}
                          sx={{ 
                            color: theme.palette.primary.main,
                            '&:hover': {
                              backgroundColor: 'rgba(37,99,235,0.1)',
                            },
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(supplier.id)}
                          sx={{ 
                            color: theme.palette.error.main,
                            '&:hover': {
                              backgroundColor: 'rgba(239,68,68,0.1)',
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Paginação */}
            <Box sx={{ 
              mt: 2, 
              p: 2,
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              borderTop: `1px solid ${theme.palette.divider}`,
            }}>
              <Typography variant="body2" color="text.secondary">
                Exibindo 1-5 de 12 fornecedores
              </Typography>
              <Pagination
                count={3}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                sx={{
                  '& .MuiPaginationItem-root': {
                    fontWeight: 500,
                  },
                }}
              />
            </Box>
          </StyledPaper>

          {/* Modal de Cadastro/Edição */}
          <Dialog 
            open={openDialog} 
            onClose={handleCloseDialog} 
            maxWidth="sm" 
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              },
            }}
          >
            <DialogTitle sx={{ 
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              color: 'white',
              fontWeight: 700,
            }}>
              {selectedSupplier ? 'Editar Fornecedor' : 'Cadastrar Fornecedor'}
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Nome do Fornecedor"
                  fullWidth
                  required
                  placeholder="Digite o nome completo..."
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
                <CNPJInput
                  label="CNPJ"
                  fullWidth
                  required
                  placeholder="00.000.000/0000-00"
                  value={formData.cnpj}
                  onChange={handleInputChange('cnpj')}
                  error={!!formErrors.cnpj}
                  helperText={formErrors.cnpj}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
                <TextField
                  label="Valor Proposto (R$)"
                  fullWidth
                  required
                  placeholder="0,00"
                  type="number"
                  value={formData.proposedValue}
                  onChange={handleInputChange('proposedValue')}
                  error={!!formErrors.proposedValue}
                  helperText={formErrors.proposedValue}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    value={formData.status}
                    onChange={handleStatusChange}
                    sx={{
                      borderRadius: 2,
                    }}
                  >
                    <MenuItem value="active">Ativo</MenuItem>
                    <MenuItem value="inactive">Inativo</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button
                onClick={handleCloseDialog}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  borderColor: theme.palette.grey[300],
                  color: theme.palette.grey[700],
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                variant="contained"
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                  },
                }}
              >
                Salvar
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </motion.div>
  );
}; 