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

// Используемые компоненты
import Datepicker from '@/components/common/datepicker.vue';

export default {
  name: 'UserForm',
  components: {
    Datepicker
  },
  model: {
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
  watch: {
    // Отслеживание изменений в форме
    user: 'updatedUser'
  },
  methods: {
    // Отправка нового объекта пользователя с событием
    updatedUser() {
      this.$emit('input', this.user);
    },

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
    }
  }
};
</script>
