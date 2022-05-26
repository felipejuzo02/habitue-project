<template>
  <section class="filters-page">
    <header class="filters-page__header pa-lg">
      <button class="filters-page__back-button" @click="goToBackPage">X</button>
      <h3>Filtrar</h3>
    </header>
    <main class="filters-page__choose-filters px-lg">
      <h2 class="section-title pt-md">Escolher filtros</h2>

      <section class="my-lg">
        <p>Continente</p>
        <select-options :placeholder="defaultPlaceholder" :options="continents" @choose-option="setSelectedContinent" />
      </section>

      <section class="my-lg">
        <p>Quantidade de idiomas no pais</p>
        <div class="mt-xs">
          <div class="filters-page__radio">
            <input type="radio" id="0" value="0" name="moreLanguages">
            <label for="0">Exibir todos</label>
          </div>
          <div class="filters-page__radio my-xs">
            <input type="radio" id="1" value="1" name="moreLanguages">
            <label for="1">1 apenas</label>
          </div>
          <div class="filters-page__radio">
            <input type="radio" id="2" value="2" name="moreLanguages">
            <label for="2">2 ou +</label>
          </div>
        </div>
      </section>

      <section class="filters-page__languages">
        <p>Idiomas</p>
        <div class="filters-page__languages-container">
          <button class="filters-page__languages-button py-md my-sm">Languages</button>
          <button class="filters-page__languages-button py-md my-sm">Languages</button>
          <button class="filters-page__languages-button py-md my-sm">Languages</button>
          <button class="filters-page__languages-button py-md my-sm">Languages</button>
          <button class="filters-page__languages-button py-md my-sm">Languages</button>
          <button class="filters-page__languages-button py-md my-sm">Languages</button>
          <button class="filters-page__languages-button py-md my-sm">Languages</button>
          <button class="filters-page__languages-button py-md my-sm">Languages</button>
        </div>
      </section>

      <div class="filters-page__buttons mt-xl">
        <main-button label="Filtrar" @click="confirmFilter" />
        <button class="filters-page__secondary-button">Cancelar</button>
      </div>
    </main>
  </section>
</template>

<script>
import SelectOptions from '../components/SelectOptions.vue'
import MainButton from '../components/MainButton.vue'
import { mapGetters, mapActions } from 'vuex'
import MainButton1 from '../components/MainButton.vue'

export default {
  components: {
    SelectOptions,
    MainButton,
    MainButton1
  },

  data () {
    return {
      selectedContinent: ''
    }
  },

  computed: {
    ...mapGetters({
      continents: 'continents/continents',
      continent: 'continents/continent',
      customQuery: 'continents/customQuery'
    }),

    defaultPlaceholder () {
      return this.continent?.name || 'Selecione um continente'
    }
  },

  async created () {
    this.continent && await this.fetchContinents()
    this.setDefaultRadio()
  },

  methods: {
    ...mapActions({
      fetchContinents: 'continents/fetchContinents',
      setCustomQuery: 'continents/setCustomQuery'
    }),

    confirmFilter () {
      const languageQuantity = parseInt(document.querySelector('input[name="moreLanguages"]:checked')?.value)

      this.setCustomQuery({
        continent: this.selectedContinent || this.continent?.code,
        languageQuantity
      })

      this.goToBackPage()
    },

    setSelectedContinent (value) {
      this.selectedContinent = value
    },

    goToBackPage () {
      this.$router.go(-1)
    },

    setDefaultRadio () {
      const { languageQuantity } = this.customQuery

      document.querySelector(`input[id="${languageQuantity || 0}"]`).checked = true
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
  }

  &__back-button {
    position: absolute;
    left: 1.875rem;
  }

   &__choose-filters {
    border-radius: 36px 36px 0 0;
    background: #fff;
    color: $black;
  }

  &__languages-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2%;
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

  &__languages-button {
    border: none;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    color: $black;
    cursor: pointer;
    width: 32%;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: $grey2;
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
</style>