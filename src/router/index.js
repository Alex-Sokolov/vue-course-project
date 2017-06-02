import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/components/Index.vue';
import UserEdit from '@/components/user/UserEdit.vue';
import UserAdd from '@/components/user/UserAdd.vue';
import Table from '@/components/list/Table.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Index, },
    { path: '/list', component: Table, },
    { path: '/user/add', component: UserAdd, },
    { path: '/user/:id', component: UserEdit, props: true, },
  ],
});
