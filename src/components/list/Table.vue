<template>
  <div class="panel panel-primary">
    <div class="panel-heading">
      Список пользователей
    </div>
    <div class="panel-body">

      <dashboard-grid :config="config" :dataSource="dataSource" title="Пользователей в базе"></dashboard-grid>

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
    // Заголовок таблицы
    test: 'Список пользователей',

    // Источник данных DataTables
    dataSource: {
      url: 'http://localhost:3004/users/',
      dataSrc: ''
    },

    // Конфигурация DataTables
    config: {
      columns: [
        {
          title: 'ID',
          data: 'id',
          type: 'num',
          render: data => `
              <a href="/user/${data}"># ${data}</a>
            `
        },
        {
          title: 'Имя',
          data: 'firstName'
        },
        {
          title: 'Фамилия',
          data: 'lastName'
        },
        {
          title: 'Активен',
          data: 'isActive'
        },
        {
          title: 'Баланс',
          data: 'balance'
        },
        {
          title: 'Email',
          data: 'email'
        },
        {
          title: 'Телефон',
          data: 'phone'
        },
        {
          title: 'Зарегистрирован',
          data: 'registered'
        }
      ]

    }
  })
};
</script>
