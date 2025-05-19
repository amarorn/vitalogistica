import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  PictureAsPdf as PdfIcon,
} from '@mui/icons-material';
import { budgetService } from '../../services/api';
import { toast } from 'react-toastify';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`budget-tabpanel-${index}`}
      aria-labelledby={`budget-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface Budget {
  id: string;
  budgetNumber: string;
  client: string;
  requestDate: string;
  value: number;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  uf: string;
  city: string;
  route: string;
  routeId: string;
  billingType: string;
  vehicleType: string;
  frequency: string;
  approximateTime: string;
  fixedPrice: number;
  sendDate?: string;
  approvalDate?: string;
  startDate?: string;
  suppliers: {
    id: string;
    name: string;
    cnpj: string;
    value: number;
    status: 'ativo' | 'inativo';
    type: 'motorista' | 'veiculo' | 'combustivel' | 'manutencao';
  }[];
  costs: {
    fuel: number;
    maintenance: number;
    insurance: number;
    taxes: number;
    other: number;
    total: number;
  };
  margins: {
    profit: number;
    discount: number;
    total: number;
  };
}

interface FormData {
  requestDate: string;
  client: string;
  uf: string;
  city: string;
  route: string;
  routeId: string;
  billingType: string;
  vehicleType: string;
  frequency: string;
  approximateTime: string;
  fixedPrice: number;
  budgetNumber: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  suppliers: {
    id: string;
    name: string;
    cnpj: string;
    value: number;
    status: 'ativo' | 'inativo';
    type: 'motorista' | 'veiculo' | 'combustivel' | 'manutencao';
  }[];
  costs: {
    fuel: number;
    maintenance: number;
    insurance: number;
    taxes: number;
    other: number;
    total: number;
  };
  margins: {
    profit: number;
    discount: number;
    total: number;
  };
  value: number;
}

interface SupplierForm {
  name: string;
  cnpj: string;
  value: number;
  type: 'motorista' | 'veiculo' | 'combustivel' | 'manutencao';
}

interface Supplier extends SupplierForm {
  id: string;
  status: 'ativo' | 'inativo';
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

export const Budgets: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    client: '',
    status: '',
    startDate: '',
    endDate: '',
  });
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 10,
    totalCount: 0,
  });
  const [formData, setFormData] = useState<FormData>({
    requestDate: new Date().toISOString().split('T')[0],
    client: '',
    uf: '',
    city: '',
    route: '',
    routeId: '',
    billingType: '',
    vehicleType: '',
    frequency: '',
    approximateTime: '',
    fixedPrice: 0,
    budgetNumber: '',
    status: 'pendente',
    suppliers: [],
    costs: {
      fuel: 0,
      maintenance: 0,
      insurance: 0,
      taxes: 0,
      other: 0,
      total: 0,
    },
    margins: {
      profit: 0,
      discount: 0,
      total: 0,
    },
    value: 0,
  });

  const [supplierForm, setSupplierForm] = useState<SupplierForm>({
    name: '',
    cnpj: '',
    value: 0,
    type: 'motorista',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const loadBudgets = useCallback(async () => {
    try {
      setLoading(true);
      const data = await budgetService.list({
        ...filters,
        page: pagination.page + 1,
        limit: pagination.rowsPerPage,
      });
      setBudgets(data.items);
      setPagination((prev) => ({
        ...prev,
        totalCount: data.totalCount,
      }));
    } catch (error) {
      console.error('Erro ao carregar orçamentos:', error);
      toast.error('Erro ao carregar orçamentos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.rowsPerPage]);

  useEffect(() => {
    loadBudgets();
  }, [loadBudgets]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (budget?: Budget) => {
    if (budget) {
      setSelectedBudget(budget);
      setFormData({
        requestDate: budget.requestDate,
        client: budget.client,
        uf: budget.uf,
        city: budget.city,
        route: budget.route,
        routeId: budget.routeId,
        billingType: budget.billingType,
        vehicleType: budget.vehicleType,
        frequency: budget.frequency,
        approximateTime: budget.approximateTime,
        fixedPrice: budget.fixedPrice,
        budgetNumber: budget.budgetNumber,
        status: budget.status,
        suppliers: budget.suppliers,
        costs: budget.costs,
        margins: budget.margins,
        value: budget.value,
      });
    } else {
      setSelectedBudget(null);
      setFormData({
        requestDate: new Date().toISOString().split('T')[0],
        client: '',
        uf: '',
        city: '',
        route: '',
        routeId: '',
        billingType: '',
        vehicleType: '',
        frequency: '',
        approximateTime: '',
        fixedPrice: 0,
        budgetNumber: '',
        status: 'pendente',
        suppliers: [],
        costs: {
          fuel: 0,
          maintenance: 0,
          insurance: 0,
          taxes: 0,
          other: 0,
          total: 0,
        },
        margins: {
          profit: 0,
          discount: 0,
          total: 0,
        },
        value: 0,
      });
    }
  };

  const handleCloseDialog = () => {
    setSelectedBudget(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.client) {
      newErrors.client = 'Cliente é obrigatório';
    }

    if (!formData.uf) {
      newErrors.uf = 'UF é obrigatória';
    }

    if (!formData.city) {
      newErrors.city = 'Cidade é obrigatória';
    }

    if (!formData.route) {
      newErrors.route = 'Rota é obrigatória';
    }

    if (!formData.routeId) {
      newErrors.routeId = 'ID da rota é obrigatório';
    }

    if (!formData.billingType) {
      newErrors.billingType = 'Tipo de faturamento é obrigatório';
    }

    if (!formData.vehicleType) {
      newErrors.vehicleType = 'Tipo de veículo é obrigatório';
    }

    if (!formData.frequency) {
      newErrors.frequency = 'Frequência é obrigatória';
    }

    if (!formData.approximateTime) {
      newErrors.approximateTime = 'Tempo aproximado é obrigatório';
    }

    if (formData.fixedPrice <= 0) {
      newErrors.fixedPrice = 'Preço fixo deve ser maior que zero';
    }

    if (formData.suppliers.length === 0) {
      newErrors.suppliers = 'Pelo menos um fornecedor é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário.');
      return;
    }

    try {
      const budgetData = {
        ...formData,
        value: formData.value,
      };

      if (selectedBudget) {
        await budgetService.update(selectedBudget.id, budgetData);
        toast.success('Orçamento atualizado com sucesso!');
      } else {
        await budgetService.create(budgetData);
        toast.success('Orçamento criado com sucesso!');
      }

      handleCloseDialog();
      loadBudgets();
    } catch (error) {
      console.error('Erro ao salvar orçamento:', error);
      toast.error('Erro ao salvar orçamento. Tente novamente.');
    }
  };

  const handleDelete = async (budgetId: string) => {
    try {
      await budgetService.delete(budgetId);
      toast.success('Orçamento excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir orçamento:', error);
      toast.error('Erro ao excluir orçamento. Tente novamente.');
    }
  };

  const handleAddSupplier = () => {
    if (!supplierForm.name || !supplierForm.cnpj || supplierForm.value <= 0) {
      toast.error('Preencha todos os campos do fornecedor.');
      return;
    }

    const newSupplier: Supplier = {
      id: Math.random().toString(36).substr(2, 9),
      ...supplierForm,
      status: 'ativo',
    };

    setFormData({
      ...formData,
      suppliers: [...formData.suppliers, newSupplier],
    });

    setSupplierForm({
      name: '',
      cnpj: '',
      value: 0,
      type: 'motorista',
    });
  };

  const handleRemoveSupplier = (supplierId: string) => {
    setFormData({
      ...formData,
      suppliers: formData.suppliers.filter((s) => s.id !== supplierId),
    });
  };

  const handleSaveSupplier = () => {
    if (!supplierForm.name || !supplierForm.cnpj || !supplierForm.value) {
      return;
    }

    setFormData({
      ...formData,
      suppliers: [
        ...formData.suppliers,
        {
          id: Math.random().toString(36).substr(2, 9),
          name: supplierForm.name,
          cnpj: supplierForm.cnpj,
          value: Number(supplierForm.value),
          status: 'ativo',
          type: supplierForm.type,
        },
      ],
    });

    handleCloseDialog();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprovado':
        return 'success.main';
      case 'pendente':
        return 'warning.main';
      case 'rejeitado':
        return 'error.main';
      default:
        return 'text.primary';
    }
  };

  const calculateTotalCosts = () => {
    return Object.values(formData.costs).reduce((acc, value) => acc + value, 0);
  };

  const calculateTotalSuppliers = () => {
    return formData.suppliers.reduce((acc, supplier) => acc + supplier.value, 0);
  };

  const calculateTotalWithProfit = () => {
    const totalCosts = calculateTotalCosts();
    const totalSuppliers = calculateTotalSuppliers();
    const profit = (totalCosts + totalSuppliers) * (formData.margins.profit / 100);
    return totalCosts + totalSuppliers + profit;
  };

  const calculateFinalValue = () => {
    const totalWithProfit = calculateTotalWithProfit();
    const discount = totalWithProfit * (formData.margins.discount / 100);
    return totalWithProfit - discount;
  };

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
    if (numbers.length <= 8) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
    if (numbers.length <= 12) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
  };

  const handleApprove = async (budgetId: string) => {
    try {
      await budgetService.approve(budgetId);
      toast.success('Orçamento aprovado com sucesso!');
      loadBudgets();
    } catch (error) {
      console.error('Erro ao aprovar orçamento:', error);
      toast.error('Erro ao aprovar orçamento. Tente novamente.');
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPagination((prev) => ({
      ...prev,
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10),
    }));
  };

  const handleExportPdf = async (budget: Budget) => {
    try {
      const doc = new jsPDF();
      
      // Título
      doc.setFontSize(20);
      doc.text('Orçamento', 105, 20, { align: 'center' });
      
      // Informações do orçamento
      doc.setFontSize(12);
      doc.text(`Número: ${budget.budgetNumber}`, 20, 40);
      doc.text(`Cliente: ${budget.client}`, 20, 50);
      doc.text(`Data: ${formatDate(budget.requestDate)}`, 20, 60);
      doc.text(`Status: ${budget.status}`, 20, 70);
      
      // Custos
      doc.text('Custos', 20, 90);
      const costs = [
        ['Item', 'Valor'],
        ['Combustível', formatCurrency(budget.costs.fuel)],
        ['Manutenção', formatCurrency(budget.costs.maintenance)],
        ['Seguro', formatCurrency(budget.costs.insurance)],
        ['Impostos', formatCurrency(budget.costs.taxes)],
        ['Outros', formatCurrency(budget.costs.other)],
        ['Total', formatCurrency(budget.costs.total)],
      ];
      
      (doc as any).autoTable({
        startY: 100,
        head: [costs[0]],
        body: costs.slice(1),
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185] },
      });
      
      // Margens
      doc.text('Margens', 20, (doc as any).lastAutoTable.finalY + 20);
      const margins = [
        ['Item', 'Valor'],
        ['Lucro', formatCurrency(budget.margins.profit)],
        ['Desconto', formatCurrency(budget.margins.discount)],
        ['Total', formatCurrency(budget.margins.total)],
      ];
      
      (doc as any).autoTable({
        startY: (doc as any).lastAutoTable.finalY + 30,
        head: [margins[0]],
        body: margins.slice(1),
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185] },
      });
      
      // Valor final
      doc.setFontSize(14);
      doc.text(
        `Valor Final: ${formatCurrency(budget.value)}`,
        105,
        (doc as any).lastAutoTable.finalY + 20,
        { align: 'center' }
      );
      
      // Salvar o PDF
      doc.save(`orcamento-${budget.budgetNumber}.pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast.error('Erro ao gerar PDF. Tente novamente.');
    }
  };

  const calculateTotals = (data: FormData) => {
    const costsTotal = data.costs.fuel + data.costs.maintenance + data.costs.insurance + data.costs.taxes + data.costs.other;
    const marginsTotal = data.margins.profit - data.margins.discount;
    const finalValue = data.fixedPrice + costsTotal + marginsTotal;

    return {
      costs: {
        ...data.costs,
        total: costsTotal,
      },
      margins: {
        ...data.margins,
        total: marginsTotal,
      },
      value: finalValue,
    };
  };

  const handleCostChange = (field: keyof FormData['costs'], value: number) => {
    const newCosts = { ...formData.costs, [field]: value };
    const totals = calculateTotals({ ...formData, costs: newCosts });
    setFormData({
      ...formData,
      costs: totals.costs,
      margins: totals.margins,
      value: totals.value,
    });
  };

  const handleMarginChange = (field: keyof FormData['margins'], value: number) => {
    const newMargins = { ...formData.margins, [field]: value };
    const totals = calculateTotals({ ...formData, margins: newMargins });
    setFormData({
      ...formData,
      costs: totals.costs,
      margins: totals.margins,
      value: totals.value,
    });
  };

  const handleFixedPriceChange = (value: number) => {
    const totals = calculateTotals({ ...formData, fixedPrice: value });
    setFormData({
      ...formData,
      fixedPrice: value,
      costs: totals.costs,
      margins: totals.margins,
      value: totals.value,
    });
  };

  const calculateProgress = () => {
    let total = 0;
    let completed = 0;

    // Cliente
    total++;
    if (formData.client) completed++;

    // Localização
    total += 2;
    if (formData.uf) completed++;
    if (formData.city) completed++;

    // Rota
    total += 2;
    if (formData.route) completed++;
    if (formData.routeId) completed++;

    // Detalhes de operação
    total += 2;
    if (formData.billingType) completed++;
    if (formData.vehicleType) completed++;

    // Frequência e horário
    total += 2;
    if (formData.frequency) completed++;
    if (formData.approximateTime) completed++;

    // Fornecedores
    total++;
    if (formData.suppliers.length > 0) completed++;

    // Preço fixo
    total++;
    if (formData.fixedPrice > 0) completed++;

    return Math.round((completed / total) * 100);
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
          Orçamentos
        </Typography>
      </motion.div>

      <MotionBox
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <StyledPaper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h4">Orçamentos</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Novo Orçamento
            </Button>
          </Box>

          <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
              <Box>
                <TextField
                  fullWidth
                  label="Cliente"
                  value={filters.client}
                  onChange={(e) => handleFilterChange('client', e.target.value)}
                  size="small"
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  select
                  label="Status"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  size="small"
                >
                  <MenuItem value="">Todos</MenuItem>
                  <MenuItem value="pendente">Pendente</MenuItem>
                  <MenuItem value="aprovado">Aprovado</MenuItem>
                  <MenuItem value="rejeitado">Rejeitado</MenuItem>
                </TextField>
              </Box>
              <Box>
                <TextField
                  fullWidth
                  type="date"
                  label="Data Inicial"
                  value={filters.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  type="date"
                  label="Data Final"
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Box>
          </Paper>

          {loading ? (
            <LinearProgress />
          ) : (
            <Paper sx={{ width: '100%', mb: 2 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Número</TableCell>
                      <TableCell>Cliente</TableCell>
                      <TableCell>Data</TableCell>
                      <TableCell>Valor</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {budgets?.map((budget) => (
                      <TableRow key={budget.id}>
                        <TableCell>{budget.budgetNumber}</TableCell>
                        <TableCell>{budget.client}</TableCell>
                        <TableCell>{formatDate(budget.requestDate)}</TableCell>
                        <TableCell>{formatCurrency(budget.value)}</TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              color: getStatusColor(budget.status),
                              textTransform: 'capitalize',
                            }}
                          >
                            {budget.status}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={() => handleExportPdf(budget)}
                            sx={{ mr: 1 }}
                          >
                            <PdfIcon />
                          </IconButton>
                          {budget.status === 'pendente' && (
                            <IconButton
                              size="small"
                              onClick={() => handleApprove(budget.id)}
                              color="success"
                              sx={{ mr: 1 }}
                            >
                              <CheckIcon />
                            </IconButton>
                          )}
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDialog(budget)}
                            sx={{ mr: 1 }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(budget.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={pagination.totalCount}
                rowsPerPage={pagination.rowsPerPage}
                page={pagination.page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Itens por página"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} de ${count}`
                }
              />
            </Paper>
          )}
        </StyledPaper>
      </MotionBox>

      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Dados Gerais" />
            <Tab label="Fornecedores" />
            <Tab label="Custos e Margens" />
            <Tab label="Validações" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Informações Básicas
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    label="Data da Solicitação"
                    type="date"
                    value={formData.requestDate}
                    onChange={(e) => setFormData({ ...formData, requestDate: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Box>
                <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    label="Número do Orçamento"
                    value={formData.budgetNumber}
                    onChange={(e) => setFormData({ ...formData, budgetNumber: e.target.value })}
                    required
                  />
                </Box>
                <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    select
                    label="Status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Budget['status'] })}
                  >
                    <MenuItem value="rascunho">Rascunho</MenuItem>
                    <MenuItem value="pendente">Pendente</MenuItem>
                    <MenuItem value="aprovado">Aprovado</MenuItem>
                    <MenuItem value="rejeitado">Rejeitado</MenuItem>
                  </TextField>
                </Box>
                <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    select
                    label="Cliente"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    required
                    error={!!errors.client}
                    helperText={errors.client}
                  >
                    <MenuItem value="cliente1">Cliente 1</MenuItem>
                    <MenuItem value="cliente2">Cliente 2</MenuItem>
                  </TextField>
                </Box>
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Localização
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: '1 1 150px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    select
                    label="UF"
                    value={formData.uf}
                    onChange={(e) => setFormData({ ...formData, uf: e.target.value })}
                    required
                    error={!!errors.uf}
                    helperText={errors.uf}
                  >
                    <MenuItem value="SP">SP</MenuItem>
                    <MenuItem value="RJ">RJ</MenuItem>
                  </TextField>
                </Box>
                <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    select
                    label="Cidade"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                    error={!!errors.city}
                    helperText={errors.city}
                  >
                    <MenuItem value="sao-paulo">São Paulo</MenuItem>
                    <MenuItem value="rio-de-janeiro">Rio de Janeiro</MenuItem>
                  </TextField>
                </Box>
                <Box sx={{ flex: '1 1 250px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    select
                    label="Rota"
                    value={formData.route}
                    onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                    required
                    error={!!errors.route}
                    helperText={errors.route}
                  >
                    <MenuItem value="rota1">Rota 1</MenuItem>
                    <MenuItem value="rota2">Rota 2</MenuItem>
                  </TextField>
                </Box>
                <Box sx={{ flex: '1 1 150px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    label="ID da Rota"
                    value={formData.routeId}
                    onChange={(e) => setFormData({ ...formData, routeId: e.target.value })}
                    required
                    error={!!errors.routeId}
                    helperText={errors.routeId}
                  />
                </Box>
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Detalhes de Operação
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    select
                    label="Tipo de Faturamento"
                    value={formData.billingType}
                    onChange={(e) => setFormData({ ...formData, billingType: e.target.value })}
                    required
                    error={!!errors.billingType}
                    helperText={errors.billingType}
                  >
                    <MenuItem value="km">Por Quilômetro</MenuItem>
                    <MenuItem value="hora">Por Hora</MenuItem>
                    <MenuItem value="diaria">Por Diária</MenuItem>
                    <MenuItem value="mensal">Por Mês</MenuItem>
                  </TextField>
                </Box>
                <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    select
                    label="Tipo de Veículo"
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                    required
                    error={!!errors.vehicleType}
                    helperText={errors.vehicleType}
                  >
                    <MenuItem value="van">Van</MenuItem>
                    <MenuItem value="caminhao">Caminhão</MenuItem>
                    <MenuItem value="carro">Carro</MenuItem>
                    <MenuItem value="moto">Moto</MenuItem>
                  </TextField>
                </Box>
                <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    select
                    label="Frequência"
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    required
                    error={!!errors.frequency}
                    helperText={errors.frequency}
                  >
                    <MenuItem value="diaria">Diária</MenuItem>
                    <MenuItem value="semanal">Semanal</MenuItem>
                    <MenuItem value="quinzenal">Quinzenal</MenuItem>
                    <MenuItem value="mensal">Mensal</MenuItem>
                  </TextField>
                </Box>
                <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    type="time"
                    label="Horário Aproximado"
                    value={formData.approximateTime}
                    onChange={(e) => setFormData({ ...formData, approximateTime: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                    required
                    error={!!errors.approximateTime}
                    helperText={errors.approximateTime}
                  />
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Preço e Datas Importantes
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    label="Preço Fixo (R$)"
                    type="number"
                    value={formData.fixedPrice}
                    onChange={(e) => handleFixedPriceChange(Number(e.target.value))}
                    InputProps={{
                      startAdornment: 'R$',
                    }}
                    required
                    error={!!errors.fixedPrice}
                    helperText={errors.fixedPrice}
                  />
                </Box>
                <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Data de Envio"
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
                <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Data de Aprovação"
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
                <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Data de Início"
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
              </Box>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="body2" color="error">
                * Campos obrigatórios
              </Typography>
              <Box sx={{ mt: 2 }}>
                <LinearProgress variant="determinate" value={25} />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  1 de 4 - Dados Gerais
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" onClick={handleCloseDialog}>
                Cancelar
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Salvar
              </Button>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Fornecedores</Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddSupplier}
                >
                  Adicionar Fornecedor
                </Button>
              </Box>

              <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Cadastrar Fornecedor
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Nome do Fornecedor"
                    value={supplierForm.name}
                    onChange={(e) => setSupplierForm({ ...supplierForm, name: e.target.value })}
                    required
                    placeholder="Digite o nome completo..."
                  />
                  <TextField
                    fullWidth
                    label="CNPJ"
                    value={supplierForm.cnpj}
                    onChange={(e) => setSupplierForm({ ...supplierForm, cnpj: formatCNPJ(e.target.value) })}
                    required
                    placeholder="00.000.000/0000-00"
                  />
                  <TextField
                    fullWidth
                    label="Valor Proposto (R$)"
                    type="number"
                    value={supplierForm.value}
                    onChange={(e) => setSupplierForm({ ...supplierForm, value: Number(e.target.value) })}
                    required
                    InputProps={{
                      startAdornment: 'R$',
                    }}
                  />
                  <TextField
                    fullWidth
                    select
                    label="Tipo"
                    value={supplierForm.type}
                    onChange={(e) => setSupplierForm({ ...supplierForm, type: e.target.value as any })}
                  >
                    <MenuItem value="motorista">Motorista</MenuItem>
                    <MenuItem value="veiculo">Veículo</MenuItem>
                    <MenuItem value="combustivel">Combustível</MenuItem>
                    <MenuItem value="manutencao">Manutenção</MenuItem>
                  </TextField>
                </Box>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <Button
                    variant="outlined"
                    onClick={() => setSupplierForm({
                      name: '',
                      cnpj: '',
                      value: 0,
                      type: 'motorista',
                    })}
                  >
                    Limpar
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSaveSupplier}
                  >
                    Salvar
                  </Button>
                </Box>
                <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                  * Campos obrigatórios
                </Typography>
              </Paper>

              <Typography variant="h6" gutterBottom>
                Fornecedores Cadastrados
              </Typography>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>CNPJ</TableCell>
                      <TableCell>Valor</TableCell>
                      <TableCell>Tipo</TableCell>
                      <TableCell align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formData.suppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell>{supplier.name}</TableCell>
                        <TableCell>{supplier.cnpj}</TableCell>
                        <TableCell>{formatCurrency(supplier.value)}</TableCell>
                        <TableCell>
                          <Typography sx={{ textTransform: 'capitalize' }}>
                            {supplier.type}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveSupplier(supplier.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {errors.suppliers && (
                <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                  {errors.suppliers}
                </Typography>
              )}
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Custos Operacionais
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    label="Combustível (R$)"
                    type="number"
                    value={formData.costs.fuel}
                    onChange={(e) => handleCostChange('fuel', Number(e.target.value))}
                    InputProps={{
                      startAdornment: 'R$',
                    }}
                  />
                </Box>
                <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    label="Manutenção (R$)"
                    type="number"
                    value={formData.costs.maintenance}
                    onChange={(e) => handleCostChange('maintenance', Number(e.target.value))}
                    InputProps={{
                      startAdornment: 'R$',
                    }}
                  />
                </Box>
                <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    label="Seguro (R$)"
                    type="number"
                    value={formData.costs.insurance}
                    onChange={(e) => handleCostChange('insurance', Number(e.target.value))}
                    InputProps={{
                      startAdornment: 'R$',
                    }}
                  />
                </Box>
                <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    label="Impostos (R$)"
                    type="number"
                    value={formData.costs.taxes}
                    onChange={(e) => handleCostChange('taxes', Number(e.target.value))}
                    InputProps={{
                      startAdornment: 'R$',
                    }}
                  />
                </Box>
                <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    label="Outros (R$)"
                    type="number"
                    value={formData.costs.other}
                    onChange={(e) => handleCostChange('other', Number(e.target.value))}
                    InputProps={{
                      startAdornment: 'R$',
                    }}
                  />
                </Box>
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Margens
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    label="Margem de Lucro (%)"
                    type="number"
                    value={formData.margins.profit}
                    onChange={(e) => handleMarginChange('profit', Number(e.target.value))}
                    InputProps={{
                      endAdornment: '%',
                    }}
                  />
                </Box>
                <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    label="Desconto (%)"
                    type="number"
                    value={formData.margins.discount}
                    onChange={(e) => handleMarginChange('discount', Number(e.target.value))}
                    InputProps={{
                      endAdornment: '%',
                    }}
                  />
                </Box>
              </Box>
            </Box>

            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Resumo Financeiro
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Custos Operacionais:</Typography>
                  <Typography>{formatCurrency(calculateTotalCosts())}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Custos com Fornecedores:</Typography>
                  <Typography>{formatCurrency(calculateTotalSuppliers())}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Subtotal:</Typography>
                  <Typography>{formatCurrency(calculateTotalCosts() + calculateTotalSuppliers())}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Margem de Lucro ({formData.margins.profit}%):</Typography>
                  <Typography>{formatCurrency(calculateTotalWithProfit() - (calculateTotalCosts() + calculateTotalSuppliers()))}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Desconto ({formData.margins.discount}%):</Typography>
                  <Typography color="error.main">-{formatCurrency(calculateTotalWithProfit() * (formData.margins.discount / 100))}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', borderTop: 1, borderColor: 'divider', pt: 1, mt: 1 }}>
                  <Typography variant="h6">Valor Final:</Typography>
                  <Typography variant="h6" color="primary.main">{formatCurrency(calculateFinalValue())}</Typography>
                </Box>
              </Box>
            </Paper>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Validações do Orçamento
              </Typography>

              <Paper sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: formData.client ? 'success.main' : 'error.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      }}
                    >
                      {formData.client ? '✓' : '✗'}
                    </Box>
                    <Typography>
                      Cliente selecionado
                      {!formData.client && (
                        <Typography component="span" color="error.main" sx={{ ml: 1 }}>
                          - Cliente é obrigatório
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: formData.uf && formData.city ? 'success.main' : 'error.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      }}
                    >
                      {formData.uf && formData.city ? '✓' : '✗'}
                    </Box>
                    <Typography>
                      Localização definida
                      {(!formData.uf || !formData.city) && (
                        <Typography component="span" color="error.main" sx={{ ml: 1 }}>
                          - UF e Cidade são obrigatórios
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: formData.route && formData.routeId ? 'success.main' : 'error.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      }}
                    >
                      {formData.route && formData.routeId ? '✓' : '✗'}
                    </Box>
                    <Typography>
                      Rota definida
                      {(!formData.route || !formData.routeId) && (
                        <Typography component="span" color="error.main" sx={{ ml: 1 }}>
                          - Rota e ID da rota são obrigatórios
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: formData.billingType && formData.vehicleType ? 'success.main' : 'error.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      }}
                    >
                      {formData.billingType && formData.vehicleType ? '✓' : '✗'}
                    </Box>
                    <Typography>
                      Detalhes de operação definidos
                      {(!formData.billingType || !formData.vehicleType) && (
                        <Typography component="span" color="error.main" sx={{ ml: 1 }}>
                          - Tipo de faturamento e veículo são obrigatórios
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: formData.frequency && formData.approximateTime ? 'success.main' : 'error.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      }}
                    >
                      {formData.frequency && formData.approximateTime ? '✓' : '✗'}
                    </Box>
                    <Typography>
                      Frequência e horário definidos
                      {(!formData.frequency || !formData.approximateTime) && (
                        <Typography component="span" color="error.main" sx={{ ml: 1 }}>
                          - Frequência e horário são obrigatórios
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: formData.suppliers.length > 0 ? 'success.main' : 'error.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      }}
                    >
                      {formData.suppliers.length > 0 ? '✓' : '✗'}
                    </Box>
                    <Typography>
                      Fornecedores cadastrados
                      {formData.suppliers.length === 0 && (
                        <Typography component="span" color="error.main" sx={{ ml: 1 }}>
                          - Pelo menos um fornecedor é obrigatório
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: formData.fixedPrice > 0 ? 'success.main' : 'error.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      }}
                    >
                      {formData.fixedPrice > 0 ? '✓' : '✗'}
                    </Box>
                    <Typography>
                      Preço fixo definido
                      {formData.fixedPrice <= 0 && (
                        <Typography component="span" color="error.main" sx={{ ml: 1 }}>
                          - Preço fixo deve ser maior que zero
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Progresso do Orçamento
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={calculateProgress()}
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {calculateProgress()}% completo
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </TabPanel>
        </Paper>
      </MotionBox>
    </Box>
  );
}; 