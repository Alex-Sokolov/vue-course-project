<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li :class="{ disabled: value === 1 }">
        <a href="#" aria-label="Previous" @click.prevent="prevPage">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="item in maxPages" :key="item" :class="{ active: value === item }">
        <a href="#" @click.prevent="selectPage(item)">
          {{ item }}
        </a>
      </li>
      <li :class="{ disabled: value === maxPages }">
        <a href="#" aria-label="Next" @click.prevent="nextPage">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'RowsPaginator',
  props: {
    // Выбранная страница
    value: {
      type: Number,
      required: true
    },

    // Количество строк на страницу
    perPage: {
      type: Number,
      required: true
    },

    // Общее количество строк в таблице
    total: {
      type: Number,
      required: true
    }
  },
  computed: {
    // Максимальное количество страниц
    maxPages() {
      return Math.ceil(this.total / this.perPage);
    }
  },
  methods: {
    // Предыдущая страница
    prevPage() {
      const pageNum = this.value - 1;
      if (pageNum > 0) {
        this.selectPage(pageNum);
      }
    },

    // Следующая страница
    nextPage() {
      const pageNum = this.value + 1;
      if (pageNum <= this.maxPages) {
        this.selectPage(pageNum);
      }
    },

    // Выбор новой страницы
    selectPage(page) {
      this.$emit('input', page);
    }
  }
}
</script>
