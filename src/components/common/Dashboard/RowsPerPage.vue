<!-- Компонент выбора количества строк на страницу таблицы -->

<template>
  <select class="form-control" :value="value" @input="changed($event.target.value)">
    <option v-for="item in list" :key="item" :value="item">
      {{ item }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'RowsPerPage',
  props: {
    // Выбранное количество строк на страницу
    value: {
      type: Number,
      required: true
    },

    // Список вариантов количеств строк на страницу
    // т.к. возвращаем массив, то должны использовать функцию возвращающую массив
    list: {
      type: Array,
      default: () => ([2, 5, 10, 100])
    }
  },
  methods: {
    // Выбор нового количества строк на страницу
    changed(value) {
      this.$emit('input', value);
    }
  }
}
</script>
