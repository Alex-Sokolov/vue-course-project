<!-- Компонент формы пользователя (для редактирования, добавления) -->

<template>
  <div>

    <div class="form-group" :class="{ 'has-error': errors.has('firstName') }">
      <label>Имя</label>
      <input type="text" class="form-control" v-model="user.firstName" name="firstName" v-validate="'required'" />
      <span v-show="errors.has('firstName')" class="help-block text-danger">
        {{ errors.first('firstName') }}
      </span>
    </div>

    <div class="form-group" :class="{ 'has-error': errors.has('lastName') }">
      <label>Фамилия</label>
      <input type="text" class="form-control" v-model="user.lastName" name="lastName" v-validate="'required'" />
      <span v-show="errors.has('lastName')" class="help-block text-danger">
        {{ errors.first('lastName') }}
      </span>
    </div>

    <div class="form-group" :class="{ 'has-error': errors.has('email') }">
      <label>Email</label>
      <input type="text" class="form-control" v-model="user.email" name="email" v-validate="'required|email'" />
      <span v-show="errors.has('email')" class="help-block text-danger">
        {{ errors.first('email') }}
      </span>
    </div>

    <div class="form-group">
      <label>URL картинки</label>
      <avatar-uploader v-model="user.picture" />
    </div>

    <div class="form-group">
      <label>Возраст</label>
      <input type="number" class="form-control" v-model="user.age" />
    </div>

    <div class="form-group">
      <label>Активный</label>
      <div class="checkbox-inline">
        <input type="checkbox" v-model="user.isActive" /> Да
      </div>
    </div>

    <div class="form-group">
      <label>Уровень доступа</label>
      <select class="form-control" v-model="user.accessLevel">
        <option v-for="item in accessList" :key="item">
          {{ item }}
        </option>
      </select>
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
      <label>Адрес</label>
      <input type="text" class="form-control" v-model="user.address" />
    </div>

    <div class="form-group">
      <label>Компания</label>
      <input type="text" class="form-control" v-model="user.company" />
    </div>

    <div class="form-group">
      <label>Биография</label>
      <textarea class="form-control" v-model="user.about"></textarea>
    </div>

    <div class="form-group">
      <label>Дата регистрации</label>
      <datepicker v-model="user.registered"></datepicker>
    </div>

    <hr>

    <pre>{{ user }}</pre>

    <slot name="buttons"></slot>

  </div>
</template>

<script>
// Используемые плагины
import Vue from 'vue';
import VeeValidate from 'vee-validate';

// Подключаем vee-validate
Vue.use(VeeValidate);

export default {
  name: 'UserForm',
  // Прокидываем область видимости родителя для валидации
  inject: ['$validator'],
  components: {
    Datepicker: () => import('@/components/common/datepicker.vue'),
    AvatarUploader: () => import('@/components/common/avatar-uploader.vue')
  },
  model: {
    // Настраиваем компоненту работу с v-model
    prop: 'user',
  },
  props: {
    // Пользователь
    user: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    accessList: ['guest', 'user', 'admin']
  })
};
</script>
