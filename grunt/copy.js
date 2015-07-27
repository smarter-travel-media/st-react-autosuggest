/**
 * Task to copy files around in prep for deploy to npm
 * Usage: grunt copy:npm
 */
module.exports = function(grunt, configs) {
  return {
    npm: {
      files: [{
        expand: true,
        cwd: "<%= dirs.src %>",
        src: "**/*.js",
        dest: "<%= dirs.npm %>"
      }]
    }
  };
};
