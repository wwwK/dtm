import { createStore } from 'vuex';

export default createStore({
  state: {
    activePath: ''
  },
  mutations: {
    setPath(state, path: string) {
      state.activePath = path;
    }
  },
  actions: {},
  modules: {}
});
