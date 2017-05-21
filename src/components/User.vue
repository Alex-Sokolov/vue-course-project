<template>
  <div v-if="!user" class="alert alert-danger">
    Нет информации о пользователе
    <button v-on:click="loadData">Попробовать снова</button>
  </div>
  <div v-else class="panel panel-default">
    <div class="panel-heading">
      <i :class="['fa', 'fa-fw', 'fa-lg', user.sex === 'M' ? 'fa-male' : 'fa-female']"></i>
      {{ user.name }}
    </div>
    <div class="panel-body">

      <div class="form-group">
        <label>ФИО</label>
        <input type="text" class="form-control" v-model="user.name" />
      </div>

      <div class="form-group">
        <label>Пол</label>
        <p class="form-control-static">
          <label class="radio-inline">
            <input type="radio" v-model="user.sex" value="M"> Мужской
          </label>
          <label class="radio-inline">
            <input type="radio" v-model="user.sex" value="F"> Женский
          </label>
        </p>
      </div>

      <div class="form-group">
        <label>День рождения</label>
        <input type="date" class="form-control" v-model="user.birthday" />
      </div>

      <div class="form-group">
        <label>Биография</label>
        <textarea class="form-control" v-model="user.bio"></textarea>
      </div>

      <div class="form-group">
        <label>Роли пользователя</label>
        <span v-if="!userHaveRoles" class="label label-warning">
          У пользователя не выбрано ни одной роли
        </span>
        <div class="checkbox" v-for="item in rolesList">
          <label>
            <input type="checkbox" :value="item" v-model="user.roles" /> {{ item }}
          </label>
        </div>
      </div>

      <hr>

      <pre>{{ user }}</pre>

    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data: () => ({
    user: null,

    rolesList: ['admin', 'user', 'superuser'],
  }),
  computed: {
    userHaveRoles() {
      return this.user.roles.length > 0;
    },
  },
  methods: {
    loadData() {
      this.user = {
        name: 'Константин Константинович',
        birthday: '12.02.1999',
        roles: [],
        sex: 'M',
        bio: '',
      };
    },
  },
};
</script>
