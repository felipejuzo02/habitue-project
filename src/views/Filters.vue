<template>
  <section class="filters-page">
    <header class="filters-page__header pa-lg container">
      <button class="filters-page__back-button" @click="$router.go(-1)">
        <img src="../assets/icons/arrow-left.svg" alt="Icone voltar de pagina">
      </button>
      <h3>Filtrar</h3>
    </header>
    <main class="filters-page__choose-filters px-lg">
      <div class="container">
        <h2 class="section-title pt-md">Escolher filtros</h2>
  
        <section class="my-lg">
          <p>Continente</p>
          <select-options :placeholder="defaultPlaceholder" :options="continents" @choose-option="setSelectedContinent" />
        </section>
  
        <section class="my-lg">
          <p>Quantidade de idiomas no pais</p>
          <div class="mt-xs">
            <div class="filters-page__radio">
              <input type="radio" id="0" value="0" name="moreLanguages" v-model="languageQuantity">
              <label for="0">Exibir todos</label>
            </div>
            <div class="filters-page__radio my-xs">
              <input type="radio" id="1" value="1" name="moreLanguages" v-model="languageQuantity">
              <label for="1">1 apenas</label>
            </div>
            <div class="filters-page__radio">
              <input type="radio" id="2" value="2" name="moreLanguages" v-model="languageQuantity">
              <label for="2">2 ou +</label>
            </div>
          </div>
        </section>
  
        <section class="filters-page__languages">
          <p>Idiomas</p>
          <pre>{{ languages }}</pre>
          <div class="filters-page__languages-container">
            <div class="filters-page__checkbox">
              <input type="checkbox" id="pt" value="pt" name="languages" v-model="languages">
              <label for="pt">Português</label>
            </div>
            <div class="filters-page__checkbox my-xs">
              <input type="checkbox" id="en" value="en" name="languages" v-model="languages">
              <label for="en">Inglês</label>
            </div>
            <div class="filters-page__checkbox">
              <input type="checkbox" id="es" value="es" name="languages" v-model="languages">
              <label for="es">Espanhol</label>
            </div>
            <div class="filters-page__checkbox my-xs">
              <input type="checkbox" id="de" value="de" name="languages" v-model="languages">
              <label for="de">Alemão</label>
            </div>
            <div class="filters-page__checkbox">
              <input type="checkbox" id="fr" value="fr" name="languages" v-model="languages">
              <label for="fr">Francês</label>
            </div>
            <div class="filters-page__checkbox my-xs">
              <input type="checkbox" id="other" value="other" name="languages" v-model="languages">
              <label for="other">Outro</label>
            </div>
            <div>
              teste
            </div>

            <div v-if="isOtherLanguage" class="mt-md">
              <p>Digite o nome do idioma desejado</p>
              <search-filter placeholder="Buscar idiomas" v-model="searchValue" @search="searchLanguages" />
              <div v-for="(item, index) in teste" :key="index" class="mt-sm filters-page__languages-list">
                <p class="pa-sm" @click="selectLanguage(item)">{{ item.name }}</p>
              </div>
            </div>
          </div>
        </section>
  
        <div class="filters-page__buttons mt-xl">
          <main-button label="Filtrar" @click="confirmFilter" />
          <button class="filters-page__secondary-button" @click="$router.go(-1)">Cancelar</button>
        </div>
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
      teste: [],
      searchValue: '',
      othersLanguages: []
    }
  },

  computed: {
    ...mapGetters({
      continents: 'continents/continents',
      continent: 'continents/continent',
      customQuery: 'continents/customQuery',
      languagesList: 'continents/languages'
    }),

    defaultPlaceholder () {
      return this.continent?.name || 'Selecione um continente'
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

    selectLanguage (language) {
      this.othersLanguages.push(language.code)
    },

    searchLanguages () {
      const searchedLanguages = this.languagesList.filter(language => {
        const regex = new RegExp(this.searchValue, 'i')

        return regex.test(language?.name)
      })

      this.teste = searchedLanguages
    },

    confirmFilter () {
      this.setCustomQuery({
        continent: this.selectedContinent || this.continent?.code,
        languageQuantity: parseInt(this.languageQuantity),
        languages: [...this.languages, ...this.othersLanguages]
      })

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

      this.languages = languages || []
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