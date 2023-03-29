<template>
  <button
    class="main-button"
    :class="mainButtonClasses"
    :disabled="disabled"
    type="button"
    v-bind="$attrs"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'MainButton',

  props: {
    label: {
      type: String,
      default: ''
    },

    disabled: {
      type: Boolean
    }
  },

  computed: {
    mainButtonClasses () {
      return this.disabled && 'main-button--disabled'
    }
  }
}
</script>

<style lang="scss">
  .main-button {
    background-color: $primary;
    border: none;
    border-radius: 16px;
    color: $white;
    cursor: pointer;
    font-size: .875rem;
    padding: .875rem 0;
    max-width: 420px;
    width: 100%;
    transition: all .2s ease-in-out;

    &--disabled {
      opacity: .5;
      cursor: not-allowed;
    }

    &:hover {
      background-color: $primary-dark;
    }
  }
</style>