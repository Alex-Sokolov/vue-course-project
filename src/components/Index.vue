<!-- Компонент "главной" страницы -->

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <router-link to="/user/add">Добавить пользователя</router-link>
    <router-link to="/list">Открыть список пользователей</router-link>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Vue.js course project',
    };
  },
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
