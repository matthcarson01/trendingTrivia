angular.module("app").controller("questionsCtrl", function($scope, $http) {
  $scope.test = "Testing 123";
  $scope.quiz = $http
    .get("https://practiceapi.devmountain.com/api/trivia/questions")
    .then(response => {
      $scope.questions = response.data;
      console.log(response.data);
    });

  $scope.newColor = { "background-color": "white" };
  $scope.correctAnswer = function(key, correct_answer) {
    // if(question.option[key] ===question.correct_answer){
    console.log("Key", key);
    console.log("Answer", correct_answer);
    if (key == correct_answer) {
      $scope.newColor = { "background-color": "green" };
      $scope.isCorrect = true;
      //   console.log("Correct answer");
    } else {
      $scope.newColor = { "background-color": "red" };
      $scope.isCorrect = false;
    }
  };
});
