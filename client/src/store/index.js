import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuth: true,
    token: ''
  },
  getters: {
    getAuth: state => {
      return state.isAuth;
    },
    getToken: state => {
      return state.token;
    }
  },
  mutations: {
    setAuth(state, boolean) {
      state.isAuth = boolean
    },
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
  },
  modules: {
  }
})