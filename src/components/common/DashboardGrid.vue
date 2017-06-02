<!-- Компонент таблицы с плагином DataTables -->

<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <button type="button" v-on:click="reloadTable" class="pull-right btn btn-xs btn-default btn-outline" title="Нажмите чтобы обновить таблицу">
        <i :class="['fa fa-fw fa-refresh', loading ? 'fa-spin' : '']"></i>
        Обновить таблицу
      </button>
      {{ title }} &ndash; {{ totalRows }}
    </div>
    <div class="panel-body">
      <table ref="table" class="table table-striped"></table>
    </div>
  </div>
</template>

<style>
.dataTables_filter input[type="search"] {
  width: 390px !important;
}

.dataTables_processing {
  top: 100px !important;
}

.dataTable thead {
  font-size: 12px;
}
</style>

<script>
// Используемые плагины
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';

export default {
  name: 'DashboardGrid',
  props: {
    // Заголовок таблицы
    title: {
      type: String,
      default: 'Таблица'
    },

    // DataTables: конфиг
    config: {
      type: Object,
      required: true
    },

    // DataTables: настройки AJAX
    dataSource: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    // Ссылка на API DataTables
    grid: null,

    // Флаг обновления таблицы
    loading: true,

    // Количество строк в таблице
    totalRows: 0
  }),
  watch: {
    // Отслеживаем обновление конфига AJAX
    dataSource: 'onDataSourceChanged'
  },
  methods: {
    // Обновление настроек при изменении конфига AJAX
    onDataSourceChanged(newAjax) {
      this.grid.settings()[0].ajax = newAjax;
      this.reloadTable();
    },

    // Обновление таблицы
    reloadTable() {
      this.loading = true;
      this.grid.ajax.reload(this.updateCallback);
    },

    // Обновить количество строк в таблице
    updateRowsCount() {
      const count = this.grid
        ? this.grid.data().count()
        : 0;

      this.totalRows = count;
    },

    // Callback при завершении инициализации
    // или завершении обновлении таблицы
    updateCallback() {
      this.loading = false;
      this.updateRowsCount();
    },

    // Callback при переключении страниц таблицы
    // для скроллинга к началу страницы
    scrollToTopCallback() {
      $('html, body').animate({ scrollTop: 0 }, 300);
    }
  },
  mounted() {
    // Объединяем конфиг DataTables с настройками AJAX
    const dataTableConfig = Object.assign({},
      this.config,
      {
        // Конфигурация для загрузки AJAX
        ajax: this.dataSource,

        // Окончание первоначальной инициализации таблицы
        initComplete: this.updateCallback
      });

    // Инициализируем плагин и сохраняем ссылку на API
    // + добавляем обработчик на переключение страниц таблицы
    this.grid = $(this.$refs.table)
      .DataTable(dataTableConfig)
      .on('page.dt', this.scrollToTopCallback);

    // Отслеживаем глобальное событие на обновление таблицы
    // Необходимо при изменении счётчика у активного фильтра
    this.$root.$on('refresh-table', this.reloadTable);
  }
};
</script>
