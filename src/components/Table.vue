<template>
  <div>
    {{ test }}

    <table class="table table-bordered">
      <tbody>
        <tr>
          <td>ID</td>
          <td>Имя</td>
          <td>Фамилия</td>
          <td>Активен</td>
          <td>Баланс</td>
          <td>Email</td>
          <td>Телефон</td>
          <td>Зарегистрирован</td>
        </tr>
        <tr v-for="user in users">
          <td>
            <router-link :to="{ name: 'User', params: { id: user.id }}">
              {{ user.id }}
            </router-link>
          </td>
          <td v-text="user.firstName"></td>
          <td v-text="user.lastName"></td>
          <td v-text="user.isActive"></td>
          <td v-text="user.balance"></td>
          <td v-text="user.email"></td>
          <td v-text="user.phone"></td>
          <td v-text="user.registered"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Table',
  data: () => ({
    test: 'Список пользователей',

    users: [],
  }),
  methods: {
    loadData() {
      const url = 'http://localhost:3000/users/';
      axios.get(url)
        .then(response => response.data)
        .then((response) => {
          this.users = response;
        })
        .catch(err => global.console.error(err));
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
