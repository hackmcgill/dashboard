const {
    override,
    addBabelPlugin
} = require('customize-cra')

module.exports = override(
    addBabelPlugin('styled-jsx/babel')
);
