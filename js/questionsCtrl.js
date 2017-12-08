angular.module("app").controller("questionsCtrl",function($scope, $http){
    $scope.test="Testing 123";
    $scope.quiz = $http
      .get("https://practiceapi.devmountain.com/api/trivia/questions")
      .then(response => {
          $scope.questions = response.data;
          console.log(response.data)})
});
