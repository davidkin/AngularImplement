(function() {
  const directives = {};

  const smallAngular = {
    directive(name, callback) {
      directives[name] = [callback];
    },

    compile(node) {
      return null;
    },

    bootstrap(node) {
      return null;
    }
  };

  smallAngular.directive('ng-click', function(el) {});
  smallAngular.directive('ng-show', function(el) {});

  window.smallAngular = smallAngular;
}());