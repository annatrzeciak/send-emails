import Vue from "vue";

export async function sendEmails(payload) {
  return await Vue.http.post("http://localhost:3333/api/emails", {
    emails: payload,
  });
}

export async function getEmails() {
  return await Vue.http.get("http://localhost:3333/api/emails");
}
