<template>
  <div v-if="show" class="modal show" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Dar de Baja Equipo</h5>
          <button type="button" class="close" @click="closeModal">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="validateAndSave">
            <!-- ID del Equipo -->
            <div class="form-group">
              <label for="EquipoId">ID del Equipo</label>
              <input 
                type="text" 
                class="form-control" 
                id="EquipoId" 
                v-model="formData.equipoId" 
                :class="{ 'is-invalid': errors.equipoId }"
                placeholder="Ingrese el ID del equipo"
              />
              <small v-if="errors.equipoId" class="form-text text-danger">{{ errors.equipoId }}</small>
            </div>

            <!-- Motivo de la Baja -->
            <div class="form-group">
              <label for="bajaDescripcion">Motivo de la Baja</label>
              <textarea 
                class="form-control" 
                id="bajaDescripcion" 
                v-model="formData.descripcion" 
                :class="{ 'is-invalid': errors.descripcion }" 
                rows="3"
              ></textarea>
              <small v-if="errors.descripcion" class="form-text text-danger">{{ errors.descripcion }}</small>
            </div>

            <!-- Fecha de Baja -->
            <div class="form-group">
              <label for="fechaBaja">Fecha de Baja</label>
              <input 
                type="date" 
                class="form-control" 
                id="fechaBaja" 
                v-model="formData.fechaBaja" 
                :class="{ 'is-invalid': errors.fechaBaja }"
              />
              <small v-if="errors.fechaBaja" class="form-text text-danger">{{ errors.fechaBaja }}</small>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Cerrar</button>
          <button type="button" class="btn btn-primary" @click="validateAndSave">Guardar Baja</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalBajaEquipo",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        equipoId: '',
        descripcion: '',
        fechaBaja: '',
      },
      errors: {}, // Reactivo, para manejar los errores de validación
    };
  },
  methods: {
    validateAndSave() {
      this.clearErrors();

      // Validaciones
      if (!this.formData.equipoId) {
        this.errors.equipoId = 'El ID del equipo es requerido';
      }
      if (!this.formData.descripcion) {
        this.errors.descripcion = 'El motivo de la baja es requerido';
      }
      if (!this.formData.fechaBaja) {
        this.errors.fechaBaja = 'La fecha de baja es requerida';
      }

      // Si no hay errores, emite los datos al padre
      if (Object.keys(this.errors).length === 0) {
        this.$emit('save', this.formData);
        this.closeModal();
      }
    },
    closeModal() {
      this.$emit('close');
      this.resetForm();
    },
    clearErrors() {
      this.errors = {};
    },
    resetForm() {
      this.formData = { equipoId: '', descripcion: '', fechaBaja: '' };
      this.clearErrors();
    },
  },
};
</script>

<style scoped>
.modal.show {
  display: block;
  background: rgba(0, 0, 0, 0.5);
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



  