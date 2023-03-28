module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/vue3-recommended'
    // 'plugin:vue/vue3-essential', // This option doesn't impose formatting rules
    // 'plugin:vue/vue3-strongly-recommended', // This option imposes formatting rules on your code to improve readability 
  ],
  rules: {
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }
    ],
    'arrow-parens': ['error', 'as-needed'],
    'one-var': ['error', 'never'],
    'multiline-ternary': 'off',
    'no-void': 'off',
    'quotes': ['error', 'single'],
    'comma-dangle': ['error', 'never'],

    // Promise
    'prefer-promise-reject-errors': 'off',

    // vue extra rules
    'vue/multiline-html-element-content-newline': [
      'error',
      {
        ignoreWhenEmpty: true,
        allowEmptyLines: false,
        ignores: []
      }
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: false,
        ignores: []
      }
    ],
    'vue/attributes-order': ['error', { alphabetical: true }],
    'vue/block-spacing': ['error', 'always'],
    'vue/no-reserved-component-names': ['error'],
    'vue/static-class-names-order': ['error'],
    'vue/v-slot-style': ['error', 'shorthand'],
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/key-spacing': ['error', { beforeColon: false }],
    'vue/prefer-template': ['error'],
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style']
      }
    ],
    'vue/block-tag-newline': ['error'],
    'vue/html-button-has-type': [
      'error',
      {
        button: true,
        submit: true,
        reset: true
      }
    ],
    'vue/no-empty-component-block': ['error'],
    'vue/no-multiple-objects-in-class': ['error'],
    'vue/no-potential-component-option-typo': [
      'error',
      {
        presets: ['all']
      }
    ],
    'vue/no-static-inline-styles': ['error'],
    'vue/no-this-in-before-route-enter': ['error'],
    'vue/no-useless-mustaches': [
      'error',
      {
        ignoreIncludesComment: false,
        ignoreStringEscape: false
      }
    ],
    'vue/no-useless-v-bind': [
      'error',
      {
        ignoreIncludesComment: false,
        ignoreStringEscape: false
      }
    ],
    'vue/prefer-separate-static-class': ['error'],
    'vue/prefer-true-attribute-shorthand': ['error'],
    'vue/require-direct-export': [
      'error',
      {
        disallowFunctionalComponentFunction: false
      }
    ],
    'vue/require-name-property': ['error'],
    'vue/v-for-delimiter-style': ['error', 'in'],
    'vue/v-on-function-call': [
      'error',
      'never',
      {
        ignoreIncludesComment: false
      }
    ],
    'vue/no-extra-parens': ['error'],
    'vue/func-call-spacing': ['error', 'never'],

    // Vue disabled rules
    'vue/valid-next-tick': 'off',
    'vue/no-v-html': 'off',
    'vue/new-line-between-multi-line-property': 'off',

    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}