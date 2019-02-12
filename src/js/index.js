class SmallAngular {
  constructor() {
    this.directives = {};
  }

  directive(name, callback) {
    this.directives[name] = [callback];
  }

  compile(node) {
    const attrArray = node.getAttributeNames();

    attrArray.forEach(attrs => {
      if (this.directives[attrs]) {
        this.directives[attrs].forEach(callback => callback(node));
      }
    });
  }

  bootstrap(node) {
    const appBlock = node || document.querySelector('*[ng-app]');
    const nodeElements = appBlock.querySelectorAll('*');

    nodeElements.forEach(element => this.compile(element));
  }
}

const sa = new SmallAngular();

sa.directive('ng-click', function(el) {
  console.log('called directive ng-click on element', el);
});

sa.directive('ng-show', function(el) {
  console.log('called directive ng-show on element', el);
});