import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuth: false,
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