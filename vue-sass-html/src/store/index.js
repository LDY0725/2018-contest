import Vue from 'vue'
import Vuex from 'vuex'
import container from './modules/container'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    container
  },
})
