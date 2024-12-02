<template>
  <AppNavbar />
    <div class="container">
        <h1 class="page-title">Gestión de Equipos Informáticos</h1>
        <div class="text-right mb-3">
            <button class="btn btn-primary" @click="abrirModalAddEquipo">Añadir Nuevo Equipo</button>
        </div>

        <!-- Tabla de Equipos -->
        <table class="table table-bordered table-striped">
            <thead class="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Tipo de Equipo</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Número de Serie</th>
                    <th>Ubicación</th>
                    <th>Asignado a:</th>
                    <th>Estado</th>
                    <th>Fecha Compra</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(equipo, index) in equipos" :key="index">
                    <td>{{ equipo.id }}</td>
                    <td>{{ equipo.tipo }}</td>
                    <td>{{ equipo.marca }}</td>
                    <td>{{ equipo.modelo }}</td>
                    <td>{{ equipo.numeroSerie }}</td>
                    <td>{{ equipo.ubicacion }}</td>
                    <td>{{ equipo.asignadoA }}</td>
                    <td>{{ equipo.estado }}</td>
                    <td>{{ equipo.fechaCompra }}</td>
                    <td>
                        <button class="btn btn-danger" @click="abrirModalBajaEquipo(equipo)">Dar de Baja</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modales para añadir y dar de baja un equipo -->
        <ModalAddEquipo 
            :show="showAddModal" 
            @close="showAddModal = false" 
            @save="guardarNuevoEquipo"
        />
        <ModalBajaEquipo 
            :show="showBajaModal" 
            @close="showBajaModal = false"
            @save="handleSaveBaja"
        />
    </div>
    <!-- Pie de página -->
    <footer class="bg-dark text-white text-center p-3 mt-4">
        <p>© 2024 ULEAM - Sistema de Gestión de Inventario</p>
    </footer>
</template>

<script>
import AppNavbar from '@/components/barranavegacion.vue';
import ModalAddEquipo from '../components/ModalAddEquipo.vue';
import ModalBajaEquipo from '../components/ModalBajaEquipo.vue';

export default {
  name: 'g_inventario',
  components: {
    ModalAddEquipo,
    ModalBajaEquipo,
    AppNavbar
  },
  data() {
    return {
      equipos: [],
      showAddModal: false, // Controla la visibilidad del modal de añadir equipo
      showBajaModal: false, // Controla la visibilidad del modal de dar de baja
      selectedEquipo: null, // Equipo seleccionado para dar de baja
    };
  },
  methods: {
    async cargarEquiposDesdeXML() {
      try {
        const response = await fetch('/equipos.xml');
        const textData = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(textData, 'application/xml');

        const equipos = Array.from(xmlDoc.querySelectorAll('equipo')).map(equipo => ({
          id: equipo.querySelector('id').textContent,
          tipo: equipo.querySelector('tipo').textContent,
          marca: equipo.querySelector('marca').textContent,
          modelo: equipo.querySelector('modelo').textContent,
          numeroSerie: equipo.querySelector('numeroSerie').textContent,
          ubicacion: equipo.querySelector('ubicacion').textContent,
          asignadoA: equipo.querySelector('asignadoA').textContent,
          estado: equipo.querySelector('estado').textContent,
          fechaCompra: equipo.querySelector('fechaCompra').textContent,
        }));

        this.equipos = equipos; 
      } catch (error) {
        console.error("Error al cargar el archivo XML: ", error);
      }
    },
    // Método para abrir el modal de añadir equipo
    abrirModalAddEquipo() {
      this.showAddModal = true;
    },
    // Método para abrir el modal de baja de equipo
    abrirModalBajaEquipo(equipo) {
      this.selectedEquipo = equipo; // Selecciona el equipo a dar de baja
      this.showBajaModal = true;
    },
    // Método para manejar los datos enviados desde el modal de añadir equipo
    guardarNuevoEquipo(equipo) {
      // Genera un nuevo ID incrementando el mayor ID existente en la lista
      const maxId = this.equipos.length > 0 
        ? Math.max(...this.equipos.map(e => parseInt(e.id))) 
        : 0;
      equipo.id = (maxId + 1).toString(); // Asigna un nuevo ID como cadena

      // Agrega el nuevo equipo a la lista
      this.equipos.push(equipo); 
      console.log("Equipo añadido:", this.equipos);

      // Cierra el modal
      this.showAddModal = false; 
    },
    // Método para manejar la baja de equipo
    handleSaveBaja(datosBaja) {
      this.equipos = this.equipos.filter(equipo => equipo.id !== this.selectedEquipo.id); // Elimina el equipo de la lista
      console.log("Equipo dado de baja:", this.selectedEquipo, datosBaja);
      this.selectedEquipo = null; // Resetea el equipo seleccionado
      this.showBajaModal = false; // Cierra el modal
    },
  },
  mounted() {
    this.cargarEquiposDesdeXML();
  },
};
</script>

<style scoped>
    .container {
        background-color: #f8f9fa;
        font-family: Arial, sans-serif;
    }
    .page-title {
        text-align: center;
        font-size: 2rem;
        color: #343a40;
        margin: 20px 0;
    }
    .thead-dark th {
        background-color: #1881e9;
        color: white;
    }
    .table td { 
        text-align: center;
        vertical-align: middle;
    }
    .footer {
        background-color: #343a40;
        color: white;
        text-align: center;
        padding: 10px 0;
    }
</style>
