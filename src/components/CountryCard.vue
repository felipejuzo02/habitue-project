<template>
  <div class="country-card" @click="goToCountryDetails">
    <div class="country-card__initials">
      <p>{{ getInitials(country.name) }}</p>
    </div>
    <div class="country-card__informations ml-md">
      <p class="country-card__tag">{{ continent }}</p>
      <div>
        <p class="country-card__name">{{ truncateText(country.name, 25) }}</p>
        <p class="country-card__languages">{{ truncateText(languages, 40) }}</p>
      </div>

      <button class="country-card__arrow">
        <img src="../assets/icons/arrow-right.svg" alt="Icone de seta para direita">
      </button>
    </div>
  </div>
</template>

<script>
import { getInitials, truncateText } from '../helpers'

export default {
  props: {
    country: {
      type: Object,
      required: true
    },

    continent: {
      type: String,
      required: true
    }
  },

  computed: {
    languages () {
      return this.country?.languages?.map(language => language?.name).join(' - ')
    }
  },

  methods: {
    getInitials,

    truncateText,

    goToCountryDetails () {
      console.log('go to country details', this.country.name)
    }
  }
}
</script>

<style lang="scss">
.country-card {
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  transition: transform .2s ease-in-out;

  &:hover {
    transform: scale(1.0080);
  }

  &__initials {
    color: $primary;
    font-size: 1.75rem;
    font-weight: 500;
    background: #FBFBFB;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    width: 140px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__informations {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__tag {
    background-color: $primary;
    border-radius: 4px;
    color: $white;
    font-size: .875rem;
    padding: 1px 32px;
    position: absolute;
    top: 2px;
  }

  &__name {
    color: $black;
    font-size: 1.375rem;
    font-weight: 500;
  }

  &__languages {
    color: $grey3;
    font-size: .875rem;
  }

  &__arrow {
    background: none;
    border: none;
  }
}
</style>