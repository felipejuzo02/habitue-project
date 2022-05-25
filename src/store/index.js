import { createStore } from 'vuex'
import continents from './modules/continents'

export default createStore({
  modules: {
    continents
  }
})
