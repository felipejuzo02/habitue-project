<template>
  <div class="search-filter">
    <input
      v-bind="$attrs"
      v-model="model"
      class="search-filter__filter"
      :class="inputClasses"
      type="text"
    >
    <button
      class="search-filter__button"
      type="button"
      @click="$emit('search')"
    >
      <img
        alt="Search icon"
        src="../assets/icons/search.svg"
      >
    </button>
  </div>

  <p
    v-if="errorMessage"
    class="px-sm search-filter__error-message"
  >
    {{ errorMessage }}
  </p>
</template>

<script>
export default {
  name: 'SearchFilter',

  props: {
    error: {
      type: Boolean
    },

    errorMessage: {
      type: String,
      default: ''
    },

    modelValue: {
      type: [String, Number],
      default: ''
    }
  },

  emits: ['search', 'update:modelValue'],

  computed: {
    inputClasses () {
      return this.error && 'search-filter__filter--error'
    },

    model: {
      get () {
        return this.modelValue
      },

      set (value) {
        return this.$emit('update:modelValue', value)
      }
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