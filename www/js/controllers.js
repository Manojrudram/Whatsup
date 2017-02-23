angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('whatsNewCntrl', function($scope,$http,$window) {
   $http.get("https://newsapi.org/v1/sources?language=en&apiKey=c023863c25b445068d7bf9f98b660991").then(function(list){
    $scope.gridData=list.data.sources;
    })
    $scope.selection = [];
      $scope.selection1 = [];
    
    $scope.toggle = function (idx,name) {
        $window.localStorage.clear();
        var pos = $scope.selection.indexOf(idx);
        if (pos == -1) {
            $scope.selection.push(idx);
        } else {
            $scope.selection.splice(pos, 1);
        }
        console.log(idx,name)
        var pos = $scope.selection1.indexOf(name);
        if (pos == -1) {
            $scope.selection1.push(name);
        } else {
            $scope.selection.splice(pos, 1);
        }
        console.log(name)
        $scope.$on("$ionicNavView.leave", function(){
  console.log("IonicNavView leave event");
});
    };
  
  $scope.display=function(){ 
    $window.localStorage.clear();
    var localarray=[];
     var localarrayname=[];
      for(var i=0;i<$scope.selection.length;i++ ){   
        // alert($scope.CID[i]) 
         $window.localStorage[i] = $scope.selection[i]; 
          localarray[i]=$scope.selection[i]; 
           //var op= JSON.parse(localStorage.getIte);
             //console.log(op);
              }
              localStorage.setItem('data',JSON.stringify(localarray));
                 $scope.output=JSON.parse(localStorage.getItem('data')); 
                  console.log($scope.output); 
                   //var op=JSON.parse(localStorage 
                    //$scope.j=JSON.stringify($scope.CID);//  
                   // alert(JSON.stringify($scope.j))
                    $scope.fun=$scope.output;
//alert($scope.fun)
for(var i=0;i<$scope.selection1.length;i++ ){   
        // alert($scope.CID[i]) 
         $window.localStorage[i] = $scope.selection1[i]; 
          localarrayname[i]=$scope.selection1[i]; 
           //var op= JSON.parse(localStorage.getIte);
             //console.log(op);
              }
              localStorage.setItem('data1',JSON.stringify(localarrayname));
                 $scope.outputname=JSON.parse(localStorage.getItem('data1')); 
                  console.log($scope.outputname); 
                   //var op=JSON.parse(localStorage 
                    //$scope.j=JSON.stringify($scope.CID);//  
                   // alert(JSON.stringify($scope.j))
                    $scope.fun1=$scope.outputname;
//alert($scope.fun)
}
})

.controller('browseCntrl',function($scope,$http,$window,$ionicTabsDelegate,$ionicModal,$cordovaSocialSharing,$cordovaInAppBrowser){
 $scope.displaynews=function(){ 
    $scope.output=JSON.parse(localStorage.getItem('data'));  
$scope.outputname=JSON.parse(localStorage.getItem('data1'));    
     }
      $scope.content=function(name){
for(var i=0;i<$scope.output.length;i++)
{
  if(name===$scope.output[i]){
$scope.api=$scope.outputname[i];
  }
}   
      }
      $scope.show=function(option){
        // $scope.var=[]
        switch(option)
        {
          case 'top':
        $scope.d="activated1";
        break;
        case 'latest':
        $scope.b="activated2";
        break;
        case 'popular':
        $scope.c="activated3";
        break;
      }
       $ionicModal.fromTemplateUrl('templates/desc.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.openModal = function(arg) {
    $scope.src=arg;
    $scope.modal.show();
  };
         $http.get("https://newsapi.org/v1/articles?source="+$scope.api+"&sortBy="+option+"&apiKey=c023863c25b445068d7bf9f98b660991").then(function(list2){
  $scope.newsData=list2.data.articles;
  $scope.selected=option;
      })
     
    }
    $scope.shareContent=function(newsImage, description){  
  $cordovaSocialSharing.share('NEWS', 'subject',newsImage,description) 
  // Share via native share sheet  
    .then(function(result) {      
      // Success!    
    }, function(err) {      
      // An error occured. Show a message to the user    
    });  
  } 
   //In App Browser Opening 
       var options = {    
         location: 'yes',
             clearcache: 'no', 
                toolbar: 'no' 
               };   
               $scope.openBrowser=function(url){ 
                      $cordovaInAppBrowser.open(url, '_blank', options) 
                           .then(function(event) {   
                                   success      })   
                                      .catch(function(event) {       
                                          error      });
                                            }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});

 