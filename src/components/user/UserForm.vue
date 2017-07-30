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

    <div class="form-group" ref="imagezone">
      <label>URL картинки</label>
      <p>
        <img class="img-thumbnail" :src="user.picture" />
      </p>
      <div class="row">
        <div class="col-md-2">
          <input type="file" ref="image" class="hidden" @change="upload" />
          <button class="btn btn-default btn-block" @click="selectNewImage">Выбрать новую</button>
        </div>
        <div class="col-md-10">
          <input type="text" class="form-control" v-model="user.picture" readonly />
        </div>
      </div>
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

  </div>
</template>

<script>
// Используемые плагины
import axios from 'axios';
import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css';
import Vue from 'vue';
import VeeValidate from 'vee-validate';

// Используемые компоненты
import Datepicker from '@/components/common/datepicker.vue';

// Подключаем vee-validate
Vue.use(VeeValidate);

export default {
  name: 'UserForm',
  // Прокидываем область видимости родителя для валидации
  inject: ['$validator'],
  components: {
    Datepicker
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
  }),
  methods: {
    // Показать окно выбора файла
    selectNewImage() {
      this.$refs.image.click();
    },

    // Upload новой аватарки пользователя
    upload() {
      const url = 'https://api.imgur.com/3/image';

      const data = new FormData();
      data.append('image', this.$refs.image.files[0]);

      // Добавляем ключ от IMGUR
      // https://api.imgur.com/oauth2/addclient
      const config = {
        headers: {
          'Authorization': 'Client-ID 3bef0b8892d4b04'
        }
      };

      axios.post(url, data, config)
        .then(response => response.data)
        .then(response => {
          this.user.picture = response.data.link;
          this.$refs.image.value = '';
        })
    },

    initDropzone() {
      /* eslint-disable no-new */
      new Dropzone(this.$refs.imagezone, {
        url: "https://api.imgur.com/3/image",
        paramName: "image",
        acceptedFiles: "image/*",
        method: "post",
        headers: {
          'Cache-Control': null,
          'X-Requested-With': null,
          'Authorization': "Client-ID 3bef0b8892d4b04"
        },
        createImageThumbnails: false,
        previewTemplate: '<div style="display:none"></div>',
        success: (file, response) => {
          this.user.picture = response.data.link;
          this.$refs.image.value = '';
        }
      });
    }
  },
  mounted() {
    this.initDropzone();
  }
};
</script>
