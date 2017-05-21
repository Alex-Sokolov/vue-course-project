<template>
  <div>
    {{ test }}

    <table class="table table-bordered">
      <tbody>
        <tr>
          <td>
            ФИО пользователей
          </td>
          <td>
            Даты рождения
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  data: () => ({
    test: 'Список пользователей',
  }),
};
</script>
