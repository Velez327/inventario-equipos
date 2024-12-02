<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-lg" style="width: 350px; max-width: 90%;">
      <!-- Logo -->
      <div class="text-center mb-4">
        <img src="../assets/Logo_ULEAM.png" alt="Logo ULEAM" class="img-fluid logo">
      </div>

      <!-- Título -->
      <h4 class="text-center mb-4">Iniciar Sesión</h4>

      <!-- Formulario de Inicio de Sesión -->
      <form v-on:submit.prevent="login">
        <!-- Campo Usuario -->
        <div class="mb-3">
          <label for="login" class="form-label">Usuario</label>
          <input 
            type="text" 
            id="login" 
            class="form-control custom-input" 
            v-model="usuario" 
            placeholder="Ingrese su usuario"
          >
        </div>

        <!-- Campo Contraseña -->
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input 
            type="password" 
            id="password" 
            class="form-control custom-input" 
            v-model="password" 
            placeholder="Ingrese su contraseña"
          >
        </div>

        <!-- Botón Iniciar Sesión -->
        <div class="d-grid">
          <button type="submit" class="btn btn-primary">Iniciar sesión</button>
        </div>
      </form>

      <!-- Mensaje de error -->
      <div class="alert alert-danger mt-3" role="alert" v-if="error">
        {{ error_msg }}
      </div>
    </div>
  </div>
</template>

<script>
import usuarios from '@/assets/usuarioslog.json';

export default {
  name: 'LoginInv',
  data() {
    return {
      usuario: "",
      password: "",
      error: false,
      error_msg: "",
    };
  },
  methods: {
    login() {
      if (!this.usuario || !this.password) {
        this.error = true;
        this.error_msg = "Por favor, completa todos los campos.";
        return;
      }

      const usuarioEncontrado = usuarios.find(
        user => user.usuario === this.usuario && user.password === this.password
      );

      if (usuarioEncontrado) {
        console.log("Inicio de sesión exitoso");
        this.error = false;
        this.error_msg = "";
        localStorage.setItem("autenticado", "true");
        this.$router.push('/PanelControl');
      } else {
        this.error = true;
        this.error_msg = "Usuario o contraseña incorrectos.";
      }
    }
  },
  watch: {
    usuario() {
      this.error = false;
    },
    password() {
      this.error = false;
    }
  }
};
</script>
  
<style scoped>
/* Fondo claro */
body {
  background-color: #f8f9fa;
}

/* Imagen del logo */
.logo {
  width: 120px;
  height: auto;

}

/* Personalización de inputs */
.custom-input {
  height: 45px; /* Altura uniforme */
  padding: 10px;
  font-size: 16px; /* Texto más legible */
  border-radius: 8px; /* Bordes suaves */
  border: 1px solid #ced4da; /* Color consistente */
}

/* Transición para efectos de enfoque */
.custom-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Animación */
  transition: all 0.2s ease-in-out;
}

/* Tarjeta */
.card {
  border-radius: 15px; /* Bordes redondeados */
}
</style>
