// router.js
import { createRouter, createWebHistory } from 'vue-router'
import Inventario from '../views/Inventario.vue'
import Clientes from '../views/Clientes.vue'
import Proveedores from '../views/Proveedores.vue'
import Almacenamiento from '../views/Almacenamiento.vue'
import Ventas from '../views/Ventas.vue'
import Notificaciones from '../views/Notificaciones.vue'
import Configuracion from '../views/Configuracion.vue'

const routes = [
    { path: '/', component: Inventario },
    { path: '/inventario', component: Inventario },
    { path: '/clientes', component: Clientes },
    { path: '/proveedores', component: Proveedores },
    { path: '/almacenamiento', component: Almacenamiento },
    { path: '/ventas', component: Ventas },
    { path: '/notificaciones', component: Notificaciones },
    { path: '/configuracion', component: Configuracion },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
