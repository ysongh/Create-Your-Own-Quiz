import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: "",
    subject: "",
    body: "",
  },
  getters: {
    title: state => state.title,
    subject: state => state.subject,
    body: state => state.body,
  },
  actions: {
    updateTitle({ commit }, value){
      commit('setTitle', value);
    },
    updateSubject({ commit }, value){
      commit('setSubject', value);
    },
    updateBody({ commit }, value){
      commit('setBody', value);
    }
  },
  mutations: {
    setTitle: (state, title) => (state.title = title),
    setSubject: (state, subject) => (state.subject = subject),
    setBody: (state, body) => (state.body = body)
  }
})
