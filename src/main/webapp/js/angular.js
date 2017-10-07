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
  $scope.content = "Japonia to niezwykły kraj z bogatym dobytkiem kulturowym. Wszystko tam było dla mnie niezwykle: ludzie, obyczaje, stroje, język oraz jedzenie. Pomimo względnego tłoku na dworcach, stacjach i ulicach, ludzie są “dziwnie” spokojni. Nigdy dotychczas się z czymś takim nie spotkałam."+
                  "“Spokój” także panował w strojach japończyków.<p/><br/> "+
                  "Dzieci już od najmłodszych lat przyzwyczajane są do ubioru zgodnego z ogólnie przyjętymi zasadami. W szkołach podstawowych zazwyczaj mundurki nie są obowiązkowe, natomiast w szkołach średnich już tak. Tradycyjny japoński mundurek szkolny dla dziewcząt ma krój stroju marynarskiego i składa się z białej bluzki i plisowanej spódniczki do kolan, trampek i kolanówek. Chłopięce mundurki są szyte w stylu wojskowym; składają się z białej koszuli z usztywnianym kołnierzykiem i ciemnych spodni. W Japonii dodatkowo obowiązują mundurki przeznaczone do noszenia na zajęcia wychowania fizycznego. Wszystko to wygląda bardzo estetycznie, nikt się nie wyróżnia i nie rzuca się w oczy. Dziewczynki wyglądały niesamowicie  w swoich kolanówkach, plisowanych spódniczkach do kolan i koszulach, aż sama zatęskniłam za czasami szkolnymi i żałowałam, że nie miałam okazji nosić takiego prawdziwego mundurka. Szkoda, że w naszym kraju nie udało się skutecznie wprowadzić takich estetycznych mundurków szkolnych jak były kiedyś oraz jakie istnieją w innych krajach. Japoński strój do pracy jest bardzo podobny do owych mundurków szkolnych, zawsze stonowany i elegancki. Kobiety noszą białe koszule, pastelowe bluzki, spódnice do kolan lub spodnie oraz czułenka na obcasie. Mają piękne lśniące włosy i minimalny make up. Wszystko to tworzy bardzo przyjemny dla oka widok. Swoją drogą Japonk################i są bardzo dbają o swój wygląd, widać to już po ilości drogerii i kosmetyków w nich dostępnych. Raj!!!"+
                  "Kobiety w Japonii po prostu kochają modę. Młode Japonki bywają bardziej alternatywne, w ich strojach można odnaleźć więcej kolorów, noszą krótkie spódniczki, wysokie buty i kolorowe włosy. "+
                  "Mężczyźni natomiast wyglądają bardzo klasycznie: biała koszula, ciemne eleganckie spodnie oraz skórzana teczka. "+
                  "Słyszałam kiedyś takie japońskie przysłowie: “jeśli gwóźdź wystaje, trzeba go natychmiast wbić na miejsce”. Dokładnie tak samo jest w kwestii stroju, każdy jest taki sam i nikt nie “wystaje” jak owy gwóźdź."+
                  "Wydaje mi się, że prawdziwa kwintesencją tradycji jest japońskie kimono, które ma tak szerokie spektrum zastosowań w zależności od rodzaju uroczystości. Czy może być coś bardziej japońskiego dla osoby zbzikowanej na punkcie mody niż tradycyjne kimono?"+
                  "Kimono dla kobiet składa się z dwunastu lub więcej elementów, które należy dobrać, ubrać i umocować w specjalny sposób. Z tego powodu w Japonii istnieją specjaliści, którzy pomagają założyć odpowiednio te wszystkie elementy."+
                  "Ku mojemu zdziwieniu spotkaliśmy wiele gejsz, na ulicach, w metrze i w restauracjach. Trudno było oczy oderwać od tak perfekcyjnie wyglądających kobiet."+
                  "Udało mi się zakupić jeden rodzaj kimona, ale postanowiłam nosić je na swój własny sposób (KLIK- moja wariacja na temat kimona). "+
                  "W Japonii kimona noszą też mężczyźni. Mają one ########stały kształt i wykonane są z tkanin o stonowanych barwach. Odmiennie niż w przypadku kimon damskich rodzaj i rangę uroczystości rozróżnia się poprzez dobór odpowiednich dodatków."+
                  "Na koniec ciekawostka. Kim są owi tytułowi gajdzini? Gajdzin, a właściwie Gaijin to w języku japońskim “cudzoziemiec”, “nie-Japończyk” lub “obcy”, określenie to funkcjonuje w powszechnym użytku. "+

                  "http://japoland.pl/blog/kultura-i-sztuka/ki-mono/ (napisac w spawie dania namiarow do bloga)";

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
        }]
       })
       .state('posts.filter', {
          url: '^/posts/filter/:filter',
              templateUrl: 'main.html',
              controller: 'MainController',
          onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {

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
                  size: 'lg',
                  resolve: {
                    postId: function() {
                      return $stateParams.postId;
                    }
                  }
                });
                modal.result.finally(function() {
                         $state.go('^');
                       });
        }],
            onExit: function($uibModalStack){
                $uibModalStack.dismissAll();
            }
        })
   })
