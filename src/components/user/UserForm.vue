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
        <datepicker v-model="user.registered"></datepicker>
      </div>

      <div class="form-group">
        <label>Биография</label>
        <textarea class="form-control" v-model="user.about"></textarea>
      </div>
  </div>
</template>

<script>
// Используемые плагины
import Datepicker from '@/components/common/datepicker.vue';

export default {
  name: 'UserForm',
  components: {
    Datepicker
  },
  props: {
    value: {
      type: Object,
      required: true
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
