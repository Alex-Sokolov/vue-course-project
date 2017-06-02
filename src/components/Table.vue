<template>
  <div class="panel panel-primary">
    <div class="panel-heading">
      Список пользователей
    </div>
    <div class="panel-body">

      <dashboard-grid :config="config" :dataSource="dataSource" title="Пользователей в базе"></dashboard-grid>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DashboardGrid from './DashboardGrid.vue';

export default {
  name: 'Table',
  components: {
    DashboardGrid,
  },
  data: () => ({
    test: 'Список пользователей',

    dataSource: {
      url: 'http://localhost:3004/users/',
      dataSrc: ''
    },

    //         <router-link :to="{ name: 'User', params: { id: user.id }}">
    //           {{ user.id }}
    //         </router-link>

    config: {
      columns: [
        {
          title: 'ID',
          data: 'id',
          type: 'num',
          render: data => `
              <a href="/user/${data}"># ${data}</a>
            `
        },
        {
          title: 'Имя',
          data: 'firstName'
        },
        {
          title: 'Фамилия',
          data: 'lastName'
        },
        {
          title: 'Активен',
          data: 'isActive'
        },
        {
          title: 'Баланс',
          data: 'balance'
        },
        {
          title: 'Email',
          data: 'email'
        },
        {
          title: 'Телефон',
          data: 'phone'
        },
        {
          title: 'Зарегистрирован',
          data: 'registered'
        }
      ]

    }
  }),
  methods: {
    loadData() {
      const url = 'http://localhost:3004/users/';
      axios.get(url)
        .then(response => response.data)
        .then((response) => {
          this.users = response;
        })
        .catch(err => global.console.error(err));
    },
  },
  mounted() {
  },
};
</script>
