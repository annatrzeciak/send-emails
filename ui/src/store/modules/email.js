import Vue from "vue";
import * as Email from "../api/email";

export default {
  namespaced: true,
  state: {
    emails: [],
    sending_error: false,
  },
  getters: {
    EMAILS: (state) => {
      return state.emails;
    },
    SENDING_ERROR: (state) => state.sending_error,
  },
  mutations: {
    SET_EMAILS: (state, payload) => {
      state.emails = payload;
    },
    ADD_EMAILS: (state, payload) => {
      state.emails.push(...payload);
    },
    UPDATE_EMAIL_STATUS: (state, payload) => {
      const index = state.emails.map((e) => e._id).indexOf(payload._id);
      Vue.set(state.emails, index, payload);
    },
    SET_SENDING_ERROR: (state, payload) => {
      state.sending_error = payload;
    },
  },

  actions: {
    SOCKET_UPDATE_STATUS(context, success) {
      context.commit("UPDATE_EMAIL_STATUS", success);
      context.commit("SET_SENDING_ERROR", false);
    },
    SOCKET_SENDING_ERROR(context) {
      context.commit("SET_SENDING_ERROR", true);
    },
    FETCH_EMAILS: async (context) => {
      return Email.getEmails()
        .then((success) => {
          context.commit("SET_EMAILS", success.data);

          return Promise.resolve(success.data);
        })
        .catch((err) => Promise.reject(err));
    },
    SEND_EMAILS: async (context, payload) => {
      return Email.sendEmails(payload)
        .then((success) => {
          context.commit("ADD_EMAILS", success.data);

          return Promise.resolve(success.data);
        })
        .catch((err) => Promise.reject(err));
    },
  },
};
