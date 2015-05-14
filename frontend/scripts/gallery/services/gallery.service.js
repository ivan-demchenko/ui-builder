'use strict';

/*ngInject*/
function Gallery($http) {

  this.fetch = function() {
    return $http.get('/api/session').then(function(resp) {
      return resp.data.data;
    });
  };

}

module.exports = Gallery;
