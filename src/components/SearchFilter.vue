<template>
  <div class="search-filter">
    <input class="search-filter__filter" :class="inputClasses" v-bind="$attrs" type="text" v-model="value">
    <button class="search-filter__button" @click="$emit('search')"><img src="../assets/icons/search.svg" alt="Icone de pesquisa"></button>
  </div>
  <p v-if="errorMessage" class="search-filter__error-message px-sm">{{ errorMessage }}</p>
</template>

<script>
export default {
  props: {
    error: {
      type: Boolean
    },

    errorMessage: {
      type: String,
      default: ''
    },
  },

  data () {
    return {
      value: ''
    }
  },

  computed: {
    inputClasses () {
      return this.error && 'search-filter__filter--error'
    }
  }
}
</script>

<style lang="scss">
.search-filter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; 

  &__filter,
  &__button {
    font-size: .875rem;
    padding: .875rem;
  }

  &__filter {
    color: $black;
    border: 1px solid $grey1;
    background-color: $grey2;
    width: 100%;
    transition: all 0.4s ease-in-out;;

    &::placeholder {
      color: $grey3;
    }

    &[type=text]:focus {
      border: 1px solid $primary;
      outline: none;
    }

    &--error {
      border: 1px solid $negative;
    }
  }

  &__button {
    background-color: $primary;
    border: none;
    color: $black;
    padding: .875rem;
    cursor: pointer;
  }

  &__error-message {
    color: $negative;
    font-size: .875rem;
    margin-top: .25rem;
  }
}
</style>