describe('ResultTree service', function() {
  'use strict';

  var ResultTree,
      angular = window.angular,
      resultTreeMock;

  beforeEach(module('uiBuilderApp'));

  beforeEach(inject(function(_ResultTree_) {
    ResultTree = _ResultTree_;
    resultTreeMock = angular.copy(window.mock.resultTree);
  }));

  afterEach(function() {
    resultTreeMock = null;
  });

  it('should be available', function() {
    expect(ResultTree).toBeDefined();
  });

  it('should be able to move item up in the tree', function() {
    var modifiedTree = ResultTree.moveElementUp(resultTreeMock[1], resultTreeMock);
    expect(modifiedTree[0].name).toEqual('B');
  });

  it('should be able to move item up in the tree', function() {
    var modifiedTree = ResultTree.moveElementDown(resultTreeMock[1], resultTreeMock);
    expect(modifiedTree[0].name).toEqual('A');
  });

  it('should be able to remove item from tree', function() {
    ResultTree.removeElem(resultTreeMock, resultTreeMock[1]);
    expect(resultTreeMock.length).toEqual(1);
  });

});
