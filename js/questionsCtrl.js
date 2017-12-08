angular.module("app").controller("questionsCtrl",function($scope, $http){
    $scope.test="Testing 123";
    $scope.editQuestion ='';
    $scope.option1 = ""
    $scope.option2 = ""
    $scope.option3 = ""
    $scope.option4 = ""
    $scope.newQuestion = {
        animal: "",
        difficulty: 2,
        correct_answer: 1,
        options: {
            1: $scope.option1,
            2: $scope.option2,
            3: $scope.option3,
            4: $scope.option4
        },
        question: "",
        saveNew(){
            console.log("saveNew ran")
        },
        cancelSave(){
            $scope.modalAddOrEdit = false;
            console.log("cancelSave ran")
        },
        showModal(){
            $scope.modalAddOrEdit = true;
            console.log("showModal ran", modalAddOrEdit)
        }
    };
    

    $scope.quiz = $http
      .get("https://practiceapi.devmountain.com/api/trivia/questions")
      .then(response => {
          $scope.questions = response.data;
          console.log(response.data)})
});
