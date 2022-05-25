<template>
  <div class="search-filter">
    <input class="search-filter__filter" v-bind="$attrs" type="text" v-model="value">
    <button class="search-filter__button" @click="$emit('click', value)"><img src="../assets/icons/search.svg" alt="Icone de pesquisa"></button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  }
}
</script>r

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
  }

  &__button {
    background-color: $primary;
    border: none;
    color: $black;
    padding: .875rem;
    cursor: pointer;
  }
}
</style>