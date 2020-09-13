import Vue from "vue";
import App from "./App.vue";
import socketIO from "socket.io-client";
import VueSocketIO from "vue-socket.io";
import VueResource from "vue-resource";
import store from "./store/store";

const SocketInstance = socketIO.connect("http://localhost:3333");

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketInstance,
    vuex: {
      store,
      actionPrefix: "SOCKET_",
    },
  })
);
Vue.use(VueResource);

new Vue({
  el: "#app",
  store,
  render: (h) => h(App),
});
