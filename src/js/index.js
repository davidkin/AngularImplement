(function() {
  const directives = {};

  const smallAngular = {
    directive(name, callback) {
      directives[name] = [callback];
    },

    compile(node) {
      const attrArray = node.getAttributeNames();

      attrArray.forEach(attrs => {
        if (directives[attrs]) {
          directives[attrs].forEach(callback => callback(node));
        }
      });
    },

    bootstrap(node) {
      const appBlock = node || document.querySelector('*[ng-app]');
      const nodeElements = appBlock.querySelectorAll('*');

      nodeElements.forEach(element => this.compile(element));
    }
  };

  smallAngular.directive('ng-click', function(el) {});
  smallAngular.directive('ng-show', function(el) {});

  window.smallAngular = smallAngular;
}());