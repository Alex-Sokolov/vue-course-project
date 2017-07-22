<!-- Компонент таблицы с плагином DataTables -->

<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <button type="button" @click="loadData" class="pull-right btn btn-xs btn-default btn-outline" title="Нажмите чтобы обновить таблицу">
        <i :class="['fa fa-fw fa-refresh', loading ? 'fa-spin' : '']"></i>
        Обновить таблицу
      </button>
      {{ title }} &ndash; {{ totalRows }}
    </div>
    <div class="panel-body">
      <table ref="table" class="table table-striped">
        <thead>
          <slot name="header"></slot>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <slot name="row" v-bind="item"></slot>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// Используемые плагины
import axios from 'axios';

export default {
  name: 'DashboardGrid',
  props: {
    // Заголовок таблицы
    title: {
      type: String,
      default: 'Таблица'
    },

    // URL загрузки списка
    url: {
      type: String,
      required: true
    }
  },
  data: () => ({
    // Список для таблицы
    list: [],

    // Флаг обновления данных
    loading: false,
  }),
  computed: {
    // Количество строк в таблице
    totalRows() {
      return this.list.length;
    }
  },
  methods: {
    // Загрузка данных таблицы
    loadData() {
      this.loading = true;

      axios.get(this.url)
        .then(response => response.data)
        .then((response) => {
          this.list = response;
          this.loading = false;
        });
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
