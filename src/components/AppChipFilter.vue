<template>
  <div class="chip pa-sm">
    <p class="chip__label px-lg">
      {{ label }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'AppChipFilter',

  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.chip {
  background-color: $grey2;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  &__label {
    color: $grey3;
    font-size: .875rem;
  }
}
</style>