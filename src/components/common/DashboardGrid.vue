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

      <div class="form-group">
        <div class="col-md-2">
          <rows-picker v-model.number="rowsPerPage"></rows-picker>
        </div>
        <div class="col-md-4">
          <p class="form-control-static">Выбрано элементов на страницу {{ rowsPerPage }}</p>
        </div>
      </div>

      <table ref="table" class="table table-striped">
        <thead>
          <slot name="header"></slot>
        </thead>
        <tbody>
          <tr v-for="item in filteredRows" :key="item.id">
            <slot name="row" v-bind="item"></slot>
          </tr>
        </tbody>
      </table>

      <div class="form-group">
        <strong>Выбрана страница {{ selectedPage }}</strong>
        <rows-paginator v-model.number="selectedPage" :per-page="rowsPerPage" :total="totalRows"></rows-paginator>
      </div>
    </div>
  </div>
</template>

<script>
// Используемые плагины
import axios from 'axios';

// Используемые компоненты
import RowsPicker from './Dashboard/RowsPerPage.vue';
import RowsPaginator from './Dashboard/RowsPaginator.vue';

export default {
  name: 'DashboardGrid',
  components: {
    RowsPicker,
    RowsPaginator
  },
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

    // Количество строк на страницу
    rowsPerPage: 5,

    // Отображаемая страница
    selectedPage: 1,

    // Флаг обновления данных
    loading: false,
  }),
  computed: {
    // Количество строк в таблице
    totalRows() {
      return this.list.length;
    },

    // Отображаемые строки таблицы
    filteredRows() {
      return this.list
        .filter((item, index) => {
          const startIndex = (this.selectedPage - 1) * this.rowsPerPage;
          const finalIndex = startIndex + this.rowsPerPage;

          return startIndex <= index && index < finalIndex;
        });
    }
  },
  watch: {
    // При изменении количества элементов на страницу
    rowsPerPage() {
      this.selectedPage = 1;
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
