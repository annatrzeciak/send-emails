<template>
  <div>
    <input
      ref="fileInput"
      name="file"
      type="file"
      accept=".tsv"
      @change="loadTextFromFile"
    />
    <i v-if="loading" class="loading" />
  </div>
</template>

<script>
export default {
  name: "FileReader",
  data: () => ({ loading: false }),
  props: {
    hasErrors: Boolean,
    successfullySent: Boolean,
  },
  methods: {
    loadTextFromFile(ev) {
      this.loading = true;
      const file = ev.target.files[0];
      if (file.type === "text/tab-separated-values") {
        const reader = new FileReader();

        reader.onload = (e) => this.$emit("load", e.target.result);
        reader.readAsText(file);
      } else {
        this.$emit("error", "Wrong file format");
      }
      this.loading = false;
    },
  },
  watch: {
    hasErrors() {
      if (this.hasErrors) {
        this.$refs.fileInput.value = "";
      }
    },
    successfullySent() {
      if (this.successfullySent) {
        this.$refs.fileInput.value = "";
      }
    },
  },
};
</script>

<style scoped>
input {
  margin-top: 5px;
}
</style>
