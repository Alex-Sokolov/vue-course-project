import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    navbarTitle: 'Vuex test title',
  },
  getters: {
    titleCount: state => state.navbarTitle.length,
  },
  mutations: {
    changeTitle(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.navbarTitle = payload;
    },
  },
  actions: {
    sendServer(context) {
      // В действиях можем использовать асинхронную логику
      // и потом с её результатом вызывать синхронные мутации
      context.commit('changeTitle');
    },
  },
});

export default store;
