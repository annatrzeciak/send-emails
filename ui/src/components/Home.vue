<template>
  <div class="content">
    <h1>Send email to multiple users</h1>
    <form @submit.prevent="sendEmails">
      <label>
        Load tsv file
        <FileReader @load="loadFile" @error="setErrorMessage" />
      </label>
      <div class="errorMessage" v-if="errorMessage">{{ errorMessage }}</div>
      <button :disabled="!fileAsArray.length" type="submit">Send</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import FileReader from "./FileReader.vue";
export default {
  name: "Home",
  props: {},
  components: { FileReader },
  data: () => ({ file: null, errorMessage: "" }),
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
    loadFile(fileContent) {
      this.errorMessage = "";
      this.file = fileContent;
    },
    setErrorMessage(errorMessage) {
      this.file = "";
      this.errorMessage = errorMessage;
    },
    async sendEmails() {
      await axios
        .post("http://localhost:3001/api/emails", { emails: this.fileAsArray })
        .then((resp) => {
          console.log(resp);
        });
    },
  },
};
</script>

<style scoped>
.content {
  text-align: center;
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
</style>
