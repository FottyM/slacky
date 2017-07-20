import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({

  state: {
    currentUser: null,
    currentChannel: null
  },

  mutations: {
    SET_USER(state, user) {
      state.currentUser = user
    }
  },

  actions: {
    setUser({commit}, user) {
      commit('SET_USER', user)
    }
  },

  getters: {
    currentUser: state => state.currentUser
  }

});

export default store;

