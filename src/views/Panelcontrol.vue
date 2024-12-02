<template>
    <div>
      <AppNavbar />
      <div class="container">
        <h1 class="dashboard-title">Panel de Control - Gestión de Inventario</h1>
  
        <div class="row">
          <div class="col-lg-3 col-sm-6">
            <div class="card bg-primary text-white text-center">
              <div class="card-body">
                <h4>Total Equipos</h4>
                <h2>150</h2>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="card bg-success text-white text-center">
              <div class="card-body">
                <h4>Equipos Asignados</h4>
                <h2>120</h2>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="card bg-warning text-white text-center">
              <div class="card-body">
                <h4>En Mantenimiento</h4>
                <h2>10</h2>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="card bg-danger text-white text-center">
              <div class="card-body">
                <h4>Obsoletos</h4>
                <h2>20</h2>
              </div>
            </div>
          </div>
        </div>
  
        <div class="row">
          <div class="col-lg-6">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Distribución de Equipos por Departamento</h4>
                <canvas id="departamentoChart"></canvas>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Estado de los Equipos</h4>
                <canvas id="estadoChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <footer class="bg-dark text-white text-center p-3 mt-4">
        <p>© 2024 ULEAM - Sistema de Gestión de Inventario</p>
      </footer>
    </div>
  </template>
  
  <script>
  import AppNavbar from '@/components/barranavegacion.vue';
  import { onMounted } from 'vue'
  import {
    Chart,
    PieController,
    BarController,
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    Tooltip,
    Legend
  } from 'chart.js';

  // Registra los componentes necesarios de Chart.js
  Chart.register(
    PieController,
    BarController,
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    Tooltip,
    Legend
  );
  
  export default {
    name: 'PanelControl',
    components:{
      AppNavbar
    },
    setup() {
      onMounted(() => {
      // Gráfico de Distribución de Equipos por Departamento
      createDepartamentoChart();
      createEstadoChart();
    });

    function createDepartamentoChart() {
      const ctx = document.getElementById('departamentoChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Informática', 'Administración', 'Recursos Humanos', 'Docencia'],
          datasets: [
            {
              label: 'Equipos',
              data: [50, 40, 30, 30],
              backgroundColor: ['#8A2BE2', '#28a745', '#ffc107', '#dc3545'],
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    }

    function createEstadoChart() {
      const ctx2 = document.getElementById('estadoChart').getContext('2d');
      new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: ['Operativos', 'En Mantenimiento', 'Obsoletos'],
          datasets: [
            {
              label: 'Cantidad',
              data: [120, 10, 20],
              backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    }
    }
  }
  </script>
  
  <style scoped>
    body {
        background-color: #fcfdfd;
        font-family: Arial, sans-serif;
    }

    .navbar {
        margin-bottom: 20px;
    }

    .dashboard-title {
        margin: 20px 0;
        text-align: center;
    }

    .card {
        margin: 20px 0;
    }

    .card h4 {
        font-size: 1.2rem;
    }

    .card h2 {
        font-size: 2.5rem;
    }

    .bg-primary {
        background-color: #007bff !important;
    }

    .bg-success {
        background-color: #28a745 !important;
    }

    .bg-warning {
        background-color: #ffc107 !important;
    }

    .bg-danger {
        background-color: #dc3545 !important;
    }

    footer {
        background-color: #343a40;
        color: white;
        padding: 10px 0;
        position: relative;
        width: 100%;
        bottom: 0;
        text-align: center;
    }
  </style>
  