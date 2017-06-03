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

  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      title: 'Vue.js course project',
    };
  },
};
</script>
