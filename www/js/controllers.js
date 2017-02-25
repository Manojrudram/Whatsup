angular.module('starter.controllers', [])

//selection of newspaper controller
.controller('whatsNewCntrl', function($scope,$http,$window) {
   $http.get("https://newsapi.org/v1/sources?language=en&apiKey=c023863c25b445068d7bf9f98b660991").then(function(list){
     $scope.gridData=list.data.sources;
         })
    $scope.selection = [];
    $scope.selection1 = [];
    $scope.toggle = function (idx,name) 
      {
        $window.localStorage.clear();
          var pos = $scope.selection.indexOf(idx);
            if (pos == -1) 
            {
              $scope.selection.push(idx);
             } 
            else 
            {
              $scope.selection.splice(pos, 1);
            }
               console.log(idx,name)
          var pos = $scope.selection1.indexOf(name);
           if (pos == -1) 
            {
              $scope.selection1.push(name);
            }  else {
              $scope.selection.splice(pos, 1);
            }
              console.log(name)
      };
  
  //display the selected items in sidemenu function
 
    $scope.display=function()
    { 
      $window.localStorage.clear();         //clear the localStorage
        var localarray=[];                  //localStorage var for id
        var localarrayname=[];              //localStorage var for name
          for(var i=0;i<$scope.selection.length;i++ )  //loop for storing the id in local localStorage
            {   
               $window.localStorage[i] = $scope.selection[i]; 
               localarray[i]=$scope.selection[i]; 
           }
            localStorage.setItem('data',JSON.stringify(localarray));
            $scope.output=JSON.parse(localStorage.getItem('data')); 
            console.log($scope.output);      
         //   $scope.fun=$scope.output;
         for(var i=0;i<$scope.selection1.length;i++ )   //loop for storing the name in the local localarray
            {
              $window.localStorage[i] = $scope.selection1[i]; 
              localarrayname[i]=$scope.selection1[i]; 
            }
              localStorage.setItem('data1',JSON.stringify(localarrayname));
              $scope.outputname=JSON.parse(localStorage.getItem('data1')); 
              console.log($scope.outputname); 
              //$scope.fun1=$scope.outputname;
      }
  })

//displaynews controller
.controller('browseCntrl',function($scope,$http,$window,$ionicTabsDelegate,$ionicModal,$cordovaSocialSharing,$cordovaInAppBrowser){
  
        $scope.displaynews=function()//retreiving name from localStorage
          { 
            $scope.output=JSON.parse(localStorage.getItem('data'));  
            $scope.outputname=JSON.parse(localStorage.getItem('data1'));    
          }
        $scope.content=function(name)
          {
              for(var i=0;i<$scope.output.length;i++)
                  {
                    if(name===$scope.output[i])//to check the name with the id 
                    {
                      $scope.api=$scope.outputname[i];
                    }
                      $scope.d="activated1"; //
                      // to fetch the news from the api when the paper selected in sidemenu
                      $http.get("https://newsapi.org/v1/articles?source="+$scope.api+"&sortBy=top&apiKey=c023863c25b445068d7bf9f98b660991").then(function(list2){
                        $scope.newsData=list2.data.articles;
                        })
                //open description model
                    $ionicModal.fromTemplateUrl('templates/desc.html', {
                    scope: $scope
                      }).then(function(modal) {
                    $scope.modal = modal;
                      });
            
                  $scope.openModal = function(arg) {
                  $scope.src=arg;
                  $scope.modal.show();
                      };
                }
                    //sharing the content in app 
                    $scope.shareContent=function(newsImage, description)
                  {  
                    $cordovaSocialSharing.share('NEWS', 'subject',newsImage,description) 
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
                      .catch(function(event)
                      {       
                            error      })                            
                  }
          }   
   
   //view the news according to the option of user
     
  $scope.show=function(option)
  {
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
      //get the news using api by the selection of user
         $http.get("https://newsapi.org/v1/articles?source="+$scope.api+"&sortBy="+option+"&apiKey=c023863c25b445068d7bf9f98b660991").then(function(list2){
         $scope.newsData=list2.data.articles;
         $scope.selected=option;
            },
          function(err) {
      // An error occured. Show a message to the user    
          })
          //open description model
          $ionicModal.fromTemplateUrl('templates/desc.html', {
          scope: $scope
           }).then(function(modal) {
          $scope.modal = modal;
            });
  
        $scope.openModal = function(arg) 
        {
        $scope.src=arg;
        $scope.modal.show();
        };  
  }
  //
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
        $scope.openBrowser=function(url)
        {
            $cordovaInAppBrowser.open(url, '_blank', options) 
             .then(function(event) {   
                   success      })   
             .catch(function(event) {       
                    error      });
         }
  })

.controller('PlaylistCtrl', function($scope, $stateParams) {
});

 


 