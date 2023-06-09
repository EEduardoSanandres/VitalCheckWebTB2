<template>
  <div class="sales-container">
    <h2>Ventas de usuario</h2>

    <pv-button @click="displayDialog = true">Añadir Venta</pv-button>

    <DataTable :value="sales" :paginator="true" :rows="10">
      <Column field="client.firstName" header="Nombre" sortable filter></Column>
      <Column field="client.lastName" header="Apellido" sortable filter></Column>
      <Column field="client.dni" header="DNI" sortable filter></Column>
      <Column field="medicine.commercialName" header="Nombre Comercial" sortable filter></Column>
      <Column field="medicine.costPrice" header="Precio de Costo" sortable filter></Column>
      <Column field="quantity" header="Cantidad" sortable filter></Column>
      <Column field="totalPrice" header="Precio Total" sortable filter></Column>
    </DataTable>

    <!-- Dialog para añadir venta -->
    <pv-dialog v-model:visible="displayDialog">
      <template #header>
        <h2>Añadir Venta</h2>
      </template>

      <form @submit.prevent="submitSaleForm">
        <!-- Datos del cliente -->
        <p>
          <span>Nombres: </span>
          <input v-model="newClient.firstName" type="text" placeholder="Nombre">
        </p>
        <p>
          <span>Apellidos: </span>
          <input v-model="newClient.lastName" type="text" placeholder="Apellido">
        </p>
        <p>
          <span>DNI: </span>
          <input v-model="newClient.dni" type="number" placeholder="DNI">
        </p>

        <!-- Selección de medicamento -->
        <p>
          <span>Medicamento </span>
          <select v-model="newSale.medicineID">
            <option v-for="medicine in medicines" :key="medicine.medicineID" :value="medicine.medicineID">
              {{ medicine.commercialName }}
            </option>
          </select>
        </p>

        <!-- Cantidad -->
        <span>Cantidad: </span>
        <p><input v-model="newSale.quantity" type="number" placeholder="Cantidad"></p>

        <!-- Precio total -->
        <span>Precio Total: </span>
        <p><input v-model="newSale.totalPrice" type="number" placeholder="Precio Total"></p>

        <!-- Fecha -->
        <span>Fecha: </span>
        <p><input v-model="newSale.date" type="datetime-local"></p>

        <pv-button type="submit">Añadir Venta</pv-button>
      </form>

      <template #footer>
        <pv-button @click="displayDialog = false">Cancelar</pv-button>
      </template>
    </pv-dialog>
  </div>
</template>

<script>
import { onMounted, ref, computed, watch } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { userID } from '/src/core/state.js';
import { SalesApiService } from '@/core/services/SalesApiService';
import { ClientsApiService } from '@/core/services/ClientsApiService';
import { MedicinesApiService } from '@/core/services/MedicinesApiService';

export default {
  components: {
    DataTable,
    Column,
    Button,
    Dialog
  },
  setup() {
    const sales = ref([]);
    const clients = ref([]);
    const medicines = ref([]);
    const displayDialog = ref(false);
    const salesApiService = new SalesApiService();
    const clientsApiService = new ClientsApiService();
    const medicinesApiService = new MedicinesApiService();

    const currentUserId = computed(() => userID.value);

    const newSale = ref({
      userID: currentUserId.value,
      clientID: 0,
      medicineID: 0,
      quantity: 0,
      totalPrice: 0,
      date: formatDate(new Date())
    });

    const newClient = ref({
      dni: 0,
      firstName: '',
      lastName: ''
    });

    function formatDate(date) {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      let year = d.getFullYear();
      let hour = '' + d.getHours();
      let minute = '' + d.getMinutes();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;
      if (hour.length < 2)
        hour = '0' + hour;
      if (minute.length < 2)
        minute = '0' + minute;

      return [year, month, day].join('-') + "T" + [hour, minute].join(':');
    }

    const updateSales = async () => {
      try {
        const responseSales = await salesApiService.getByUserId(userID.value);
        sales.value = responseSales.data;
      } catch (error) {
        console.error('Error al cargar las ventas:', error);
      }
    }

    onMounted(async () => {
      await updateSales();

      try {
        const responseClients = await clientsApiService.getAll();
        clients.value = responseClients.data;

        const responseMedicines = await medicinesApiService.getAll();
        medicines.value = responseMedicines.data;
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    });

    watch(userID, updateSales);

    const submitSaleForm = async () => {
      try {
        const responseClient = await clientsApiService.create(newClient.value);
        newSale.value.clientID = responseClient.data.clientID;  // Asume que la respuesta del servidor incluye la ID del nuevo cliente
        await salesApiService.create(newSale.value);
        updateSales();
        displayDialog.value = false;
      } catch (error) {
        console.error('Error al crear venta:', error);
      }
    };

    return {
      sales,
      clients,
      medicines,
      displayDialog,
      newSale,
      newClient,
      submitSaleForm
    };
  }
};
</script>

