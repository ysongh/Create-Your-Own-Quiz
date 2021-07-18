export const quizTemplate = title => {
  return `
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>Quiz</title>
      <meta name="description" content="Certificate">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
      <style>
        body {
          padding: 0;
          margin: 0;
          display: flex;
          width: 100vw;
          height: 100vh;
          justify-content: center;
          align-items: center;
        }
    
        .btn-ans {
          background-color: lightblue;
        }
    
        .btn-grid {
          display: grid;
          grid-template-columns: repeat(2, auto);
          gap: 10px;
          margin: 20px 0;
        }
    
        .btn-secondary.correct {
          background-color: green !important;
        }
    
        .btn-secondary.wrong {
          background-color: red !important;
        }
    
        .hide {
          display: none;
        }
    
        .card {
          max-width: 600px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="text-center">${title}</h1>
        <div class="card mx-auto">
          <div class="card-body">
            <div id="question-container" class="hide">
              <div id="question" class="h4">
                Question
              </div>
              <div id="answer-buttons" class="btn-grid">
                <button class="btn">Answer 1</button>
                <button class="btn">Answer 2</button>
                <button class="btn">Answer 3</button>
                <button class="btn">Answer 4</button>
              </div>
            </div>
    
            <div class="controls">
              <button id="start-btn" class="start-btn btn btn-primary">Start</button>
              <button id="next-btn" class="next-btn btn btn-primary hide">Next</button>
            </div>
          </div>
        </div>
      </div>
    </body>
    <script>
      const startButton = document.getElementById("start-btn");
      const nextButton = document.getElementById("next-btn");
      const questionContainerElement = document.getElementById("question-container");
      const questionElement = document.getElementById("question");
      const answerButtonsElement = document.getElementById("answer-buttons");
      
      let currentQuestionIndex;
    
      startButton.addEventListener("click", startQuiz);
      nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        setNextQuestion();
      })
    
      function startQuiz(){
        startButton.classList.add("hide");
        questionContainerElement.classList.remove("hide");
        currentQuestionIndex = 0;
        setNextQuestion();
      }
    
      function setNextQuestion() {
        resetState();
        showQuestion(questions[currentQuestionIndex]);
      }
    
      function showQuestion(question) {
        questionElement.innerHTML = question.question;
        question.answers.forEach(answer => {
          const button = document.createElement("button");
          button.innerHTML = answer.text;
          button.classList.add("btn-secondary");
    
          if(answer.correct) {
            button.dataset.correct = answer.correct;
          }
    
          button.addEventListener("click", selectAnswer);
          answerButtonsElement.appendChild(button);
        })
      }
    
      function resetState() {
        nextButton.classList.add("hide");
    
        while(answerButtonsElement.firstChild) {
          answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
      }
    
      function selectAnswer(e) {
        const selectedbutton = e.target;
        const correct = selectedbutton.dataset.correct;
        setStatusClass(document.body, correct);
    
        Array.from(answerButtonsElement.children).forEach(button => {
          setStatusClass(button, button.dataset.correct);
        });
    
        if(questions.length > currentQuestionIndex + 1) {
          nextButton.classList.remove("hide");
        }
        else {
          startButton.innerHTML = "Restart";
          startButton.classList.remove("hide");
        }
      }
    
      function setStatusClass(element, correct) {
        clearStatusClass(element);
        if(correct) {
          element.classList.add('correct');
        }
        else {
          element.classList.add('wrong');
        }
      }
    
      function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
      }
    
      const questions = [
        {
          question: 'Is it fun?',
          answers: [
            { text: '0', correct: true },
            { text: '1', correct: false }
          ]
        },
        {
          question: 'What color is the water',
          answers: [
            { text: 'yellow', correct: false },
            { text: 'blue', correct: true },
            { text: 'green', correct: false }
          ]
        }
      ]
    
      <\/script>
    </html>
  `
}