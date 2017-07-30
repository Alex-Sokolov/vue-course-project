<!-- Компонент редактирования пользователя -->

<template>
  <div>
    <div v-if="!user" class="alert alert-warning">
      <i class="fa fa-refresh fa-spin"></i>
      Загрузка
    </div>
    <div v-else class="panel panel-primary">
      <div class="panel-heading">
        <span class="pull-right">
          {{ user.id }}
        </span>

        {{ title }}
      </div>
      <div class="panel-body">

        <user-form v-model="user"></user-form>

        <button type="button" class="btn btn-success" @click="save">
          Сохранить изменения
        </button>

        <button type="button" class="btn btn-danger" @click="remove">
          Удалить пользователя
        </button>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import UserForm from './UserForm.vue';

export default {
  name: 'UserEdit',
  props: {
    // ID редактируемого пользователя
    id: String
  },
  components: {
    UserForm
  },
  data: () => ({
    // Объект с данными редактируемого пользователя
    user: null,

    // REST URL
    restUrl: 'http://localhost:3004/users/',
  }),
  computed: {
    // URL для работы с текущим пользователем
    url() {
      return `${this.restUrl}${this.id}`
    },

    // Заголовок окна формы
    title() {
      return !this.user.firstName || !this.user.lastName
        ? 'Пользователь'
        : [
          this.user.firstName,
          this.user.lastName,
          this.user.phone,
        ].join(' ');
    },
  },
  watch: {
    // Обновление данных при изменениях маршрута
    $route: 'loadData'
  },
  methods: {
    // Загрузка данных пользователя
    loadData() {
      axios.get(this.url)
        .then(response => response.data)
        .then((response) => {
          this.user = response;
        });
    },

    // Сохранение изменений
    save() {
      axios.patch(this.url, this.user)
        .then(response => response.data)
        .then(() => {
          this.$router.push({ path: '/list' });
        });
    },

    // Удаление пользователя
    remove() {
      // eslint-disable-next-line
      const confirmed = confirm('Удалить пользователя?');
      if (!confirmed) {
        return;
      }

      const url = `${this.url}${this.id}`;

      axios.delete(url)
        .then(response => response.data)
        .then(() => {
          this.$router.push({ path: '/list' });
        });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
