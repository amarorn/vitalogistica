import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  Link,
  useTheme,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
  backdropFilter: 'blur(10px)',
  borderRadius: 20,
  boxShadow: '0 8px 32px rgba(37,99,235,0.1)',
  border: '1px solid rgba(255,255,255,0.2)',
}));

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Digite um email válido')
    .required('Email é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('Senha é obrigatória'),
});

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, forgotPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await signIn(values.email, values.password);
        navigate('/dashboard');
      } catch (error) {
        console.error('Erro ao fazer login:', error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleForgotPassword = async () => {
    if (!formik.values.email) {
      formik.setFieldError('email', 'Digite seu email para recuperar a senha');
      return;
    }

    try {
      setIsLoading(true);
      await forgotPassword(formik.values.email);
    } catch (error) {
      console.error('Erro ao processar recuperação de senha:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        padding: 3,
      }}
    >
      <Container maxWidth="xs">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <StyledCard>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      backgroundClip: 'text',
                      textFillColor: 'transparent',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1,
                    }}
                  >
                    VITTA Logística
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sistema de Gestão de Orçamentos
                  </Typography>
                </Box>

                <Box component="form" onSubmit={formik.handleSubmit}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'rgba(255,255,255,0.7)',
                      },
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'rgba(255,255,255,0.7)',
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isLoading}
                    sx={{
                      mt: 3,
                      mb: 2,
                      py: 1.5,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 600,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                      },
                    }}
                  >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                  </Button>
                  <Box sx={{ textAlign: 'center' }}>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={handleForgotPassword}
                      disabled={isLoading}
                      sx={{
                        color: theme.palette.primary.main,
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Esqueceu sua senha?
                    </Link>
                  </Box>
                </Box>
              </CardContent>
            </StyledCard>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}; 