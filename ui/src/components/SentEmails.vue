<template>
  <div>
    <h2>Sent emails</h2>
    <div v-if="loading"><i class="loading" /> Loading...</div>
    <div class="errorMessage" v-if="errorMessage">
      {{ errorMessage }}<br />
      <button @click="loadEmails" class="small link">try again</button>
    </div>
    <div v-if="sortedEmails.length">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          <Email v-for="email in EMAILS" :email="email" :key="email.id" />
        </tbody>
      </table>
    </div>
    <div v-else-if="!loading">no data to display</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Email from "./Email";

export default {
  name: "SentEmails",
  components: { Email },
  data: () => ({ loading: false, errorMessage: "" }),
  computed: {
    ...mapGetters("email", ["EMAILS"]),
    sortedEmails() {
      const emails = this.EMAILS;
      return emails.sort((a, b) => (a.date < b.date ? 1 : -1));
    },
  },
  methods: {
    ...mapActions("email", ["FETCH_EMAILS"]),
    loadEmails() {
      this.errorMessage = "";
      this.loading = true;
      this.FETCH_EMAILS()
        .catch((e) => {
          this.errorMessage = e.bodyText;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  created() {
    this.loadEmails();
  },
};
</script>

<style scoped>
table {
  margin-right: auto;
  margin-left: auto;
  border-spacing: 0;
}
table thead tr {
  background: rgba(0, 0, 0, 0.2);
}
table th,
table /deep/ td {
  padding: 5px 10px;
  text-align: left;
}

table /deep/ tr:nth-of-type(2n) {
  background: rgba(0, 0, 0, 0.1);
}
</style>
