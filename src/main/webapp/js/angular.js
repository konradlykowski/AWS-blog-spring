var app = angular.module('iglaWPodrozy', ['ngAnimate', 'ngSanitize','ui.router', 'ui.bootstrap', 'ui.bootstrap.modal']);

app.controller('MainController', function($location, $scope) {
    var mainController = this;

});

app.controller('CarouselController', function ($scope) {
    $scope.myInterval = 4000;
    $scope.noWrapSlides = false;
    var slides = $scope.slides = [];
    images = [{path:'img/image1.JPG',desc:'marta w...'},{path:'img/image3.JPG',desc:'marta w...'},{path:'img/image4.JPG',desc:'marta w...'}]
    var len = images.length;
    for (var i = 0; i < len; i++) {
    slides.push({
          image: images[i].path,
          text: images[i].desc,
          id: i
        });
    }
});


app.controller('ModalInstanceCtrl', function($scope, $uibModalInstance, postId) {
  $scope.postId = postId;

  $scope.ok = function() {
    console.log(params)
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
});

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('');

       $stateProvider
       .state('main', {
        url: '',
            templateUrl: 'main.html',
            controller: 'MainController',
        onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        }]

       })
        .state('showPost', {
        url: '/posts/:postId',
           templateUrl: 'main.html',
           controller: 'MainController',
        onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
            $uibModal.open({
                  animation: true,
                  templateUrl: 'modal.html',
                  controller: 'ModalInstanceCtrl',
                  resolve: {
                    postId: function() {
                      return $stateParams.postId;
                    }
                  }
                }).result.catch(function(res) {
                      throw res;

                  });
        }]
        })
   })
