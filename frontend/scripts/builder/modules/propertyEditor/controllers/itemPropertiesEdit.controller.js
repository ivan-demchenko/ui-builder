'use strict';

var path = require('path');

/*@ngInject*/
function ItemPropertiesEditController($rootScope) {
  this.elem = null;

  this.close = function() {
    this.elem = null;
  }.bind(this);

  this.removeBehavior = function(element, behav) {
    var pos = element.behaviors.indexOf(behav);
    if (window.confirm('Are you sure')) {
      element.behaviors.splice(pos, 1);
    }
  };

  this.getParamTemplateUrl = function(param) {
    return path.resolve(__dirname, '..') + '/directives/parameters/' + param.type + '.html';
  };

  this.getBehaviorTemplateUrl = function(behav) {
    return path.resolve(__dirname, '..') + '/directives/behaviors/' + behav.optionsType + '.html';
  };

  $rootScope.$on('uib:elem:edit:begin', function(evt, elem) {
    this.elem = elem;
  }.bind(this));

  $rootScope.$on('uib:elem:remove', function() {
    this.elem = null;
  }.bind(this));
}

module.exports = ItemPropertiesEditController;
