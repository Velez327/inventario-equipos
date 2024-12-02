<template>
        <AppNavbar />
    <div class="container">
      <h1 class="page-title">Gestión de Usuarios</h1>
      <div class="text-right mb-3">
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">
            Añadir Nuevo Usuario
        </button>
      </div>
      <table class="table table-bordered table-striped">
        <thead class="thead-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button class="btn btn-warning btn-sm" @click="editUser(user)">Editar</button>
              <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal -->
      <div
        class="modal fade"
        id="addUserModal"
        tabindex="-1"
        aria-labelledby="addUserModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addUserModalLabel">Añadir Nuevo Usuario</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="saveUser">
                <div class="form-group">
                  <label for="userName">Nombre</label>
                  <input
                    type="text"
                    class="form-control"
                    id="userName"
                    v-model="newUser.name"
                    placeholder="Ingrese el nombre del usuario"
                  />
                  <small v-if="errors.name" class="form-text text-danger">{{ errors.name }}</small>
                </div>
                <div class="form-group">
                  <label for="userEmail">Correo Electrónico</label>
                  <input
                    type="email"
                    class="form-control"
                    id="userEmail"
                    v-model="newUser.email"
                    placeholder="Ingrese el correo electrónico"
                  />
                  <small v-if="errors.email" class="form-text text-danger">{{ errors.email }}</small>
                </div>
                <div class="form-group">
                  <label for="userRole">Rol</label>
                  <select class="form-control" v-model="newUser.role">
                    <option value="">Seleccione un rol</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Técnico">Técnico</option>
                    <option value="Usuario">Usuario</option>
                  </select>
                  <small v-if="errors.role" class="form-text text-danger">{{ errors.role }}</small>
                </div>
                <button type="submit" class="btn btn-primary">Guardar</button>
              </form>
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
  import 'bootstrap/dist/css/bootstrap.min.css';
  import { Modal } from 'bootstrap'; // Importa solo el componente Modal
  
  export default {
    name: 'GestionUsuario',
    components:{
      AppNavbar,
    },
    data() {
      return {
        modalVisible: false, // Ya no se usa porque Bootstrap maneja el modal
        editingUserId: null, // Nuevo indicador para modo de edición
        newUser: {
          name: '',
          email: '',
          role: ''
        },
        users: [],
        errors: {
          name: '',
          email: '',
          role: ''
        }
      };
    },
    mounted() {
      this.loadUsersFromJson(); // Llamamos a la función al cargar el componente
    },
    methods: {
      openModal() {
        this.resetForm();
        this.editingUserId = null;
        const modalElement = document.getElementById('addUserModal');
        const modal = new Modal(modalElement); // Usa la clase Modal de Bootstrap
        modal.show();
      },
      closeModal() {
        const modalElement = document.getElementById('addUserModal');
        const modal = Modal.getInstance(modalElement); // Obtén la instancia existente del modal
        modal.hide();
        this.resetForm();
      },
      saveUser() {
        if (this.validateForm()) {
          if (this.editingUserId) {
            // Actualizar usuario existente
            const userIndex = this.users.findIndex(
              (user) => user.id === this.editingUserId
            );
            if (userIndex !== -1) {
              this.users[userIndex] = { ...this.newUser, id: this.editingUserId };
              alert('Usuario actualizado exitosamente.');
            }
          } else {
            // Crear nuevo usuario
            this.users.push({
              ...this.newUser,
              id: (this.users.length + 1).toString()
            });
            alert('Usuario creado exitosamente.');
          }
          this.closeModal();
        }
      },
      editUser(user) {
        this.editingUserId = user.id;
        this.newUser = { ...user };
        const modalElement = document.getElementById('addUserModal');
        const modal = new Modal(modalElement);
        modal.show();
      },
      deleteUser(userId) {
        this.users = this.users.filter((user) => user.id !== userId);
        alert('Usuario eliminado exitosamente.');
      },
      resetForm() {
        this.newUser = {
          name: '',
          email: '',
          role: ''
        };
        this.errors = {
          name: '',
          email: '',
          role: ''
        };
      },
      validateForm() {
        let isValid = true;
        this.errors = { name: '', email: '', role: '' };
  
        if (!this.newUser.name.match(/^[A-Za-z\s]+$/)) {
          this.errors.name = 'El nombre solo debe contener letras y espacios.';
          isValid = false;
        }
  
        if (!this.newUser.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          this.errors.email = 'Ingrese un correo válido (ejemplo@dominio.com).';
          isValid = false;
        }
  
        if (!this.newUser.role) {
          this.errors.role = 'Seleccione un rol para el usuario.';
          isValid = false;
        }
  
        return isValid;
      },
      async loadUsersFromJson() {
        try {
          const response = await fetch('/usuarios.json');
          if (!response.ok) throw new Error('No se pudo cargar el archivo JSON');
          const data = await response.json();
          this.users = data;
        } catch (error) {
          console.error('Error al cargar el archivo JSON:', error);
        }
      }
    }
  };
  </script>
  
  
  <style scoped>
    body {
      background-color: #f8f9fa;
      font-family: Arial, sans-serif;
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
      position: relative;
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
  