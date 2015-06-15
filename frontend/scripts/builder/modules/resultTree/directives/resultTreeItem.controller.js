'use strict';

/*ngInject*/
function ResultTreeItemController($scope, ResultTree) {
  $scope.isEditable = function() {
    return Boolean($scope.model.parameters);
  };

  $scope.editElem = function() {
    ResultTree.startEditElem($scope.model);
  };
}

module.exports = ResultTreeItemController;
