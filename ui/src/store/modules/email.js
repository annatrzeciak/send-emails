import * as Email from "../api/email";

export default {
  namespaced: true,
  state: {
    emails: [],
  },
  getters: {
    EMAILS: (state) => {
      return state.emails;
    },
  },
  mutations: {
    SET_EMAILS: (state, payload) => {
      state.emails = payload;
    },
    ADD_EMAILS: (state, payload) => {
      state.emails.push(...payload);
    },
  },

  actions: {
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
