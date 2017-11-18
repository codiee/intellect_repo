// public/core.js
var angularTodo = angular.module('cartApp', [])


//controller
.controller('mainController', ['$scope', '$http' , function($scope, $http) {
    //hide edit form
    $scope.enableEditForm = false;
    $scope.user = {
      name: "",
      username: "",
      email: "",
	    address:""
    };

    $scope.cancelUpdate = function() {
        //$scope.enableEditForm = false;
        $scope.user = {
          name: "",
          age: "",
          city: ""
        };
    };

    // when landing on the page, get all todos and show them
    $scope.getList = function() {
      $http.get('https://jsonplaceholder.typicode.com/users')
        .then(function(response) {
          $scope.users = response.data;
		      console.log(response.data);
         })
    };

    $scope.emptyInput = function() {
      //to reset validation errors
      $scope.userForm.user_name.$setUntouched();
      $scope.userForm.user_name.$setPristine();
      $scope.userForm.user_age.$setUntouched();
      $scope.userForm.user_age.$setPristine();
      $scope.userForm.user_city.$setUntouched();
      $scope.userForm.user_city.$setPristine();
      $scope.enableEditForm = false;
      $scope.user = {
        name: "",
        age: "",
        city: ""
      };
    };

    //calling on page load
    $scope.getList();

    // when submitting the add form, send the text to the node API
    $scope.createUser = function(data) {
        var userInfo = {
          userId: $scope.userId,
          title: $scope.title,
          completed: false
        };
        $http.post('https://jsonplaceholder.typicode.com/todos', userInfo)
            .then(function(data) {
              $scope.enableUpdateForm($scope.userId);
              console.log('created successfully');
            })
    };

    //autofill input on edit
    $scope.enableUpdateForm = function(id) {
      $scope.enableEditForm = true;
      $http.get('https://jsonplaceholder.typicode.com/todos?userId='+id)
        .then(function(response) {
          $scope.userTodos = response.data;
          $scope.userId = response.data[0].userId;
         })
    };

    //update user
    $scope.updateStatus = function(data) {
      console.log("data",data);
        var dataInfo = {
          completed : data.completed,
        }
        $http.put('https://jsonplaceholder.typicode.com/todos/' + data.id , dataInfo)
            .then(function(data) {
              //$scope.enableUpdateForm(data.userId);
              $scope.enableEditForm = false;
            })
    };

    // delete user after checking it
    $scope.deleteUser = function(id) {
        console.log("id", id);
        if(id) {
          $http.delete('https://jsonplaceholder.typicode.com/todos/' + id)
              .then(function(data) {
               //to-reload the latest list
               $scope.enableUpdateForm(id);
               console.log('deleted successfully');
              })
        } else {
          //To-do : move this msg to constant service
          console.log('id is missing');
        }
    };

}]);
