<template>
  <section
    class="home-page"
    :class="homePageClasses"
  >
    <header class="container home-page__header pa-lg">
      <h1 class="home-page__title">
        <img
          alt="Habitue Logo"
          src="../assets/logo.svg"
        >
      </h1>
  
      <div class="home-page__filters mt-md">
        <app-search-filter
          v-model="searchValue"
          placeholder="Search countries..."
        />
        <button
          class="home-page__filter-button ml-md px-sm"
          type="button"
          @click="goToFilters"
        >
          <img
            alt="Filter icon"
            src="../assets/icons/filter.svg"
          >
        </button>
      </div>
  
      <div class="home-page__chips mt-md">
        <app-chip-filter :label="continentName" />
        <app-chip-filter
          v-if="hasLanguageQuantity"
          :label="quantityLanguageLabel"
        />
        <div
          v-for="(item, index) in languagesFilter"
          :key="index"
        >
          <app-chip-filter
            v-if="hideOtherChip(item)"
            :label="languageLabel(item)"
          />
        </div>
      </div>
    </header>

    <main class="home-page__list px-lg">
      <div
        v-if="loadingFinished"
        class="container pb-md"
      >
        <h2 class="pt-md section-title">
          Listing
        </h2>
        <div
          v-if="hasCountries"
          class="home-page__countries-list"
        >
          <app-country-card
            v-for="(item, index) in countriesList"
            :key="index"
            class="my-md"
            :continent="continent.name"
            :country="item"
          />
        </div>
        <p
          v-else
          class="home-page__no-results mt-xl"
        >
          No results found
        </p>
      </div>

      <div
        v-else
        class="home-page__loading"
      >
        <app-loading-list v-if="!continentModal" />
      </div>
    </main>
  </section>

  <div
    v-if="continentModal"
    class="home-page__continents-modal pa-lg"
  >
    <div>
      <h3 class="mb-sm">
        Choose a continent
      </h3>
      <p>To proceed, you must define a continent to carry out the query.</p>
    </div>
    <app-select
      :options="continents"
      placeholder="Select a continent..."
      @choose-option="setSelectedContinent"
    />
    <app-main-button
      label="Confirm choice"
      @click="confirmChoice"
    />
  </div>

  <div
    v-if="continentModal"
    class="home-page__opened-modal"
  />
</template>

<script>
import AppSearchFilter from '../components/AppSearchFilter.vue'
import AppChipFilter from '../components/AppChipFilter.vue'
import AppCountryCard from '../components/AppCountryCard.vue'
import AppLoadingList from '../components/AppLoadingList.vue'
import AppMainButton from '../components/AppMainButton.vue'
import AppSelect from '../components/AppSelect.vue'

import { filterList } from '../helpers'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'HomePage',

  components: {
    AppSearchFilter,
    AppChipFilter,
    AppCountryCard,
    AppLoadingList,
    AppMainButton,
    AppSelect
  },

  data() {
    return {
      loadingFinished: false,
      continentModal: false,
      selectedContinent: '',
      searchValue: '',
      hasError: false
    }
  },

  computed: {
    ...mapGetters({
      continents: 'continents/continents',
      continent: 'continents/continent',
      customQuery: 'continents/customQuery',
      languages: 'continents/languages'
    }),

    languagesFilter () {
      return this.customQuery?.languages
    },

    homePageClasses () {
      return this.continentModal && 'home-page--blur'
    },

    continentName () {
      return this.continent?.name
    },

    hasCountries () {
      return this.countriesList?.length
    },

    countriesList () {
      const { languageQuantity, languages } = this.customQuery
      const countries = this.hasLanguageQuantity || languages
        ? filterList(this.continent?.countries, languageQuantity, languages) 
        : this.continent?.countries

      if(countries) {
        return countries.filter(country => {
          const regex = new RegExp(this.searchValue, 'i')
  
          return regex.test(country?.name)
        })
      }

      return []
    },

    hasLanguageQuantity () {
      const { languageQuantity } = this.customQuery

      return !!languageQuantity
    },

    quantityLanguageLabel () {
      const { languageQuantity } = this.customQuery

      return `${languageQuantity} ${languageQuantity === 1 ? 'language' : '+ languages'}`
    }
  },

  async created () {
    if (!this.continent?.name) {
      this.continentModal = true
      await this.fetchContinents()
    } else {
      await this.fetchContinent(this.customQuery?.continent)
    }
      
    await this.fetchLanguages()

    this.loadingFinished = true
  },

  methods: {
    ...mapActions({
      fetchContinents: 'continents/fetchContinents',
      fetchContinent: 'continents/fetchContinent',
      setCustomQuery: 'continents/setCustomQuery',
      fetchLanguages: 'continents/fetchLanguages'
    }),

    hideOtherChip (value) {
      return value !== 'other'
    },

    goToFilters () {
      this.$router.push({ name: 'Filters' })
    },
    
    languageLabel (code) {
      return this.languages.find(language => language.code === code)?.name
    },

    async confirmChoice () {
      await this.fetchContinent(this.selectedContinent)
      this.setCustomQuery({ continent: this.selectedContinent })
      this.continentModal = false
    },

    setSelectedContinent (value) {
      this.selectedContinent = value
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

@include desktop-only {
  .home-page {
    &__header {
      padding: 32px 0 !important;
    }

    &__countries-list {
      display: flex;
      flex-wrap: wrap;
      gap: 2%;
    }
  }
}
</style>