module.exports = function (config) {
  config.set({
    browsers: [ "PhantomJS" ],
    singleRun: true, //just run once by default
    frameworks: [ "mocha", "browserify" ], //use the mocha test framework
    files: [
      "test/util/shim.js",
      "test/**" //just load this file
    ],
    preprocessors: {
      "test/**": [ "browserify" ] //preprocess with webpack and our sourcemap loader
    },
    browserify: {
      debug: true,
      transform: [ "babelify" ],
      extensions: [".js", ".jsx", ".es6"]
    },
    reporters: [ "mocha" ]//report results in this format
  });
};
