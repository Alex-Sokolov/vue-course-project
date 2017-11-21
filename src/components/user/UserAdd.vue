<!-- Компонент добавления нового пользователя -->

<template>
  <div class="panel panel-primary">
    <div class="panel-heading">
      <span class="pull-right">
        Новый пользователь
      </span>

      Пользователь
    </div>
    <div class="panel-body">

      <user-form v-model="user">
        <div slot="buttons">
          <button type="button" class="btn btn-success" @click="save">
            Создать пользователя
          </button>
        </div>
      </user-form>

    </div>
  </div>
</template>

<script>
// Используемые плагины
import axios from 'axios';

// Используемые компоненты
import UserForm from './UserForm.vue';

// Модель для пустого пользователя
const defaultUser = {
  id: null,
  guid: '',
  isActive: false,
  balance: '',
  picture: 'http://placehold.it/128x128',
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
  name: 'UserAdd',
  components: {
    UserForm
  },
  data: () => ({
    // Редактируемый пользователь
    user: defaultUser,

    //  REST URL
    url: 'http://localhost:3004/users/',
  }),
  methods: {
    // Сохранение изменений
    save() {
      // Валидация пользователя через vee-validate
      // внутри формы мы инъектируем $validator
      this.$validator.validateAll()
      if (this.errors.any()) {
        // eslint-disable-next-line
        alert('Не все поля заполнены!')
        return;
      }

      axios.post(this.url, this.user)
        .then(() => {
          // После успешного создания пользователя
          // переходим на страницу с таблицей
          // или можно перейти на страницу редактирования
          // так как в ответе приходит тот же объект, но с ID
          this.$router.push({ path: '/list' });
        });
    },
  }
};
</script>
