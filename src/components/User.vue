<template>
  <div v-if="!user" class="alert alert-danger">
    Нет информации о пользователе
    <button v-on:click="loadData">Попробовать снова</button>
  </div>
  <div v-else class="panel panel-default">
    <div class="panel-heading">
      Пользователь {{ user.name }}
    </div>
    <div class="panel-body">

      <div class="form-group">
        <label>ФИО</label>
        <input type="text" class="form-control" v-model="user.name" />
      </div>

      <div class="form-group">
        <label>День рождения</label>
        <input type="date" class="form-control" v-model="user.birthday" />
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
      };
    },
  },
};
</script>
