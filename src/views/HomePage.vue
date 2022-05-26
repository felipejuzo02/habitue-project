<template>
  <section class="home-page" :class="homePageClasses">
    <header class="home-page__header pa-lg">
      <h1 class="home-page__title">
        <img src="../assets/logo.svg" alt="Logo Habitue">
      </h1>
  
      <div class="home-page__filters mt-md">
        <search-filter placeholder="Buscar paises..." @click="chamandoOSearch" v-model="searchValue" />
        <button class="home-page__filter-button px-sm ml-md" @click="goToFilters">
          <img src="../assets/icons/filter.svg" alt="Icone de filtro">
        </button>
      </div>
  
      <div class="home-page__chips mt-md">
        <chip-filter :label="continentName" />
        <chip-filter v-if="hasLanguageQuantity" :label="quantityLanguageLabel" />
      </div>
    </header>

    <main class="home-page__list px-lg">
      <div v-if="loadingFinished" class="pb-md">
        <h2 class="section-title pt-md">Listagem</h2>
        <div v-if="countriesList.length">
          <country-card v-for="(item, index) in countriesList" :key="index" :country="item" :continent="continent.name" class="my-md" />
        </div>
        <p v-else class="home-page__no-results mt-xl">Nenhum resultado encontrado</p>
      </div>

      <div class="home-page__loading" v-else>
        <loading-list v-if="!continentModal"  />
      </div>
    </main>
  </section>

  <div v-if="continentModal" class="home-page__continents-modal pa-lg">
    <div>
      <h3 class="mb-sm">Escolha um continente</h3>
      <p>Para continuar, é necessário que você defina um continente para realizar a consulta.</p>
    </div>
    <select-options placeholder="Selecione um continente..." :options="continents" @choose-option="setSelectedContinent" />
    <main-button label="Confirmar escolha" @click="close" />
  </div>

  <div v-if="continentModal" class="home-page__opened-modal" @click="teste"></div>
</template>

<script>
import SearchFilter from '../components/SearchFilter.vue'
import ChipFilter from '../components/ChipFilter.vue'
import CountryCard from '../components/CountryCard.vue'
import LoadingList from '../components/LoadingList.vue'
import MainButton from '../components/MainButton.vue'
import SelectOptions from '../components/SelectOptions.vue'
import { filterList } from '../helpers'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    SearchFilter,
    ChipFilter,
    CountryCard,
    LoadingList,
    MainButton,
    SelectOptions
  },

  data() {
    return {
      loadingFinished: false,
      continentModal: false,
      selectedContinent: '',
      searchValue: ''
    }
  },

  computed: {
    ...mapGetters({
      continents: 'continents/continents',
      continent: 'continents/continent',
      customQuery: 'continents/customQuery'
    }),

    homePageClasses () {
      return this.continentModal && 'home-page--blur'
    },

    continentName () {
      return this.continent?.name
    },

    countriesList () {
      const { languageQuantity } = this.customQuery

      const countries = this.hasLanguageQuantity ? filterList(this.continent?.countries, languageQuantity) : this.continent?.countries

      return countries.filter(country => {
        const regex = new RegExp(this.searchValue, 'i')

        return regex.test(country?.name)
      })
    },

    hasLanguageQuantity () {
      const { languageQuantity } = this.customQuery

      return !!languageQuantity
    },

    quantityLanguageLabel () {
      const { languageQuantity } = this.customQuery

      return `${languageQuantity} ${languageQuantity === 1 ? 'idioma' : '+ idiomas'}`
    }
  },

  async created () {
    if (!this.continent?.name) {
      this.continentModal = true
      await this.fetchContinents()
    } else {
      await this.fetchContinent(this.customQuery?.continent)
    }

    this.loadingFinished = true
  },

  methods: {
    ...mapActions({
      fetchContinents: 'continents/fetchContinents',
      fetchContinent: 'continents/fetchContinent',
      setCustomQuery: 'continents/setCustomQuery'
    }),

    goToFilters () {
      this.$router.push({ name: 'Filters' })
    },

    teste() {
      console.log('Aqui fazer o pulse para sinalizar persistência do modal')
    },

    async close () {
      await this.fetchContinent(this.selectedContinent)
      this.setCustomQuery({ continent: this.selectedContinent })

      this.continentModal = false
    },

    setSelectedContinent (value) {
      this.selectedContinent = value
    },

    chamandoOSearch (value) {
      
    }
  }
}
</script>

<style lang="scss">
.home-page {
  background: $bg-white;

  &--blur {
    filter: blur(1px);
  }

  &__title {
    display: flex;
    justify-content: center;
  }

  &__filters {
    display: flex;
  }

  &__filter-button {
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: $grey2;
    }
  }

  &__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  &__list {
    border-radius: 36px 36px 0 0;
    background: #fff;
    height: 36px;
  }

  &__no-results {
    text-align: center;
    color: $grey3;
  }

  &__loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__continents-modal {
    background-color: white;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 420px;
    height: 320px;
    z-index: 999;

    & h3 {
      font-size: 1.375rem;
      color: $black;
    }

    & p {
      font-size: 0.875rem;
      color: $grey3;
    }
  }

  &__opened-modal {
    position: absolute;
    height: 100%;
    z-index: 100;
    width: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, .6);
  }
}
</style>