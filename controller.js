function  AppCtrl($scope, $http){
	console.log("hello world from  controller");
          

          var refresh =function()
          {
           $http.get('/contactlist').success(function(response)
           {console.log("haanji mai aa gya");
           $scope.contactlist=response;
           $scope.contact="";
                                });
         };
        refresh();
           $scope.addcontact =function()
           {
            console.log($scope.contact);
            $http.post('/contactlist',$scope.contact).success(function(response)
              {
                console.log(response);
                refresh();
              })
           };
           refresh();
           $scope.remove=function(id){
            console.log(id);
            $http.delete('/contactlist/'+id).success(function(response)
              {
                refresh();
              });
           }
           $scope.edit=function(id){
            console.log(id);
            $http.get('/contactlist/' + id).success(function(response)
              {
                $scope.contact=response;
                //refresh();
              });
           }
           $scope.update=function()
           {
            console.log($scope.contact._id);
            $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response)
            {
              refresh();
            });
           };
	$scope.deselect=function(){
		$scope.contact="";}
         }
