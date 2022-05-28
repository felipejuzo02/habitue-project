<template>
  <div class="select-options">
    <div class="select-options__select-box">
      <div class="select-options__options-container">
        <div v-for="(item, index) in options" :key="index" class="select-options__option" @click="chooseOption(item)">
          <input type="radio" class="select-options__radio" :id="item.code" name="category">
          <label :for="item.code">{{ item.name }}</label>
          <img src="../assets/icons/check.svg" alt="Check icon">
        </div>
      </div>

      <div class="select-options__selected mb-xs" @click="clickSelect">{{ selectedOption }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },

    placeholder: {
      type: String,
      default: ''
    },

    error: {
      type: Boolean
    },

    errorMessage: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      selectedOption: this.placeholder
    }
  },

  methods: {
    clickSelect () {
      const optionsContainer = document.querySelector('.select-options__options-container')
      optionsContainer.classList.toggle('select-options__options-container--active')
    },

    chooseOption (item) {
      const optionsContainer = document.querySelector('.select-options__options-container')
      const { code, name } = item

      this.selectedOption = name
      optionsContainer.classList.remove('select-options__options-container--active')

      this.$emit('choose-option', code)
    }
  }
}
</script>

<style lang="scss">
.select-options {
  font-size: .875rem;
  text-align: start;
  color: $black;

  &__select-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    cursor: pointer;

    & label {
      cursor: pointer;
    }
  }

  &__options-container {
    background-color: white;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 8px;
    max-height: 0;
    opacity: 0;
    transition: all .4s;
    overflow: hidden;

    position: absolute;
    width: 100%;
    top: 45px;
    order: 1;

    &--active {
      max-height: 250px;
      opacity: 1;
      overflow-y: scroll;
    }

    &::-webkit-scrollbar {
      width: 8px;
      background: $grey2;
      border-radius: 0 8px 8px 0;

      &-thumb {
        background: $black;
        border-radius: 0 8px 8px 0;
      }
    }
  }

  &__option,
  &__selected {
    padding: 12px 24px;
    cursor: pointer;
  }

  &__option {
    display: flex;
    justify-content: space-between;

    & img {
      display: none;
    }

    &:hover {
      background-color: $grey2;

      & img {
        display: block;
      }
    }
  }
  
  &__selected {
    background: none;
    border-radius: 8px;
    border: 1px solid $grey2;
    position: relative;

    order: 0;

    &::after {
      content: '';
      background: url('../assets/icons/arrow-down.svg');
      background-size: contain;
      background-repeat: no-repeat;

      position: absolute;
      height: 100%;
      width: 18px;
      right: 10px;
      top: 40%;

      transition: all .4s;
    }
  }

  &__options-container--active + &__selected {
    background-color: $grey2;
    border-color: $grey1;

    &::after {
      transform: rotateX(180deg);
      top: -14px;
    }
  }

  &__radio {
    display: none;
  }
}
</style>