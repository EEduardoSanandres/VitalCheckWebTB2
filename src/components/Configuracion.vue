<template>
  <div class="config-container">
    <h2>Datos de usuario</h2>
    <p><strong>Nombre de usuario:</strong> {{ userValues.userName }}</p>
    <p><strong>Email:</strong> {{ userValues.email }}</p>
    <p><strong>Password:</strong> {{ userValues.password }}</p>
    <p><strong>RUC:</strong> {{ userValues.ruc }}</p>
    <p><strong>PlanName:</strong> {{ userValues.planName }}</p>
    <p><strong>TypeName:</strong> {{ userValues.typeName }}</p>
    <pv-button @click="displayDialog = true">Editar</pv-button>

    <pv-dialog v-model:visible="displayDialog">
      <template #header>
        <h2>Editar datos de usuario</h2>
      </template>

      <form @submit.prevent="submitForm">
        <p><input v-model="form.userName" placeholder="Nombre de usuario"></p>
        <p><input v-model="form.email" placeholder="Email"></p>
        <p><input v-model="form.password" type="password" placeholder="Contraseña"></p>
        <p><input v-model="form.ruc" type="number" placeholder="RUC"></p>
        <p>
          <select v-model="form.userPlan">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </p>
        <p>
          <select v-model="form.userType">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </p>
        <pv-button type="submit">Guardar</pv-button>
      </form>

      <template #footer>
        <pv-button @click="displayDialog = false">Cancelar</pv-button>
      </template>
    </pv-dialog>
  </div>
</template>

<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { computed, ref } from 'vue';
import { userID, userName, email, password, ruc, planName, typeName, registrationDate } from '/src/core/state.js';
import { UserApiService } from "@/core/services/UserApiService";
export default {
  components: {
    Dialog,
    Button,
  },
  setup() {
    const userValues = computed(() => ({
      userName: userName.value,
      email: email.value,
      password: password.value,
      ruc: ruc.value,
      planName: planName.value,
      typeName: typeName.value,
    }));

    const displayDialog = ref(false);

    const form = ref({
      userName: userName.value,
      email: email.value,
      password: password.value,
      ruc: ruc.value,
      userPlan: planName.value,
      userType: typeName.value,
    });

    const userApiService = new UserApiService();

    const submitForm = async () => {
      const data = {
        userName: form.value.userName,
        email: form.value.email,
        password: form.value.password,
        ruc: form.value.ruc,
        registrationDate: registrationDate.value,
        userPlanID: parseInt(form.value.userPlan),
        userTypeID: parseInt(form.value.userType)
      };

      const data2 = JSON.stringify(data);
      console.log(data2);

      try {
        const response = await userApiService.update(userID.value, data2);
        console.log('Respuesta del servidor:', response);

        const aux = await userApiService.getById(userID.value);
        userName.value = form.value.userName;
        email.value = form.value.email;
        password.value = form.value.password;
        ruc.value = form.value.ruc;
        planName.value = aux.data[0].userPlan.planName;
        typeName.value = aux.data[0].userType.typeName;

      } catch (error) {
        console.error('Error al actualizar los datos del usuario:', error);
      }

      displayDialog.value = false;
    };


    return {
      userValues,
      displayDialog,
      form,
      submitForm,
    };
  },
};
</script>
