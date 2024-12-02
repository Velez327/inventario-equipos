<template>
           <AppNavbar />
    <div class="container">
        <h1 class="page-title">Gestión de Mantenimiento de Equipos</h1>
        <div class="text-right mb-3">
            <button class="btn btn-primary" @click="abrirModal">Añadir Nuevo Mantenimiento</button>
        </div>

        <table class="table table-bordered table-striped">
            <thead class="thead-dark"> 
                <tr>
                    <th>ID</th>
                    <th>Equipo</th>
                    <th>Tipo de Mantenimiento</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Finalización</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="(mantenimiento, index) in listaMantenimientos" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ mantenimiento.equipoNom }}</td>
                <td>{{ mantenimiento.tipoMantenimiento }}</td>
                <td>{{ mantenimiento.fechaInicio }}</td>
                <td>{{ mantenimiento.fechaFin }}</td>
                <td>{{ mantenimiento.descripcion }}</td>
                <td>
                    <button class="btn btn-warning btn-sm" @click="abrirModal('editar', index)">Editar</button>
                    <button class="btn btn-danger btn-sm" @click="eliminarMantenimiento(index)">Eliminar</button>
                </td>
            </tr>
        </tbody>
        </table>

        <!-- Modal -->
        <div class="modal fade" id="mantenimientoModal" tabindex="-1" role="dialog" aria-labelledby="mantenimientoModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="mantenimientoModalLabel">{{ modalTitle }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="equipoNom">Equipo</label>
                                <input type="text" class="form-control" v-model="equipoNom" placeholder="Nombre del Equipo">
                                <small v-if="formSubmitted && !validarEquipoNom(equipoNom)" class="form-text text-danger">Ingrese un Nombre de equipo válido.</small>
                            </div>
                            <div class="form-group">
                                <label for="tipoMantenimiento">Tipo de Mantenimiento</label>
                                <select class="form-control" v-model="tipoMantenimiento">
                                    <option value="">Seleccione un tipo de mantenimiento</option>
                                    <option value="Preventivo">Preventivo</option>
                                    <option value="Correctivo">Correctivo</option>
                                </select>
                                <small v-if="formSubmitted && !validarTipoMantenimiento(tipoMantenimiento)" class="form-text text-danger">Seleccione un tipo de mantenimiento.</small>
                            </div>
                            <div class="form-group">
                                <label for="fechaInicio">Fecha de Inicio</label>
                                <input type="date" class="form-control" v-model="fechaInicio">
                                <small v-if="formSubmitted && !validarFechas(fechaInicio, fechaFin)" class="form-text text-danger">Ingrese una fecha de inicio válida.</small>
                            </div>
                            <div class="form-group">
                                <label for="fechaFin">Fecha de Finalización</label>
                                <input type="date" class="form-control" v-model="fechaFin">
                                <small v-if="formSubmitted && !validarFechas(fechaInicio, fechaFin)" class="form-text text-danger">Ingrese una fecha de finalización válida.</small>
                            </div>
                            <div class="form-group">
                                <label for="descripcion">Descripción del Mantenimiento</label>
                                <textarea class="form-control" v-model="descripcion" rows="3"></textarea>
                                <small v-if="formSubmitted && !validarDescripcion(descripcion)" class="form-text text-danger">La descripción es obligatoria.</small>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="guardarMantenimiento">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer class="bg-dark text-white text-center p-3 mt-4">
            <p>© 2024 ULEAM - Sistema de Gestión de Inventario</p>
        </footer>
</template>

<script>
import AppNavbar from '@/components/barranavegacion.vue';
import 'bootstrap/dist/css/bootstrap.css';
import { Modal } from 'bootstrap';
export default {
    name: 'GestionMantenimiento',
    components: {
        AppNavbar
    },
    data() {
        return {
            equipoNom: '',
            tipoMantenimiento: '',
            fechaInicio: '',
            fechaFin: '',
            descripcion: '',
            listaMantenimientos: [],
            editingIndex: null, // Nuevo: para identificar si se está editando
            modalTitle: 'Añadir Mantenimiento',
            formSubmitted: false // Nuevo: para manejar las validaciones
        };
    },
    methods: {
        validarEquipoNom(EquipoNom) {
            return EquipoNom !== '';
        },
        validarTipoMantenimiento(tipo) {
            return tipo !== '';
        },
        validarFechas(fechaInicio, fechaFin) {
            const inicio = new Date(fechaInicio);
            const fin = new Date(fechaFin);
            return inicio <= fin;
        },
        validarDescripcion(descripcion) {
            return descripcion.trim() !== '';
        },
        guardarMantenimiento() {
            this.formSubmitted = true; // Marca que el formulario fue enviado
            if (
                this.validarEquipoNom(this.equipoNom) &&
                this.validarTipoMantenimiento(this.tipoMantenimiento) &&
                this.validarFechas(this.fechaInicio, this.fechaFin) &&
                this.validarDescripcion(this.descripcion)
            ) {
                const nuevoMantenimiento = {
                    equipoNom: this.equipoNom, // Asegúrate de guardar el nombre del equipo
                    tipoMantenimiento: this.tipoMantenimiento,
                    fechaInicio: this.fechaInicio,
                    fechaFin: this.fechaFin,
                    descripcion: this.descripcion
                };

                if (this.editingIndex !== null) {
                    // Si estás editando, actualiza el elemento existente
                    this.listaMantenimientos[this.editingIndex] = nuevoMantenimiento;
                } else {
                    // Si es nuevo, agrégalo a la lista
                    this.listaMantenimientos.push(nuevoMantenimiento);
                }

                // Guarda en localStorage
                localStorage.setItem('mantenimientos', JSON.stringify(this.listaMantenimientos));

                // Limpia el formulario
                this.resetForm();

                // Cierra el modal
                const modal = Modal.getInstance(document.getElementById('mantenimientoModal'));
                modal.hide();

                alert('Mantenimiento guardado con éxito');
            }
        },
        abrirModal(modo, index = null) {
            this.formSubmitted = false;
            this.editingIndex = index;
            if (modo === 'editar' && index !== null) {
                const mantenimiento = this.listaMantenimientos[index];
                this.equipoNom = mantenimiento.equipoNom;
                this.tipoMantenimiento = mantenimiento.tipoMantenimiento;
                this.fechaInicio = mantenimiento.fechaInicio;
                this.fechaFin = mantenimiento.fechaFin;
                this.descripcion = mantenimiento.descripcion;
                this.modalTitle = 'Editar Mantenimiento';
            } else {
                this.resetForm();
                this.modalTitle = 'Añadir Mantenimiento';
            }
            const modal = new Modal(document.getElementById('mantenimientoModal'));
            modal.show();
        },
        cerrarModal() {
            this.resetForm();
            const modal = Modal.getInstance(document.getElementById('mantenimientoModal'));
            modal.hide();
        },
        resetForm() {
            this.equipoNom = '';
            this.tipoMantenimiento = '';
            this.fechaInicio = '';
            this.fechaFin = '';
            this.descripcion = '';
            this.editingIndex = null;
        },
        eliminarMantenimiento(index) {
            this.listaMantenimientos.splice(index, 1);
        }
    }
};
</script>

<style scoped>
    body {
    background-color: #f8f9fa;
    font-family: Arial, sans-serif;
}

.navbar {
    margin-bottom: 20px;
}

.page-title {
    margin: 20px 0;
    text-align: center;
    font-size: 2rem;
    color: #343a40;
}

.table {
    margin-top: 20px;
}

.thead-dark th {
    background-color: #343a40;
    color: white;
}

.table td {
    text-align: center;
    vertical-align: middle;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}

.btn-warning {
    background-color: #ffc107;
    border-color: #ffc107;
}

.btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
}

footer {
    background-color: #343a40;
    color: white;
    padding: 10px 0;
    width: 100%;
    bottom: 0;
    text-align: center;
}

.modal-header {
    background-color: #007bff;
    color: white;
}

.modal-footer .btn-primary {
    background-color: #28a745;
    border-color: #28a745;
}
</style>