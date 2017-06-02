<template>
  <div class="panel panel-primary">
    <div class="panel-heading">
      <span class="pull-right">
        Новый пользователь
      </span>

      Пользователь
    </div>
    <div class="panel-body">

      <user-form v-model="user"></user-form>

      <button type="button" class="btn btn-success" @click="save">
        Создать пользователя
      </button>

      <hr>

      <pre>{{ user }}</pre>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import UserForm from './UserForm.vue';

const defaultUser = {
  id: null,
  guid: '',
  isActive: true,
  balance: '',
  picture: '',
  age: 0,
  eyeColor: '',
  firstName: '',
  lastName: '',
  company: '',
  email: '',
  phone: '',
  address: '',
  about: '',
  registered: ''
};

export default {
  name: 'UserAdd',
  components: {
    UserForm
  },
  data: () => ({
    user: defaultUser,
    url: 'http://localhost:3004/users/',
  }),
  methods: {

    // Сохранение изменений
    save() {
      const data = this.user;

      axios.post(this.url, data)
        .then(response => response.data)
        .then(() => {
          this.$router.push({ path: '/list' });
        })
        .catch(err => global.console.error(err));
    },
  }
};
</script>
