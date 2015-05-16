'use strict';

/*ngInject*/
function fetchGalleryItems(Gallery) {
  return Gallery.fetch();
}

/*@ngInject*/
function config($routeProvider) {
  $routeProvider
    .when('/gallery', {
      controller: 'GalleryCtrl as gallery',
      templateUrl: __dirname + '/views/index.html',
      access: { requiredAuthentication: true },
      resolve: {
        galleryItems: fetchGalleryItems
      }
    });
}

module.exports = config;
