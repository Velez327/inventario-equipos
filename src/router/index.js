import { createRouter, createWebHistory } from 'vue-router'; // Importa las funciones correctas desde Vue Router
import Login from '../views/Login.vue';
import PanelControl from '../views/Panelcontrol.vue';
import g_inventario from '../views/G_inventario.vue';
import GestionMantenimiento from '../views/G_mantenimiento.vue';
import GestionUsuario from '../views/G_usuario.vue';

const routes = [
    {
      path: '/',
      redirect: '/Login', // Redirige a /Login por defecto
    },
    {
      path: '/Login',
      name: 'LoginInv',
      component: Login,
    },
    {
      path: '/PanelControl',
      name: 'PanelControl',
      component: PanelControl, // Componente para la página de inicio
    },

    {
      path: '/GestionInventario',
      name: 'g_inventario',
      component: g_inventario,
    },

    {
      path: '/GestionMantenimiento',
      name: 'GestionMantenimiento',
      component: GestionMantenimiento, 
    },

    {
      path: '/GestionUsuario',
      name: 'GestionUsuario',
      component: GestionUsuario,
    },
  ]

const router = createRouter({
  history: createWebHistory(), 
  routes
});

export default router;




