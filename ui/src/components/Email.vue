<template>
  <tr class="email">
    <td>{{ email.name }}</td>
    <td>{{ email.email }}</td>
    <td>
      <span v-if="email.status === 1">⌛</span>
      <span v-else-if="email.status === 2">📨</span>
      <span v-if="email.status === 3">✅</span>
      <span v-if="email.status === 4">❌</span>
      {{ email.status_message }}
    </td>
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

<style scoped></style>
