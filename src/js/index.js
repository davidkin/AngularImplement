// eslint-disable-next-line no-eval
/* eslint no-eval: "true" */

(function() {
  const directives = {};
  const watchers = [];
  const rootScope = window;

  rootScope.$watch = (name, watcher) => {
    watchers.push({ name, watcher });
  };

  rootScope.$apply = () => {
    watchers.forEach(({ watcher }) => watcher());
  };

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
        if (directives[attrs] && attrs.startsWith('ng-')) {
          directives[attrs].forEach(callback => callback(rootScope, node));
        } else if (directives[attrs] && !attrs.startsWith('ng-')) {
          directives[attrs].forEach(callback => callback(rootScope, node, node.attributes));
        }
      });
    },

    bootstrap(node) {
      const appBlock = node || document.querySelector('*[ng-app]');
      const nodeElements = appBlock.querySelectorAll('*');

      this.compile(appBlock);
      nodeElements.forEach(element => this.compile(element));
    }
  };

  smallAngular.directive('ng-init', function(scope, el) {
    const data = el.getAttribute('ng-init');
    eval(data);
  });

  smallAngular.directive('ng-show', function(scope, el) {
    const data = el.getAttribute('ng-show');

    el.style.display = eval(data) ? 'block' : 'none';

    scope.$watch(data, () => {
      el.style.display = eval(data) ? 'block' : 'none';
    });

    scope.$apply();
  });

  smallAngular.directive('ng-click', function(scope, el) {
    const data = el.getAttribute('ng-click');

    el.addEventListener('click', e => {
      eval(data);
      scope.$apply();
    });
  });

  smallAngular.directive('ng-hide', function(scope, el) {
    const data = el.getAttribute('ng-hide');
    el.style.display = eval(data) ? 'none' : 'block';

    scope.$watch(data, () => {
      el.style.display = eval(data) ? 'none' : 'block';
    });
  });

  smallAngular.directive('ng-model', function(scope, el) {
    const data = el.getAttribute('ng-model');

    el.addEventListener('input', e => {
      eval(`${data} = el.value`);
      scope.$apply();
    });
  });

  smallAngular.directive('ng-bind', function(scope, el) {
    const data = el.getAttribute('ng-bind');

    scope.$watch(data, () => {
      el.innerHTML = eval(data);
    });
    scope.$apply();
  });


  smallAngular.directive('ng-repeat', function(scope, el) {
    const data = el.getAttribute('ng-repeat');
    const collectionName = data.split(' ')[2];
    const parentEl = el.parentNode;

    scope.$watch(collectionName, () => {
      const collection = scope[collectionName];
      const similarEls = Array.from(document.querySelectorAll(`[ng-repeat="${data}"]`));

      for (const item of collection) {
        const clonedEl = el.cloneNode(false);

        clonedEl.innerText = item;
        parentEl.appendChild(clonedEl);
      }

      for (const el of similarEls) {
        el.remove();
      }
    });

    scope.$apply();
  });

  smallAngular.directive('make-short', function(scope, el, attrs) {
    const { lngth: { value: lengthValue } } = attrs;

    scope.$watch(() => lengthValue, () => {
      el.innerHTML = `${el.innerHTML.slice(0, lengthValue || 5)} ...`;
    });

    scope.$apply();
  });

  smallAngular.directive('to-uppercase', function(scope, el, attrs) {
    el.innerHTML = el.innerHTML.toUpperCase();
  });

  smallAngular.directive('random-color', function(scope, el, attrs) {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    el.style.color = color;
  });

  smallAngular.bootstrap();

  window.smallAngular = smallAngular;
}());