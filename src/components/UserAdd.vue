<template>
  <div class="panel panel-primary">
    <div class="panel-heading">
      <span class="pull-right">
        {{ user.id }}
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

export default {
  name: 'UserAdd',
  components: {
    UserForm
  },
  data: () => ({
    user: null,
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
