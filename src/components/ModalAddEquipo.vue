<template>
    <div class="modal" :class="{ show: show }" tabindex="-1" role="dialog" :style="{ display: show ? 'block' : 'none' }">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Añadir Nuevo Equipo</h5>
          <button type="button" class="close" @click="closeModal">
            <span>&times;</span> 
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="ID">ID</label>
                <input
                    type="text"
                    class="form-control"
                    id="id"
                    v-model="formData.id"
                    placeholder="El ID se generará automaticamente"
                    readonly
                />
                </div>
                <div class="form-group">
                <label for="tipoEquipo">Tipo de Equipo</label>
                <input 
                    type="text"
                    class="form-control"
                    id="tipoEquipo"
                    v-model="formData.tipo"
                    placeholder="Ingrese tipo de equipo"
                />
                <small v-if="errors.tipo" class="form-text text-danger">{{ errors.tipo }}</small>
                </div>

                <div class="form-group">
                <label for="marca">Marca</label>
                <input
                    type="text"
                    class="form-control"
                    id="marca"
                    v-model="formData.marca"
                    placeholder="Ingrese marca"
                />
                <small v-if="errors.marca" class="form-text text-danger">{{ errors.marca }}</small>
                </div>

                <div class="form-group">
                <label for="modelo">Modelo</label>
                <input
                    type="text"
                    class="form-control"
                    id="modelo"
                    v-model="formData.modelo"
                    placeholder="Ingrese modelo"
                />
                <small v-if="errors.modelo" class="form-text text-danger">{{ errors.modelo }}</small>
                </div>

                <div class="form-group">
                <label for="Numserie">Número de Serie</label>
                <input
                    type="text"
                    class="form-control"
                    id="Numserie"
                    v-model="formData.numeroSerie"
                    placeholder="Ingrese número de serie"
                />
                <small v-if="errors.numeroSerie" class="form-text text-danger">{{ errors.numeroSerie }}</small>
                </div>

                <div class="form-group">
                <label for="ubicacion">Ubicación</label>
                <input
                    type="text"
                    class="form-control"
                    id="ubicacion"
                    v-model="formData.ubicacion"
                    placeholder="Ingrese ubicación"
                />
                <small v-if="errors.ubicacion" class="form-text text-danger">{{ errors.ubicacion }}</small>
                </div>

                <div class="form-group">
                <label for="asignadoA">Asignado a:</label>
                <input
                    type="text"
                    class="form-control"
                    id="asignadoA"
                    v-model="formData.asignadoA"
                    placeholder="Ingrese a quien está asignado"
                />
                <small v-if="errors.asignadoA" class="form-text text-danger">{{ errors.asignadoA }}</small>
                </div>

                <div class="form-group">
                <label for="estado">Estado</label>
                <select class="form-control" v-model="formData.estado" @blur="validateEstado">
                    <option value="">Seleccione un estado</option>
                    <option value="Operativo">Operativo</option>
                    <option value="En Mantenimiento">En Mantenimiento</option>
                    <option value="Dado de Baja">Dado de Baja</option>
                </select>
                <small v-if="errors.estado" class="form-text text-danger">{{ errors.estado }}</small>
                </div>

                <div class="form-group">
                <label for="fechaCompra">Fecha Compra</label>
                <input
                    type="date"
                    class="form-control"
                    id="fechaCompra"
                    v-model="formData.fechaCompra"
                />
                <small v-if="errors.fechaCompra" class="form-text text-danger">{{ errors.fechaCompra }}</small>
                </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Cerrar</button>
            <button type="button" class="btn btn-primary" @click="validateAndSave">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ModalAddEquipo",
    props: {
      show: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        formData: {
          id: '',
          tipo: '',
          marca: '',
          modelo: '',
          numeroSerie: '',
          ubicacion: '',
          asignadoA: '',
          estado: '',
          fechaCompra: '',
        },
        errors: {
          id: '',
          tipo: '',
          marca: '',
          modelo: '',
          numeroSerie: '',
          ubicacion: '',
          asignadoA: '',
          estado: '',
          fechaCompra: '',
        },
      };
    },
    methods: {
      closeModal() {
        this.$emit('close');
        this.resetForm();
      },
      validateAndSave() {
        this.clearErrors();
        // Validar campos
        if (!this.formData.tipo) {
          this.errors.tipo = 'El tipo de equipo es requerido';
        }
        if (!this.formData.marca) {
          this.errors.marca = 'La marca es requerida';
        }
        if (!this.formData.modelo) {
          this.errors.modelo = 'El modelo es requerido';
        }
        if (!this.formData.numeroSerie) {
          this.errors.numeroSerie = 'El número de serie es requerido';
        }
        if (!this.formData.ubicacion) {
          this.errors.ubicacion = 'La ubicación es requerida';
        }
        if (!this.formData.asignadoA) {
          this.errors.asignadoA = 'La persona asignada es requerida';
        }
        if (!this.formData.estado) {
          this.errors.estado = 'El estado es requerido';
        }
        if (!this.formData.fechaCompra) {
          this.errors.fechaCompra = 'La fecha de compra es requerida';
        }
        // Agrega validaciones para los demás campos
  
        // Si no hay errores, emite el evento para guardar
        if (!Object.values(this.errors).some(error => error)) {
          this.$emit('save', this.formData);
          this.closeModal();
        }
      },
      clearErrors() {
        this.errors = {
          id: '',
          tipo: '',
          marca: '',
          modelo: '', 
          numeroSerie: '',
          ubicacion: '',
          asignadoA: '',
          estado: '',
          fechaCompra: '',
        };
      },
      resetForm() {
        this.formData = {
          id: '',
          tipo: '',
          marca: '',
          modelo: '',
          numeroSerie: '',
          ubicacion: '',
          asignadoA: '',
          estado: '',
          fechaCompra: '',
        };
      },
    },
  };
  </script>
  
<style scoped>
.modal.show {
  display: block;
  background: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
}
</style>
  