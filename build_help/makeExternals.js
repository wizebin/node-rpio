const package = require('../package.json');

module.exports = {
  makeExternals: () => {
    const keys = Object.keys(package.dependencies);
    const result = {};

    for (let key of keys) {
      result[key] = {
        root: key,
        commonjs2: key,
        commonjs: key.replace(/\@\w+\//, ''),
        amd: key.replace(/\@\w+\//, ''),
      };
    }

    return result;
  },
};
