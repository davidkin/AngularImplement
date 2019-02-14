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
          directives[attrs].forEach(callback => callback(rootScope, node, node.getAttribute(attrs)));
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

  smallAngular.directive('ng-init', function(scope, el, data) {
    eval(data);
  });

  smallAngular.directive('ng-show', function(scope, el, data) {
    el.style.display = eval(data) ? 'block' : 'none';

    scope.$watch(data, () => {
      el.style.display = eval(data) ? 'block' : 'none';
    });

    scope.$apply();
  });

  smallAngular.directive('ng-click', function(scope, el, data) {
    el.addEventListener('click', e => {
      eval(data);
      scope.$apply();
    });
  });

  smallAngular.directive('ng-hide', function(scope, el, data) {
    el.style.display = eval(data) ? 'none' : 'block';

    scope.$watch(data, () => {
      el.style.display = eval(data) ? 'none' : 'block';
    });
  });

  smallAngular.directive('ng-model', function(scope, el, data) {
    el.addEventListener('input', e => {
      eval(`${data} = el.value`); // scope[data] = el.value;
      scope.$apply();
    });
  });

  smallAngular.directive('ng-bind', function(scope, el, data) {
    scope.$watch(data, () => {
      el.innerHTML = eval(data);
    });
    scope.$apply();
  });


  smallAngular.directive('ng-repeat', function(scope, el, data) {
    // console.log('called directive ng-repeat on element', el);
  });

  smallAngular.directive('make-short', function(scope, el, attrs) {
    const { lngth: { value: lengthValue } } = attrs;
    el.innerHTML = `${el.innerHTML.slice(0, lengthValue || 5)} ...`;
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

    el.style.backgroundColor = color;
  });

  smallAngular.bootstrap();

  window.smallAngular = smallAngular;
}());


// ng-repeat - повторяет тот блок на котором висит
// <li ng-repeat="letter in name"></li>

// name  - берем в скоупе и побуквенно печатаем - тоесть результат если имя Вася будет -

// <li >В</li>
// <li >А</li>
// <li >С</li>
// <li >Я</li>

// random-color - закрашивает себя при клике в произвольный цвет
