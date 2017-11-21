<!-- Компонент "главной" страницы -->

<template>
  <div class="hello">
    <h1>{{ title }}</h1>

    <router-link to="/user/add">
      Добавить пользователя
    </router-link>
    <router-link to="/list">
      Открыть список пользователей
    </router-link>

    <hr>

    <div class="form-group">
      <label>Поле формы привязанное к Vuex</label>
      <input v-model="vuextest" class="form-control">
    </div>

  </div>
</template>

<script>
export default {
  name: 'Index',
  computed: {
    // Двустороннее вычисляемое свойство
    // для считывания и сохранения значения в Vuex
    vuextest: {
      get () {
        return this.$store.state.navbarTitle
      },
      set (value) {
        this.$store.commit('changeTitle', value)
      }
    }
  }
};
</script>
