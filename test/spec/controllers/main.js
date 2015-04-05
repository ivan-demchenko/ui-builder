'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('uiBuilderApp'));

  var MainCtrl,
    $httpBackend,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should have an empty array for components', function () {
    expect(MainCtrl.repoItems).toBe(null);
  });
});
