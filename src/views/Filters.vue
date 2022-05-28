<template>
  <section class="filters-page">
    <header class="filters-page__header pa-lg container">
      <button class="filters-page__back-button" @click="$router.go(-1)">
        <img src="../assets/icons/arrow-left.svg" alt="Back page icon">
      </button>
      <h3>Filter</h3>
    </header>
    <main class="filters-page__choose-filters px-lg">
      <div class="container">
        <h2 class="section-title pt-md">Choose filters</h2>
  
        <section class="my-lg">
          <p>Continent</p>
          <select-options :placeholder="defaultPlaceholder" :options="continents" @choose-option="setSelectedContinent" />
        </section>
  
        <section class="my-lg">
          <p>Number of languages in the country</p>
          <div class="mt-xs">
            <div class="filters-page__radio">
              <input type="radio" id="0" value="0" name="moreLanguages" v-model="languageQuantity">
              <label for="0">Show all</label>
            </div>
            <div class="filters-page__radio my-xs">
              <input type="radio" id="1" value="1" name="moreLanguages" v-model="languageQuantity">
              <label for="1">1 only</label>
            </div>
            <div class="filters-page__radio">
              <input type="radio" id="2" value="2" name="moreLanguages" v-model="languageQuantity">
              <label for="2">2 or more</label>
            </div>
          </div>
        </section>
  
        <section class="filters-page__languages">
          <p class="mb-xs">Languages</p>
          <div class="filters-page__languages-container">
            <div class="filters-page__checkbox">
              <input type="checkbox" id="pt" value="pt" name="languages" v-model="languages">
              <label for="pt">Portuguese</label>
            </div>
            <div class="filters-page__checkbox my-xs">
              <input type="checkbox" id="en" value="en" name="languages" v-model="languages">
              <label for="en">English</label>
            </div>
            <div class="filters-page__checkbox">
              <input type="checkbox" id="es" value="es" name="languages" v-model="languages">
              <label for="es">Spanish</label>
            </div>
            <div class="filters-page__checkbox my-xs">
              <input type="checkbox" id="de" value="de" name="languages" v-model="languages">
              <label for="de">German</label>
            </div>
            <div class="filters-page__checkbox">
              <input type="checkbox" id="fr" value="fr" name="languages" v-model="languages">
              <label for="fr">French</label>
            </div>
            <div class="filters-page__checkbox my-xs" @click="clearOthersLanguages">
              <input type="checkbox" id="other" value="other" name="languages" v-model="languages">
              <label for="other">Other</label>
            </div>
            <div class="filters-page__checkbox my-xs">
              <div class="px-md" v-for="(item, index) in othersLanguages" :key="index">
                <input type="checkbox" :id="item" :value="item" name="othersLanguages" v-model="othersLanguages">
                <label :for="item">{{ languageLabel(item) }}</label>
              </div>
            </div>

            <div v-if="isOtherLanguage" class="mt-md">
              <p>Enter the desired language name</p>
              <search-filter placeholder="Buscar idiomas" v-model="searchValue" @search="searchLanguages" :error="hasErrors" :error-message="errorMessage" />
              <p v-if="noResults" class="filters-page__no-results pa-sm mt-md">No results found</p>
              <div v-else >
                <div v-for="(item, index) in searchedLanguages" :key="index" class="mt-sm filters-page__languages-list">
                  <p class="pa-sm" @click="selectLanguage(item)">{{ item.name }}</p>
                </div>
              </div>

            </div>
          </div>
        </section>
  
        <footer class="filters-page__buttons mt-xl">
          <button class="filters-page__clear-filters" @click="clearFilters">
            <img src="../assets/icons/delete.svg" alt="Delete icon">
            <p>Clear filters</p>
          </button>
          <main-button label="Filter" @click="confirmFilter" />
          <button class="filters-page__secondary-button" @click="$router.go(-1)">Cancel</button>
        </footer>
      </div>
    </main>
  </section>
</template>

<script>
import SelectOptions from '../components/SelectOptions.vue'
import SearchFilter from '../components/SearchFilter.vue'
import MainButton from '../components/MainButton.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    SelectOptions,
    MainButton,
    SearchFilter
  },

  data () {
    return {
      selectedContinent: '',
      languages: [],
      languageQuantity: '',
      searchedLanguages: [],
      searchValue: '',
      othersLanguages: [],
      hasErrors: false,
      didResearch: false
    }
  },

  watch: {
    languages () {
      if(!this.isOtherLanguage) {
        this.othersLanguages = []
      }
    }
  },

  computed: {
    ...mapGetters({
      continents: 'continents/continents',
      continent: 'continents/continent',
      customQuery: 'continents/customQuery',
      languagesList: 'continents/languages'
    }),

    errorMessage () {
      return this.hasErrors ? 'Select another language' : ''
    },

    noResults () {
      return !this.searchedLanguages.length && this.didResearch
    },

    defaultPlaceholder () {
      return this.continent?.name || 'Select a continent'
    },

    isOtherLanguage () {
      return this.languages.includes('other')
    }
  },

  async created () {
    this.continent && await this.fetchContinents()
    this.setDefaultRadio()
    this.setDefaultCheckbox()
  },

  methods: {
    ...mapActions({
      fetchContinents: 'continents/fetchContinents',
      setCustomQuery: 'continents/setCustomQuery'
    }),

    clearFilters () {
      this.languages = []
      this.languageQuantity = '0'
      this.othersLanguages = []
      this.searchValue = ''
      this.hasErrors = false
    },

    languageLabel (code) {
      return this.languagesList.find(language => language.code === code)?.name
    },

    selectLanguage (language) {
      if(!this.othersLanguages.includes(language.code)) {
        this.othersLanguages.push(language.code)
      } 
    },

    searchLanguages () {
      this.didResearch = true

      const searchedLanguages = this.languagesList.filter(language => {
        const regex = new RegExp(this.searchValue, 'i')

        return regex.test(language?.name)
      })

      this.searchedLanguages = searchedLanguages
    },

    confirmFilter () {
      if (this.languages.includes('other') && !this.othersLanguages.length) {
        this.hasErrors = true
        return
      }

      this.setCustomQuery({
        continent: this.selectedContinent || this.continent?.code,
        languageQuantity: parseInt(this.languageQuantity),
        languages: [...this.languages, ...this.othersLanguages]
      })

      this.hasErrors = false
      this.$router.push({ name: 'Home' })
    },

    setSelectedContinent (value) {
      this.selectedContinent = value
    },

    setDefaultRadio () {
      const { languageQuantity } = this.customQuery

      this.languageQuantity = languageQuantity || '0'
    },

    setDefaultCheckbox () {
      const { languages } = this.customQuery
      const defaultLanguages = ['pt', 'en', 'es', 'de', 'fr', 'other']

      this.languages = languages?.filter(language => defaultLanguages.includes(language)) || []
      this.othersLanguages = languages?.filter(language => !defaultLanguages.includes(language)) || []
    }
  }
}
</script>

<style lang="scss">
.filters-page {
  background: $bg-white;

  &__header {
    text-align: center;
    position: relative;

    & > h3 {
      font-size: 1.375rem;
      color: $primary;
    }
  }

  &__back-button {
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    left: 1.875rem;
    padding: 6px;

    &:hover {
      background-color: $grey2;
    }
  }

   &__choose-filters {
    border-radius: 36px 36px 0 0;
    background: #fff;
    color: $black;
  }

  &__radio {
    & input {
      display: none;

      & + label:before {
        content: '';
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: $white;
        border: 1px solid $grey3;
        display: inline-block;
        vertical-align: middle;
        margin-right: 0.5rem;
        margin-bottom: 0.25rem;
      }

      &:checked + label:before {
        background-color: $white;
        box-sizing: border-box;
        border: 5px solid $primary;
        padding: 0.25rem;
      }
    }
  }

  &__checkbox {
    & input {
      display: none;

      & + label:before {
        content: '';
        width: 1rem;
        height: 1rem;
        background-color: $white;
        border: 1px solid $grey3;
        display: inline-block;
        vertical-align: middle;
        margin-right: 0.5rem;
        margin-bottom: 0.25rem;
      }

      &:checked + label:before {
        background-color: $white;
        box-sizing: border-box;
        border: 5px solid $primary;
        padding: 0.25rem;
      }
    }
  }

  &__languages-list {
    & p {
      font-size: 1rem;
      color: $black;
      padding: 0.5rem;
      cursor: pointer;

      &:hover {
        background-color: $grey2;
      }
    }
  }

  &__no-results {
    font-size: .875rem;
    color: $grey3;
  }

  &__clear-filters {
    display: flex;
    align-items: center;
    gap: 1em;
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    color: $negative;
    cursor: pointer;
    
    &:hover {
      background-color: #fae8e8;
    }
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  &__secondary-button {
    background: none;
    border: none;
    color: $primary;
    cursor: pointer;
  }
}

@include desktop-only {
  .filters-page {
    &__header {
      padding: 32px 0 !important;
    }

    &__back-button {
      left: 0;
    }
  }
}
</style>