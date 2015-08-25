'use strict';

function WorkbenchSrvs() {
  this.presets = [
    { width: null, height: null, name: 'None' },
    { width: '768px', height: '1024px', name: 'iPad' },
    { width: '320px', height: '480px', name: 'iPhone 4' },
    { width: '320px', height: '568px', name: 'iPhone 5' },
    { width: '375px', height: '667px', name: 'iPhone 6' },
    { width: '360px', height: '640px', name: 'Nexus 5' }
  ];
  this.isRotated = false;
  this.selectedSize = this.presets[0];
}

module.exports = WorkbenchSrvs;
