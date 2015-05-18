'use strict';

/*@ngInject*/
function BuilderService($http) {
  this.fetchInitialCode = function(id) {
    return $http.get('/api/session/' + id + '/initial/').then(function(resp) {
      return resp.data.data;
    });
  };
}

module.exports = BuilderService;
