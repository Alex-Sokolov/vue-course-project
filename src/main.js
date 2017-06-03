import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

window.addEventListener('unhandledrejection', (event) => {
  window.console.error(event.promise);
  window.console.error(event.reason);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
