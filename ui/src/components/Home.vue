<template>
  <div class="content">
    <div class="col">
      <h1>Send email to multiple users</h1>
      <form @submit.prevent="sendEmails">
        <label>
          Load tsv file
          <FileReader
            :hasErrors="Boolean(errorMessage)"
            :successfullySent="Boolean(successMessage)"
            @load="loadFile"
            @error="setErrorMessage"
          />
        </label>
        <div class="errorMessage" v-if="errorMessage">{{ errorMessage }}</div>
        <div class="successMessage" v-if="successMessage">
          {{ successMessage }}
        </div>
        <button :disabled="!fileAsArray.length" type="submit">Send</button>
      </form>
    </div>
    <div class="col"><SentEmails /></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import FileReader from "./FileReader.vue";
import SentEmails from "./SentEmails";
export default {
  name: "Home",
  props: {},
  components: { SentEmails, FileReader },
  data: () => ({ file: null, errorMessage: "", successMessage: "" }),
  computed: {
    fileAsArray() {
      if (this.file) {
        const lines = this.file.split("\n");

        const columns = lines[0].split("\t");
        let rows = [];

        for (let i = 1; i < lines.length; i++) {
          let array = lines[i].split("\t");
          let row = {};

          for (let j in array) {
            row[columns[j]] = array[j];
          }
          if (row.Name || row.Email) rows.push(row);
        }

        return rows;
      } else {
        return [];
      }
    },
  },
  methods: {
    ...mapActions("email", ["SEND_EMAILS"]),

    loadFile(fileContent) {
      this.errorMessage = "";
      this.successMessage = "";
      this.file = fileContent;
    },
    setErrorMessage(errorMessage) {
      this.file = "";
      this.errorMessage = errorMessage;
    },
    setSuccessMessage(successMessage) {
      this.file = "";
      this.successMessage = successMessage;
    },
    async sendEmails() {
      this.SEND_EMAILS(this.fileAsArray)
        .then(() => {
          this.setSuccessMessage("Form submitted successfully");
        })
        .catch((e) => this.setErrorMessage(e.bodyText));
    },
  },
};
</script>

<style scoped>
.content {
  text-align: center;
  max-width: 1200px;
  padding-right: 20px;
  padding-left: 20px;
  margin-left: auto;
  margin-right: auto;
}
h3 {
  margin: 40px 0 0;
}
form {
  max-width: 400px;
  text-align: left;
  margin-right: auto;
  margin-left: auto;
}
button {
  background: #42b983;
  border: 1px solid #42b983;
  color: white;
  margin-top: 15px;
  padding: 8px 12px;
  transition-duration: 0.3s;
}
button:disabled {
  background: rgba(66, 185, 131, 0.7);
}
button:not(:disabled):hover {
  background: white;
  color: #42b983;
  cursor: pointer;
}
.errorMessage {
  padding-top: 5px;
  color: darkred;
}
.successMessage {
  padding-top: 5px;
  color: darkgreen;
}
</style>
