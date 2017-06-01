<template>
  <div v-if="!user" class="alert alert-danger">
    Укажите ID пользователя и нажмите кнопку загрузки
    <input type="number" v-model.number="selectedId" class="form-control" />
    <button @click="loadData">Загрузить информацию по ID</button>
    <button @click="fillNew">Добавить пользователя</button>
  </div>
  <div v-else class="panel panel-primary">
    <div class="panel-heading">
      <span class="pull-right">
        {{ user.id }}
      </span>

      <i :class="['fa', 'fa-fw', 'fa-lg', user.sex === 'M' ? 'fa-male' : 'fa-female']"></i>
      {{ title }}
    </div>
    <div class="panel-body">

      <div class="form-group">
        <label>Имя</label>
        <input type="text" class="form-control" v-model="user.firstName" />
      </div>

      <div class="form-group">
        <label>Фамилия</label>
        <input type="text" class="form-control" v-model="user.lastName" />
      </div>

      <div class="form-group">
        <label>Активный</label>
        <div class="checkbox-inline">
          <input type="checkbox" v-model="user.isActive" /> Да
        </div>
      </div>

      <div class="form-group">
        <label>Баланс</label>
        <input type="text" class="form-control" v-model="user.balance" />
      </div>

      <div class="form-group">
        <label>Телефон</label>
        <input type="text" class="form-control" v-model="user.phone" />
      </div>

      <div class="form-group">
        <label>Дата регистрации</label>
        <input type="date" class="form-control" v-model="user.registered" />
      </div>

      <div class="form-group">
        <label>Биография</label>
        <textarea class="form-control" v-model="user.about"></textarea>
      </div>

      <button type="button" class="btn btn-success" @click="save">
        Сохранить изменения
      </button>

      <button type="button" class="btn btn-danger" v-if="selectedId" @click="remove">
        Удалить пользователя
      </button>

      <hr>

      <pre>{{ user }}</pre>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'User',
  props: {
    id: String
  },
  data: () => ({
    selectedId: null,

    user: null,

    rolesList: ['admin', 'user', 'superuser'],
  }),
  computed: {
    title() {
      return [
        this.user.firstName,
        this.user.lastName,
        this.user.phone,
      ].join(' ');
    },

    userHaveRoles() {
      return this.user.roles.length > 0;
    },
  },
  methods: {
    // Загрузка данных пользователя
    loadData() {
      const id = this.selectedId;
      const url = `http://localhost:3000/users/${id}`;
      axios.get(url)
        .then(response => response.data)
        .then((response) => {
          this.user = response;
        })
        .catch(err => global.console.error(err));
    },

    // Сохранение изменений
    save() {
      if (this.user.id) {
        this.updateExist();
      }

      this.addNew();
    },

    addNew() {
      const data = this.user;
      const url = 'http://localhost:3000/users/';
      axios.post(url, data)
        .then(response => response.data)
        .then(() => {
          this.$router.push({ path: '/list' });
        })
        .catch(err => global.console.error(err));
    },

    updateExist() {
      const data = this.user;
      const id = this.selectedId;
      const url = `http://localhost:3000/users/${id}`;
      axios.patch(url, data)
        .then(response => response.data)
        .then(() => {
          this.$router.push({ path: '/list' });
        })
        .catch(err => global.console.error(err));
    },

    // Удаление пользователя
    remove() {
      const id = this.selectedId;
      const url = `http://localhost:3000/users/${id}`;
      axios.delete(url)
        .then(response => response.data)
        .then(() => {
          this.$router.push({ path: '/list' });
        })
        .catch(err => global.console.error(err));
    },

    fillNew() {
      this.user = {
        id: 0,
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
    }
  },
  mounted() {
    if (this.id) {
      this.selectedId = this.id;
      this.loadData();
    }
  },
};
</script>
