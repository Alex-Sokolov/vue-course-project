import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import Vue from 'vue';

// Компонент страницы-шаблон
import App from './App.vue';

// Экземпляр маршрутизатора Vue-router с маршрутами
import router from './router';

// Экземпляр хранилища Vuex
import store from './store';

Vue.config.productionTip = false;

window.addEventListener('unhandledrejection', event => {
  window.console.error(event.promise);
  window.console.error(event.reason);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
