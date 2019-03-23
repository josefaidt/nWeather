module.exports = {
  extends: '@josefaidt/eslint-config',
  plugins: ['graphql'],
  rules: {
    'graphql/template-strings': ['error', {
      env: 'literal',
      schemaJson: require('./src/schema.json'),
    }]
  },
}