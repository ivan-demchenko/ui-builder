'use strict';

module.exports = function Elem(template, scopeDef, linkFn, ctrl, compileFn) {
  this.restrict = 'E';
  this.transclude = true;
  this.replace = true;
  if (Array.isArray(template)) {
    this.template = template.join('');
  } else {
    this.templateUrl = template;
  }
  if (scopeDef) {
    this.scope = scopeDef;
  }
  if (linkFn) {
    this.link = linkFn;
  }
  if (ctrl) {
    this.controller = ctrl;
  }
  if (compileFn) {
    this.compileFn = compileFn;
  }
};
