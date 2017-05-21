import Vue from 'vue';
import Router from 'vue-router';

import Hello from '@/components/Hello';
import User from '@/components/User';
import Table from '@/components/Table';

Vue.use(Router);

export default new Router({
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
      name: 'User',
      component: User,
    },
  ],
});
