<template>
  <nav class="navbar">
    <!-- Agrega aquí tus enlaces de navegación -->
    <router-link to="/PanelControl" class="nav-link">Panel de Control</router-link>
    <router-link to="/GestionInventario" class="nav-link">Inventario</router-link>
    <router-link to="/GestionMantenimiento" class="nav-link">Mantenimiento</router-link>
    <router-link to="/GestionUsuario" class="nav-link">Usuarios</router-link>
  </nav>
</template>

<script>
export default { 
  name: 'AppNavbar'
}
</script>

<style scoped>
.navbar {
    background-color: #333;
    padding: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

/* Estilos para los enlaces de navegación */
.nav-link {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    font-size: 1.1rem;
    transition: background-color 0.3s ease;
}

/* Efecto hover para los enlaces */
.nav-link:hover {
    background-color: #555;
    border-radius: 4px;
}

/* Enlace activo */
.router-link-active {
    font-weight: bold;
    color: #ffd700;
}
</style>

  