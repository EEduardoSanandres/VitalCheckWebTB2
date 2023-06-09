<template>
  <div class="app-container">
    <pv-toolbar class="bg-primary toolbar">
      <template #start>
      <pv-button
          class="p-button-text text-white"
          icon="pi pi-bars"
          @click="drawer = !drawer"
      ></pv-button>
      </template>
      <template #end>
        <div class="p-toolbar-group-right">
          <pv-input v-model="userIdInput" class="p-mr-2"></pv-input>
          <pv-button @click="setUser()" class="p-button-text text-white">Enviar</pv-button>
          <span class="p-toolbar-text">{{ userName }}</span>
        </div>
      </template>
    </pv-toolbar>
    <pv-sidebar v-model:visible="drawer">
      <ul class="sidebar-list">
        <li
            v-for="item in items"
            :key="item.title"
        >
          <router-link
              :to="item.route"
              custom
              v-slot="{ navigate, href }"
          >
            <pv-button
                class="p-button-text"
                :href="href"
                @click="navigate"
            >
              <i :class="item.icon"></i>
              {{ item.title }}
            </pv-button>
          </router-link>
        </li>
      </ul>
    </pv-sidebar>

    <router-view/>
    
  </div>
</template>

<script>
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import Toolbar from 'primevue/toolbar';
import { useRouter } from 'vue-router';
import { UserApiService } from './core/services/UserApiService';
import { userID, userName, email, password, ruc, planName, typeName, registrationDate } from './core/state.js';

export default {
  components: {
    Sidebar,
    Button,
    Toolbar
  },
  data() {
    return {
      drawer: false,
      items: [
        { title: 'Inventario', icon: 'pi pi-fw pi-list', route: '/inventario' },
        { title: 'Clientes', icon: 'pi pi-fw pi-user', route: '/clientes' },
        { title: 'Proveedores', icon: 'pi pi-fw pi-users', route: '/proveedores' },
        { title: 'Almacenamiento', icon: 'pi pi-fw pi-box', route: '/almacenamiento' },
        { title: 'Ventas', icon: 'pi pi-fw pi-money-bill', route: '/ventas' },
        { title: 'Notificaciones', icon: 'pi pi-fw pi-bell', route: '/notificaciones' },
        { title: 'Configuración', icon: 'pi pi-fw pi-cog', route: '/configuracion' },
        { title: 'Cerrar Sesión', icon: 'pi pi-fw pi-power-off', route: '/' },
      ],
      userIdInput: '',
      userName: '',
      userApiService: new UserApiService(),
    }
  },
  async created() {
    await this.setUser();
  },
  methods: {
    showSidebar() {
      this.visible = true;
    },
    navigate(route) {
      const router = useRouter();
      router.push(route);
      this.visible = false;
    },
    async setUser() {
      try {
        const response = await this.userApiService.getById(this.userIdInput);

        // Asegurarse de que 'response.data' es un array y que tiene al menos un elemento
        if (Array.isArray(response.data) && response.data.length > 0) {
          this.userName = response.data[0].userName;

          // actualizar las refs globales con los valores de la respuesta
          userID.value = response.data[0].userID;
          console.log('userID:', userID.value);

          userName.value = response.data[0].userName;
          console.log('userName:', userName.value);

          email.value = response.data[0].email;
          console.log('email:', email.value);

          password.value = response.data[0].password;
          console.log('password:', password.value);

          ruc.value = response.data[0].ruc;
          console.log('ruc:', ruc.value);

          planName.value = response.data[0].userPlan.planName;
          console.log('planName:', planName.value);

          typeName.value = response.data[0].userType.typeName;
          console.log('typeName:', typeName.value);

          registrationDate.value = response.data[0].registrationDate;
          console.log('registrationDate:', registrationDate.value);

          this.userIdInput = '';
        } else {
          console.error('Error: La respuesta de la API no es una lista o está vacía.');
          this.userName = '';
        }
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        this.userName = '';
      }
    },
  },
}
</script>

<style>
.p-toolbar-text {
  margin-left: .5em;
}

.p-button-text {
  display: block;
}

.sidebar-list {
  list-style: none;
  padding: 0;
}

.sidebar-list li .pi {
  margin-right: 0.5em;
}

.app-container {
  height: 100vh;
}

.toolbar {
  min-height: 70px;
  width: 100%;
}
#app, .app-container {
  width: 100%;
}
</style>




