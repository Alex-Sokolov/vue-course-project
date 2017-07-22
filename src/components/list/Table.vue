<!-- Страница со списком пользователей -->

<template>
  <div class="panel panel-primary">
    <div class="panel-heading">
      Список пользователей
    </div>
    <div class="panel-body">

      <dashboard-grid title="Пользователей в базе" :url="url">
        <tr slot="header">
          <th>#</th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Активен</th>
          <th>Баланс</th>
          <th>Email</th>
          <th>Телефон</th>
          <th>Зарегистрирован</th>
        </tr>
        <template slot="row" scope="props">
          <td><a :href="`/user/${props.id}`"># {{ props.id }}</a></td>
          <td>{{ props.firstName }}</td>
          <td>{{ props.lastName }}</td>
          <td>{{ props.isActive }}</td>
          <td>{{ props.balance }}</td>
          <td>{{ props.email }}</td>
          <td>{{ props.phone }}</td>
          <td>{{ props.registered }}</td>
        </template>
      </dashboard-grid>

    </div>
  </div>
</template>

<script>
// Используемые плагины
import DashboardGrid from '@/components/common/DashboardGrid.vue';

export default {
  name: 'Table',
  components: {
    DashboardGrid,
  },
  data: () => ({
    // URL загрузки списка пользователей
    url: 'http://localhost:3004/users/',
  })
};
</script>
