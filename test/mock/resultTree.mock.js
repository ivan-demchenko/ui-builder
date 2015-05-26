(function(window) {
  'use strict';
  window.mock = window.mock || {};
  window.mock.resultTree = [
    {
      name: 'A',
      children: [
        {
          name: 'AA',
          children: []
        }, {
          name: 'AB',
          children: []
        }
      ]
    }, {
      name: 'B',
      children: []
    }
  ];
})(window);
