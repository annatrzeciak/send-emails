<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from "./components/Home.vue";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
i.loading {
  content: url("/loading.gif");
  height: 24px;
  width: 24px;
}
button {
  background: royalblue;
  border: 1px solid royalblue;
  color: white;
  margin-top: 15px;
  padding: 8px 12px;
  transition-duration: 0.3s;
}
button:disabled {
  background: rgba(65, 105, 225, 0.5);
  border-color: rgba(65, 105, 225, 0.7);
}
button:not(:disabled):hover {
  background: white;
  color: royalblue;
  cursor: pointer;
}
button.small {
  padding: 4px 6px;
  margin-top: 5px;
  margin-bottom: 15px;
}
button.link {
  border: 0;
  color: royalblue;
  background: transparent;
}
button.link:hover {
  text-decoration: underline;
}
button.link:focus {
  outline: none;
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
