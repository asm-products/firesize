// preprocessor.js
var ReactTools = require('react-tools');
module.exports = {
  process: function(src) {
    console.error('-------------------------------------')
    console.error('SRC:', src)
    var transformed = ReactTools.transform(src);
    console.error(transformed)
    console.error('=====================================')
    return transformed
  }
};
