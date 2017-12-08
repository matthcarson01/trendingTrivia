angular.module("app").controller("questionsCtrl",function($scope, $http){
    $scope.test="Testing 123";
    $scope.editQuestion = false;
    $scope.option1 = ""
    $scope.option2 = ""
    $scope.option3 = ""
    $scope.option4 = ""
    $scope.newQuestion = {
        animal: "",
        difficulty: 2,
        correct_answer: 1,
        options: {
            1: '',
            2: '',
            3: '',
            4: ''
        },
        question: ""
    };
    $scope.clearOptions = function(){
        $scope.option1 = ''
        $scope.option2 = ''
        $scope.option3 = ''
        $scope.option4 = ''
    }
    $scope.saveNew = function(){
            console.log("saveNew ran")
            $scope.newQuestion.options = {1: $scope.option1, 2: $scope.option2, 3: $scope.option3, 4: $scope.option4}
            $scope.addQuestion($scope.newQuestion)
            $scope.newQuestion = {}
            $scope.clearOptions()
            $scope.modalAddOrEdit = false;
        },
    $scope.cancelSave = function(){
            $scope.editQuestion = false;
            console.log("cancelSave ran",$scope.option1)
            $scope.newQuestion = {}
            $scope.clearOptions()
            $scope.modalAddOrEdit = false;
        },
    $scope.showModal = function(){
            $scope.modalAddOrEdit = true;
            console.log("showModal ran", modalAddOrEdit)
        }
    $scope.showEditModal = function(quest){
        $scope.editId = quest._id;
        $scope.newQuestion = quest;
        $scope.option1 = quest.options['1']
        $scope.option2 = quest.options['2']
        $scope.option3 = quest.options['3']
        $scope.option4 = quest.options['4']
        $scope.modalAddOrEdit = true;
        $scope.editQuestion = true;
        console.log("showEditModal ran", modalAddOrEdit)
    };
    $scope.deleteEdit = function(id){
        $scope.editQuestion = false;
        $scope.newQuestion = {}
        $scope.deleteQuestion(id)
        $scope.clearOptions()
        $scope.modalAddOrEdit = false;
    };
    $scope.saveEdit = function(id, quest){
        $scope.newQuestion.options = {1: $scope.option1, 2: $scope.option2, 3: $scope.option3, 4: $scope.option4}
        $scope.editQuestionCall(id, quest)
        $scope.editQuestion = false;
        $scope.newQuestion = {}
        $scope.clearOptions()
        $scope.modalAddOrEdit = false;
    };
    $scope.cancelEdit = function(){

        $scope.editQuestion = false;
        $scope.newQuestion = {};
        $scope.clearOptions()
        $scope.modalAddOrEdit = false;
    }
    

    $scope.quiz = $http
      .get("https://practiceapi.devmountain.com/api/trivia/questions")
      .then(response => {
          $scope.questions = response.data;
          console.log(response.data)})

    $scope.addQuestion = function(quest){ 
     $http
     .post("https://practiceapi.devmountain.com/api/trivia/questions", quest)
     .then(response => {
       $scope.questions = response.data;
        console.log(response.data)})  
    }
    $scope.deleteQuestion = function(id){ 
        $http
        .delete(`https://practiceapi.devmountain.com/api/trivia/questions/${id}`)
        .then(response => response.data).then(()=>
            $http
            .get("https://practiceapi.devmountain.com/api/trivia/questions")
            .then(response => {
                $scope.questions = response.data;
                console.log(response.data)}))
       } 
       $scope.editQuestionCall = function(id, quest){ 
        $http
        .put(`https://practiceapi.devmountain.com/api/trivia/questions/${id}`, quest)
        .then(response => response.data).then(()=>
            $http
            .get("https://practiceapi.devmountain.com/api/trivia/questions")
            .then(response => {
                $scope.questions = response.data;
                console.log(response.data)}))
       }                  

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
