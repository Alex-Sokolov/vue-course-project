<template>
  <select :value="value" @input="changed" class="form-control">
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
    }
  },
  data: () => ({
    // Список вариантов
    list: [2, 5, 10, 100]
  }),
  methods: {
    // Выбор нового количества строк на страницу
    changed(event) {
      this.$emit('input', event.target.value);
    }
  }
}
</script>
