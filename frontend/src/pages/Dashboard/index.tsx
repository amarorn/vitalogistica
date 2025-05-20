import React from 'react';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

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

const MotionGrid = motion(Grid);

export const Dashboard: React.FC = () => {
  const theme = useTheme();

  // Configuração do gráfico de barras
  const barOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 8,
        distributed: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      labels: {
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      title: {
        text: 'Valor (R$)',
        style: {
          color: theme.palette.text.secondary
        }
      }
    },
    fill: {
      opacity: 1,
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [0, 100]
      }
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return 'R$ ' + val.toFixed(2);
        }
      }
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main]
  };

  const barSeries = [
    {
      name: 'Orçamentos',
      data: [44, 55, 57, 56, 61, 58]
    },
    {
      name: 'Aprovados',
      data: [35, 41, 36, 26, 45, 48]
    }
  ];

  // Configuração do gráfico de donut
  const donutOptions: ApexOptions = {
    chart: {
      type: 'donut'
    },
    labels: ['Aprovados', 'Pendentes', 'Rejeitados'],
    colors: [theme.palette.secondary.main, '#22c55e', '#ef4444'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };

  const donutSeries = [44, 55, 13];

  // Configuração do gráfico de barras radiais
  const radialBarOptions: ApexOptions = {
    chart: {
      height: 350,
      type: 'radialBar'
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main, '#22c55e'],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px'
          },
          value: {
            fontSize: '16px'
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
            }
          }
        }
      }
    },
    labels: ['Orçamentos', 'Aprovados', 'Pendentes']
  };

  const radialBarSeries = [44, 55, 67];

  // Configuração do gráfico de área
  const areaOptions: ApexOptions = {
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2024-01-01',
        '2024-02-01',
        '2024-03-01',
        '2024-04-01',
        '2024-05-01',
        '2024-06-01'
      ]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy'
      }
    }
  };

  const areaSeries = [
    {
      name: 'Orçamentos',
      data: [31, 40, 28, 51, 42, 109]
    },
    {
      name: 'Aprovados',
      data: [11, 32, 45, 32, 34, 52]
    }
  ];

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
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 4
          }}
        >
          Dashboard
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        <MotionGrid 
          item 
          xs={12} 
          md={6}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StyledPaper>
            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main }}>
              Orçamentos por Mês
            </Typography>
            <ReactApexChart
              options={barOptions}
              series={barSeries}
              type="bar"
              height={350}
            />
          </StyledPaper>
        </MotionGrid>

        <MotionGrid 
          item 
          xs={12} 
          md={6}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <StyledPaper>
            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.secondary.main }}>
              Status dos Orçamentos
            </Typography>
            <ReactApexChart
              options={donutOptions}
              series={donutSeries}
              type="donut"
              height={350}
            />
          </StyledPaper>
        </MotionGrid>

        <MotionGrid 
          item 
          xs={12} 
          md={6}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <StyledPaper>
            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.success.main }}>
              Distribuição de Orçamentos
            </Typography>
            <ReactApexChart
              options={radialBarOptions}
              series={radialBarSeries}
              type="radialBar"
              height={350}
            />
          </StyledPaper>
        </MotionGrid>

        <MotionGrid 
          item 
          xs={12} 
          md={6}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <StyledPaper>
            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.info.main }}>
              Evolução dos Orçamentos
            </Typography>
            <ReactApexChart
              options={areaOptions}
              series={areaSeries}
              type="area"
              height={350}
            />
          </StyledPaper>
        </MotionGrid>
      </Grid>
    </Box>
  );
}; 