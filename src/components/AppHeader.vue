<template>
  <header class="app-header container pa-lg">
    <button
      class="app-header__back-button"
      type="button"
      @click="$router.go(-1)"
    >
      <img
        alt="Back page icon"
        src="../assets/icons/arrow-left.svg"
      >
    </button>
    <h3>{{ title }}</h3>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',

  props: {
    title: {
      type: String,
      default: 'Pagina sem título'
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  text-align: center;
  position: relative;

  & > h3 {
    font-size: 1.375rem;
    color: $primary;
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
}

@include desktop-only {
  .app-header {
    padding: 32px 0 !important;

    &__back-button {
      left: 0;
    }
  }
}
</style>