(function() {
  const directives = {};

  const smallAngular = {
    directive(name, callback) {
      if (directives[name]) {
        return directives[name].push(callback);
      }

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

  smallAngular.directive('ng-click', function(el) {
    // eslint-disable-next-line no-console
    console.log('called directive ng-click on element', el);
  });

  smallAngular.directive('ng-show', function(el) {
    // eslint-disable-next-line no-console
    console.log('called directive ng-show on element', el);
  });

  smallAngular.directive('ng-model', function(el) {
    // eslint-disable-next-line no-console
    console.log('called directive ng-model on element', el);
  });

  smallAngular.directive('ng-init', function(el) {
    // eslint-disable-next-line no-console
    console.log('called directive ng-init on element', el);
  });

  smallAngular.directive('ng-app', function(el) {
    // eslint-disable-next-line no-console
    console.log('called directive ng-app on element', el);
  });

  smallAngular.directive('ng-bind', function(el) {
    // eslint-disable-next-line no-console
    console.log('called directive ng-bind on element', el);
  });

  smallAngular.bootstrap();

  window.smallAngular = smallAngular;
}());