<template>
  <div
    class="app-checkbox"
  >
    <input
      :id="content.value"
      v-model="model"
      name="languages"
      type="checkbox"
      :value="content.value"
    >
    <label :for="content.value">{{ content.label }}</label>
  </div>
</template>

<script>
export default {
  name: 'AppCheckbox',

  props: {
    modelValue: {
      type: Array,
      default: () => ([])
    },

    content: {
      type: Object,
      default: () => ({})
    }
  },

  emits: ['update:modelValue'],

  computed: {
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

<style lang="scss" scoped>
.app-checkbox {
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
</style>