var app = angular.module('iglaWPodrozy', ['ngAnimate', 'ngSanitize','ui.router', 'ui.bootstrap', 'ui.bootstrap.modal'])
.run(function($rootScope, $uibModalStack) {

$rootScope.$on('$locationChangeStart', function (newVal, oldVal) {


  });

});

app.controller('MainController', function($location, $scope, $stateParams) {
    var mainController = this;
    console.log($stateParams)
    var j=Math.random()* 20;
    $scope.posts=[]
    for(i=0;i<3;i++) {
        $scope.posts.push({id:'marta-w-porto.html', title:'Marta w Porto',category:'podroze',date:Math.random()+'th May 2017', description:'Marta przyjechala do Porto zobaczyc co slychac', content:'CONTENT', commentsCount:'12', tags: 'kokos;kokos2', image:'img/image1.JPG', location: 'Zurich'})
    }
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
  $scope.postId = postId+'zecsc';

  $scope.ok = function() {

  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
});

app.config(['$locationProvider','$qProvider', function($locationProvider,$qProvider) {
  $locationProvider.hashPrefix('');
  $qProvider.errorOnUnhandledRejections(false);
}]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/posts');

       $stateProvider
       .state('posts', {
        url: '/posts',
            templateUrl: 'main.html',
            controller: 'MainController',
        onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
            posts = [{path:'img/image1.JPG',desc:'marta w...'},{path:'img/image3.JPG',desc:'marta w...'},{path:'img/image4.JPG',desc:'marta w...'}]
            console.log("5")
        }]
       })
       .state('posts.filter', {
          url: '^/posts/filter/:filter',
              templateUrl: 'main.html',
              controller: 'MainController',
          onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {

console.log("3")
          }]
         })
        .state('posts.show', {
        url: '^/posts/:postId',
           templateUrl: 'main.html',
           controller: 'MainController',
        onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
            var modal = $uibModal.open({
                  animation: true,
                  templateUrl: 'modal.html',
                  controller: 'ModalInstanceCtrl',
                  resolve: {
                    postId: function() {
                      return $stateParams.postId;
                    }
                  }
                });
                modal.result.finally(function() {
                         $state.go('^');
                         console.log("2")
                       });
        }],
            onExit: function($uibModalStack){
            console.log("1")
                $uibModalStack.dismissAll();
            }
        })
   })
