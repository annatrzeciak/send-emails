<template>
  <tr class="email">
    <td>{{ email.name }}</td>
    <td>{{ email.email }}</td>
    <td>{{ email.status }}</td>
    <td>{{ new Date(email.date).toLocaleString() }}</td>
  </tr>
</template>

<script>
export default {
  name: "Email",
  props: {
    email: {
      type: Object,
    },
  },
};
</script>

<style scoped>
td {
  padding: 5px 10px;
}
</style>
