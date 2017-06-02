<!-- Компонент формы пользователя (для редактирования, добавления) -->

<template>
  <div>
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
  </div>
</template>

<script>
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
  name: 'UserForm',
  props: {
    value: {
      type: Object,
      default: defaultUser
    }
  },
  data: () => ({
    user: null
  }),
  watch: {
    user: 'updatedUser'
  },
  methods: {
    updatedUser() {
      this.$emit('input', this.user);
    },
  },
  mounted() {
    this.user = this.value;
  }
};
</script>
