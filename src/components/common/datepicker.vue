<!-- Компонент календарика с плагином Flatpickr -->

<template>
  <div class="js-datepicker">
    <input type="text" ref="datepicker" class="form-control" :value="value" :placeholder="placeholder" />
  </div>
</template>

<style>
/* Отключаем серый фон readonly-полей календарей */

.js-datepicker .flatpickr-input {
  background-color: #fff;
}
</style>

<script>
// Плагин календаря, локализация, стили
import Flatpickr from 'flatpickr';
import { ru } from 'flatpickr/dist/l10n/ru';
import 'flatpickr/dist/flatpickr.css';

export default {
  name: 'Datepicker',
  props: {
    // Отображаемая дата
    value: {
      type: String,
      required: true
    },

    // Подсказка для поля
    placeholder: {
      type: String,
      default: 'Выберите дату'
    }
  },
  data: () => ({
    // Экземпляр плагина
    fp: null
  }),
  watch: {
    // Обновление даты сверху должно обновлять календарь
    value: 'updateDatepicker'
  },
  methods: {
    // Обновление даты при изменении входных данных
    // Оригинальное поле скрывается календарём и нужно обновлять
    updateDatepicker() {
      if (this.fp) {
        this.fp.setDate(this.value);
      }
    },

    // Инициализация плагина календаря
    initCalendar() {
      this.fp = new Flatpickr(this.$refs.datepicker, {
        locale: ru,
        dateFormat: 'd.m.Y',
        onChange: (selectedDates, dateStr) => {
          this.$emit('input', dateStr);
        }
      });
    }
  },
  mounted() {
    this.initCalendar();
  }
};
</script>
