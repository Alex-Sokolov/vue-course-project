<template>
  <div v-if="!user" class="alert alert-danger">
    Нет информации о пользователе
    <input type="number" v-model.number="selectedId" class="form-control" />
    <button v-on:click="loadData">Загрузить информацию по ID</button>
  </div>
  <div v-else class="panel panel-default">
    <div class="panel-heading">
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

      <!--<div class="form-group">
                                    <label>Пол</label>
                                    <p class="form-control-static">
                                      <label class="radio-inline">
                                        <input type="radio" v-model="user.sex" value="M"> Мужской
                                      </label>
                                      <label class="radio-inline">
                                        <input type="radio" v-model="user.sex" value="F"> Женский
                                      </label>
                                    </p>
                                  </div>-->

      <div class="form-group">
        <label>Дата регистрации</label>
        <input type="date" class="form-control" v-model="user.registered" />
      </div>

      <div class="form-group">
        <label>Биография</label>
        <textarea class="form-control" v-model="user.about"></textarea>
      </div>

      <!--<div class="form-group">
                                        <label>Роли пользователя</label>
                                        <span v-if="!userHaveRoles" class="label label-warning">
                                          У пользователя не выбрано ни одной роли
                                        </span>
                                        <div class="checkbox" v-for="item in rolesList">
                                          <label>
                                            <input type="checkbox" :value="item" v-model="user.roles" /> {{ item }}
                                          </label>
                                        </div>
                                      </div>-->

      <hr>

      <pre>{{ user }}</pre>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'User',
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
  },
};
</script>
