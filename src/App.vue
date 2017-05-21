<template>
  <div id="app">

    <div class="container">

      <div class="hello">
        <router-link to="/user">Открыть пользователя</router-link>
        <router-link to="/list">Открыть список пользователей</router-link>
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
#app {
  margin-top: 60px;
}
</style>
