import Vue from 'vue';
import Router from 'vue-router';

import Hello from '@/components/Hello.vue';
import UserEdit from '@/components/UserEdit.vue';
import UserAdd from '@/components/UserAdd.vue';
import Table from '@/components/Table.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Hello, },
    { path: '/list', component: Table, },
    { path: '/user/add', component: UserAdd, },
    { path: '/user/:id', component: UserEdit, props: true, },
  ],
});
