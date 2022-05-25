const baseURL = 'https://countries.trevorblades.com/graphql'

const state = {
  continents: [],
  continent: [],
  customQuery: {}
}

const getters = {
  continents: state => state.continents,
  continent: state => state.continent,
  customQuery: state => state.customQuery
}

const mutations = {
  setContinents: (state, { continents }) => {
    state.continents = continents
  },

  setContinent: (state, { continent }) => {
    state.continent = continent
  },

  setCustomQuery: (state, query) => {
    state.customQuery = query
  }
}

const actions = {
  async fetchContinents({ commit }) {
    const query = `
      {
        continents {
          name
          code
        }
      }`

    const { data } = await (await fetch(`${baseURL}?query=${query}`)).json()
    commit('setContinents', data)
  },

  async fetchContinent({ commit }, id) {
    const query = `
      {
        continent (code: "${id}") {
          name
          code
          countries {
            name
            languages {
              name
            }
          }
        }
      }`

    const { data } = await (await fetch(`${baseURL}?query=${query}`)).json()
    commit('setContinent', data)
  },

  setCustomQuery({ commit }, customQuery) {
    commit('setCustomQuery', customQuery)
  }
}

export default {
  namespaced: true,

  state,
  getters,
  mutations,
  actions
}
