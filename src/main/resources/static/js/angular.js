var app = angular.module('iglaWPodrozy', ['ngAnimate', 'ngSanitize','ui.router', 'ui.bootstrap', 'ui.bootstrap.modal']);

app.controller('NavBarController', function ($scope) {
  $scope.isNavCollapsed = true;
  $scope.isCollapsed = false;
  $scope.isCollapsedHorizontal = false;
});

app.service('PostsService', function($http) {
    this.loadPosts = function(loadedPostsNumber, query, callbackFn) {
        var req = {
         method: 'POST',
         url: 'http://localhost:9200/posts/_search',
         headers: {
           'Content-Type': 'application/json'
         },
         data: {
             "from" : loadedPostsNumber, "size" : 7,
             "query": query,
             "sort": { "date": { "order": "desc" }}
         }
        }
        $http(req).then(function(response) {
            return callbackFn(response.data.hits.hits);
        },
        function(response){
        });
    }
});

app.config(['$locationProvider','$qProvider', function($locationProvider,$qProvider) {
  $locationProvider.hashPrefix('');
  $qProvider.errorOnUnhandledRejections(false);
}]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
       $urlRouterProvider.otherwise('/posts/');
       $stateProvider
       .state('about', {
           url: '^/about/',
                resolve: {
               function($stateParams, $state, $uibModal, $rootScope,$transition$) {
                                   var modal = $uibModal.open({
                                        animation: true,
                                        templateUrl: 'about.html',
                                        controller: 'AboutController',
                                        size: 'lg'
                                      });
                                      modal.result.finally(function() {
                                          var result = modal.result.$$state.value;
                                          if(typeof result != 'undefined' && result.hasOwnProperty('query')) {
                                              $state.go('posts.search',result);
                                          } else{
                                          if($transition$.from().name === '') {
                                                  $state.go('posts',$transition$.params('from'));
                                             }else {
                                                  $state.go($transition$.from().name,$transition$.params('from'));
                                             }
                                          }
                                        });
                      }
                    },
               onExit: function($uibModalStack){
                   $uibModalStack.dismissAll();
               }
          })
       .state('posts', {
            url: '^/posts/',
            controller: 'MainController',
       })
       .state('posts.search', {
          url: '^/posts/search/:query',
          controller: 'MainController',
         })
        .state('posts.show', {
        url: '^/posts/show/:postId',
           resolve: {
                    posts: function() { return {id:'marta-w-porto.html', title:'Marta w Porto',category:'podroze',date:Math.random()+'th May 2017', description:'Marta przyjechala do Porto zobaczyc co slychac', content:'CONTENT', commentsCount:'12', tags: 'kokos;kokos2', image:'img/image1.JPG', location: 'Zurich'}},
                    function($stateParams, $state, $uibModal, $rootScope,$transition$) {
                                var modal = $uibModal.open({
                                     animation: true,
                                     templateUrl: 'show-post.html',
                                     controller: 'ShowPostController',
                                     size: 'lg',
                                     resolve: {
                                       postId: function() {
                                         return $stateParams.postId;
                                       }
                                     }
                                   });

                                   modal.result.finally(function() {
                                        var result = modal.result.$$state.value;
                                          if(typeof result != 'undefined' && result.hasOwnProperty('query')) {
                                              $state.go('posts.search',result);
                                          } else{
                                          if($transition$.from().name === '') {
                                                  $state.go('posts',$transition$.params('from'));
                                             }else {
                                                  $state.go($transition$.from().name,$transition$.params('from'));
                                             }
                                          }
                                      });
                   }
                 },
            onExit: function($uibModalStack){
                $uibModalStack.dismissAll();
            }
        })
   })

app.controller('MainController', function($location, $scope, $stateParams, $http, $state, PostsService, $rootScope) {
    var loadPosts = function(loadedPostsNumber) {
        var query = {"match_all" : {}};
        if(typeof $stateParams != 'undefined' && $stateParams.hasOwnProperty('query')) {
            var json = "{\"match\":" + "{\"" +$stateParams["query"].replace(":","\":\"") +"\"}}"
            query = JSON.parse(json)
        }
        PostsService.loadPosts(loadedPostsNumber, query, function(data) {
        if(data == 0) {
            $scope.noMorePosts = true;
        }
        if(loadedPostsNumber ==0) {
            $rootScope.posts = [];
        }
        Array.prototype.push.apply($rootScope.posts,data);
        });
    }
    loadPosts($rootScope.loadedPostsNumber=0)
    $scope.pageChanged = function() {
      $scope.loadedPostsNumber = $scope.loadedPostsNumber + 7;
      loadPosts($scope.loadedPostsNumber);
    };
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

app.controller('AboutController', function($scope, $uibModalInstance) {
  $scope.content = "<p>Mam za sobą studia i 4 letni epizod w korporacji. Jestem szczęśliwie zakochana."+
                    "Mam bzika na punkcie podróży, zdrowego stylu życia… i mody."+
                    "Obecnie zastanawiam sie nad swoja przeszłością, wyciągam wnioski z poprzednich dokonań i szukam inspiracji na przyszłość. </p>Od najmłodszych lat uwielbiałam tworzyć i wymyślać ubrania. Początkowo były to ubranka dla lalek, wówczas pierwszy raz siedziałam za “sterami” starej maszyny do szycia. Później wymyślałam ubrania dla siebie i szyła mi je mama. Te doświadczenia sprawiły, że coraz bardziej zarażałam się pasją tworzenia własnych ubrań, eksperymentowania z tkaninami, dodatkami oraz formą. Uwielbiam wyprawy do malutkiego sklepiku z materiałami w moim rodzinnym miasteczku. Za każdym razem gdy zobaczę tkaninę, która mi się spodoba, dokładnie wiem co chciałabym z niej uszyć. <br/>Zamierzam sama przerabiać, projektować i szyć nowe ubrania. <br/>Chciałabym to wszystko połączyć z podróżami, z których zamierzam czerpać inspiracje do nowych projektów, a także tworzyć ubrania z myślą o przyszłych podróżach. <br/>Moja ostateczna decyzja o pisaniu bloga zapadła właśnie podczas jednej z takich podróży, była nią wyprawa do Azji. Spacerując po pięknym i magicznym Kioto, będąc na końcu świata poczułam, że warto próbować spełniać swoje marzenia. <br/>Jeśli nie zaryzykujesz, nie poświęcisz czasu i nie dasz czegoś od siebie to pewnie się nie uda. Ja zamierzam dać z siebie wszystko. <br/>Mam masę pomysłów, chęci i energii, aby je realizować. <br/> <br/>Jeżeli jesteś zainteresowana/y moimi poczynaniami, zapraszam na bloga.";
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
});

app.controller('ShowPostController', function($scope, $uibModalInstance, postId) {

  $scope.postId = postId+'zecsc';
  $scope.content = "<div class=\"modal-post-text\">Japonia to niezwykły kraj z bogatym dobytkiem kulturowym. Wszystko tam było dla mnie niezwykle: ludzie, obyczaje, stroje, język oraz jedzenie. Pomimo pozornego tłoku na ulicach, dworcach oraz w metrze, ludzie są “dziwnie” spokojni. Nigdy dotychczas się z czymś takim nie spotkałam. Pomyślałam, że jako osoba zbzikowana na punkcie mody i kultury ubioru podzielę się z Tobą moimi spostrzeżeniami na ten temat z Japonii. <p/>"+
                    "<br/><span class=\"modal-title\">JAPOŃSKA ELEGANCJA NA NAJWYŻSZYM POZIOMIE</span><br/>"+
                    "“Spokój” także panował w strojach japończyków. Dzieci już od najmłodszych lat przyzwyczajane są do ubioru zgodnego z ogólnie przyjętymi zasadami. W szkołach podstawowych zazwyczaj mundurki nie są obowiązkowe, ale bardzo dużo dzieci je nosi. W szkołach średnich to już standard i obowiązek. <p/>Tradycyjny japoński mundurek szkolny dla dziewcząt ma krój stroju marynarskiego i składa się z białej bluzki, plisowanej spódniczki do kolan, trampek i kolanówek. <p/>Chłopięce mundurki są szyte w stylu wojskowym; składają się z białej koszuli z usztywnianym kołnierzykiem i ciemnych spodni. <p/>W Japonii dodatkowo obowiązują mundurki przeznaczone do noszenia na zajęcia wychowania fizycznego. Wszystko to wygląda bardzo estetycznie, nikt się nie wyróżnia i nie rzuca się w oczy. <p/> Dziewczynki wracające ze szkoły wyglądały niesamowicie  w swoich mundurkach, aż sama zatęskniłam za czasami szkolnymi i żałowałam, że nie miałam okazji nosić takiego prawdziwego mundurka. <br/> <br/>"+
                    "Japoński strój do pracy jest bardzo podobny do owych mundurków szkolnych, zawsze stonowany i elegancki. Kobiety noszą białe koszule, pastelowe bluzki, spódnice do kolan lub długie spodnie oraz czułenka na obcasie. Mają dobre i często markowe torebki, które nie rzucają się w oczy. Japonki piękne lśniące włosy i minimalny make up. Wszystko to tworzy bardzo przyjemny dla oka widok. Swoją drogą Japonki bardzo dbają o swój wygląd, widać to już po ilości drogerii i kosmetyków w nich dostępnych. Raj!!! <p/>"+
                    "Kobiety w Japonii po prostu kochają modę. Młode Japonki bywają bardziej alternatywne, w ich strojach można odnaleźć więcej kolorów, noszą krótkie spódniczki, wysokie buty i kolorowe włosy. <p/>"+
                    "Mężczyźni natomiast wyglądają bardzo klasycznie: biała koszula, ciemne eleganckie spodnie oraz skórzana teczka. <br/>"+
                    "Słyszałam kiedyś takie japońskie przysłowie:"+
                    "<i> “jeśli gwóźdź wystaje, trzeba go natychmiast wbić na miejsce” </i>"+
                    "Dokładnie tak samo jest w kwestii stroju, każdy jest taki sam i nikt nie “wystaje” jak owy gwóźdź."+
                    "<br/><span class=\"modal-title\">KIMONO: KWINESENCJA JAPONII</span><br/>"+
                    "Wydaje mi się, że prawdziwa kwintesencją tradycji jest japońskie kimono, które ma tak szerokie spektrum zastosowań w zależności od rodzaju uroczystości. Czy może być coś bardziej japońskiego dla osoby zbzikowanej na punkcie mody niż tradycyjne kimono? <p/>"+
                    "Kimono dla kobiet składa się z dwunastu lub więcej elementów, które należy dobrać, ubrać i umocować w specjalny sposób. Z tego powodu w Japonii istnieją specjaliści, którzy pomagają założyć odpowiednio te wszystkie elementy. <p/>"+
                    "Ku mojemu zdziwieniu spotkaliśmy wiele gejsz, na ulicach, w metrze i w restauracjach. Trudno było oczy oderwać od tak perfekcyjnie wyglądających kobiet. <p/>"+
                    "Udało mi się zakupić jeden rodzaj kimona, ale postanowiłam nosić je na swój własny sposób (KLIK- moja wariacja na temat kimona). <p/>"+
                    "W Japonii kimona noszą też mężczyźni. Mają one stały kształt i wykonane są z tkanin o stonowanych barwach. Odmiennie niż w przypadku kimon damskich rodzaj i rangę uroczystości rozróżnia się poprzez dobór odpowiednich dodatków. <br/> <br/>"+
                    "Na koniec ciekawostka. Kim są owi tytułowi gajdzini? Gajdzin, a właściwie Gaijin to w języku japońskim “cudzoziemiec”, “nie-Japończyk” lub “obcy”, określenie to funkcjonuje w powszechnym użytku."+
                    "</div><img src=\"img/IMG_9508.JPG\" style=\"padding:0px;width:100%;\">"+
                    "<img src=\"img/IMG_8880.JPG\" style=\"width:100%;\">"+
                    "";

  $scope.comments = [{name:"Konrad",date:"'24.10.1222'",text:"tresc komentarza to jest"},{name:"Konrad",date:"24.10.1222",text:"tresc komentarza to jest"},{name:"Konrad",date:"24.10.1222",text:"tresc komentarza to jest"},{name:"Konrad",date:"24.10.1222",text:"tresc komentarza to jest"}];
  $scope.tags = [{name:"tag1",link:"www.tag1.com"},{name:"tag1",link:"www.tag1.com"},{name:"tag1",link:"www.tag1.com"},{name:"tag1",link:"www.tag1.com"},{name:"tag1",link:"www.tag1.com"},{name:"tag1",link:"www.tag1.com"},{name:"tag1",link:"www.tag1.com"},{name:"tag1",link:"www.tag1.com"},{name:"tag1",link:"www.tag1.com"},{name:"tag1",link:"www.tag1.com"},{name:"tag1",link:"www.tag1.com"},{name:"tag1",link:"www.tag1.com"},{name:"tag1",link:"www.tag1.com"},{name:"tag1",link:"www.tag1.com"},{name:"tag1",link:"www.tag1.com"},{name:"tag1",link:"www.tag1.com"},{name:"tag1",link:"www.tag1.com"},{name:"tag1",link:"www.tag1.com"},{name:"tag1",link:"www.tag1.com"},{name:"tag1",link:"www.tag1.com"}]
  $scope.addComment = function() {
    $scope.comments.push({name:$scope.name,text:$scope.text,email:$scope.email, date: new Date().toLocaleString()});
  }

  $scope.cancel = function() {
     $uibModalInstance.dismiss('cancel');
  };
  $scope.forward = function(state) {
     $uibModalInstance.dismiss({'query': "tag:"+state});
  };
});


