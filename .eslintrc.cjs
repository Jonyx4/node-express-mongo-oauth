module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ['airbnb-base', 'plugin:jest/recommended', 'prettier'],
  plugins: ['prettier', 'jest'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error',
    'no-use-before-define': ['error', 'nofunc'],
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'import/extensions': ['error', 'ignorePackages'],
    'no-underscore-dangle': ['error', { allow: ['_id', '__v', '_update'] }]
  }
};
