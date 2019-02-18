**Getting started**
1) Install npm modules -> `npm i`;
2) Open your page in browser -> `npm start`.

## Describe
In file "index.js" you can find object SmallAngularJS realization and his methods:

* `Directive` - create new directive;
* `Compile` - check directives on DOM node and run them;
* `Bootstrap` - initialize work our peoject. It looking for `ng-app` tag and run app;

## Defolt Directives
* `ng-init`  -  initialize start params;
* `ng-show`  -  show information, it depends from condition;
* `ng-hide`  -  hide information, it depends from condition too;
* `ng-click` -  add event 'click' on node;
* `ng-model` -  get information from input and show it where assign `ng-bind`;
* `ng-bind`  -  bind parameters to a specific node;
* `ng-repeat` - goes over iterate object;

## Custom Directives
* `make-short`    -  make text short;
* `to-uppercase`  -  make text to uppercase;
* `random-color`  -  add random color to node (on load page);