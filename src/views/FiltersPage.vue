<template>
  <div class="filters-page">
    <header class="container filters-page__header pa-lg">
      <button
        class="filters-page__back-button"
        type="button"
        @click="$router.go(-1)"
      >
        <img
          alt="Back page icon"
          src="../assets/icons/arrow-left.svg"
        >
      </button>
      <h3>Filter</h3>
    </header>

    <main class="filters-page__choose-filters px-lg">
      <div class="container">
        <h2 class="pt-md section-title">
          Choose filters
        </h2>
  
        <section class="my-lg">
          <p>Continent</p>
          <select-options
            :options="continents"
            :placeholder="defaultPlaceholder"
            @choose-option="setSelectedContinent"
          />
        </section>
  
        <section class="my-lg">
          <p>Number of languages in the country</p>
          <div class="mt-xs">
            <div class="filters-page__radio">
              <input
                id="0"
                v-model="languageQuantity"
                name="moreLanguages"
                type="radio"
                value="0"
              >
              <label for="0">Show all</label>
            </div>
            <div class="filters-page__radio my-xs">
              <input
                id="1"
                v-model="languageQuantity"
                name="moreLanguages"
                type="radio"
                value="1"
              >
              <label for="1">1 only</label>
            </div>
            <div class="filters-page__radio">
              <input
                id="2"
                v-model="languageQuantity"
                name="moreLanguages"
                type="radio"
                value="2"
              >
              <label for="2">2 or more</label>
            </div>
          </div>
        </section>
  
        <section class="filters-page__languages">
          <p class="mb-xs">
            Languages
          </p>
          <div class="filters-page__languages-container">
            <div class="filters-page__checkbox">
              <input
                id="pt"
                v-model="languages"
                name="languages"
                type="checkbox"
                value="pt"
              >
              <label for="pt">Portuguese</label>
            </div>
            <div class="filters-page__checkbox my-xs">
              <input
                id="en"
                v-model="languages"
                name="languages"
                type="checkbox"
                value="en"
              >
              <label for="en">English</label>
            </div>
            <div class="filters-page__checkbox">
              <input
                id="es"
                v-model="languages"
                name="languages"
                type="checkbox"
                value="es"
              >
              <label for="es">Spanish</label>
            </div>
            <div class="filters-page__checkbox my-xs">
              <input
                id="de"
                v-model="languages"
                name="languages"
                type="checkbox"
                value="de"
              >
              <label for="de">German</label>
            </div>
            <div class="filters-page__checkbox">
              <input
                id="fr"
                v-model="languages"
                name="languages"
                type="checkbox"
                value="fr"
              >
              <label for="fr">French</label>
            </div>
            <div
              class="filters-page__checkbox my-xs"
              @click="clearOthersLanguages"
            >
              <input
                id="other"
                v-model="languages"
                name="languages"
                type="checkbox"
                value="other"
              >
              <label for="other">Other</label>
            </div>
            <div class="filters-page__checkbox my-xs">
              <div
                v-for="(item, index) in othersLanguages"
                :key="index"
                class="px-md"
              >
                <input
                  :id="item"
                  v-model="othersLanguages"
                  name="othersLanguages"
                  type="checkbox"
                  :value="item"
                >
                <label :for="item">{{ languageLabel(item) }}</label>
              </div>
            </div>

            <div
              v-if="isOtherLanguage"
              class="mt-md"
            >
              <p>Enter the desired language name</p>
              <search-filter
                v-model="searchValue"
                :error="hasErrors"
                :error-message="errorMessage"
                placeholder="Buscar idiomas"
                @search="searchLanguages"
              />

              <p
                v-if="noResults"
                class="filters-page__no-results mt-md pa-sm"
              >
                No results found
              </p>

              <div v-else>
                <div
                  v-for="(item, index) in searchedLanguages"
                  :key="index"
                  class="filters-page__languages-list mt-sm"
                >
                  <p
                    class="pa-sm"
                    @click="selectLanguage(item)"
                  >
                    {{ item.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <footer class="filters-page__buttons mt-xl">
          <button
            class="filters-page__clear-filters"
            type="button"
            @click="clearFilters"
          >
            <img
              alt="Delete icon"
              src="../assets/icons/delete.svg"
            >
            <p>Clear filters</p>
          </button>

          <main-button
            label="Filter"
            @click="confirmFilter"
          />
          <button
            class="filters-page__secondary-button"
            type="button"
            @click="$router.go(-1)"
          >
            Cancel
          </button>
        </footer>
      </div>
    </main>
  </div>
</template>

<script>
import SelectOptions from '../components/SelectOptions.vue'
import SearchFilter from '../components/SearchFilter.vue'
import MainButton from '../components/MainButton.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FilterPage',

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

  watch: {
    languages () {
      if(!this.isOtherLanguage) {
        this.othersLanguages = []
      }
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