import Vue from 'vue';
import Router from 'vue-router';

import Hello from '@/components/Hello.vue';
import User from '@/components/User.vue';
import Table from '@/components/Table.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/list',
      name: 'Table',
      component: Table,
    },
    {
      path: '/user',
      name: 'UserHome',
      component: User,
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User,
      props: true
    },
  ],
});
