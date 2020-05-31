//The following requirements cover what the app must do, from the user's perspective.

//The starting screen should have a button that users can click to start the quiz.
//Users should be prompted through a series of at least 5 multiple choice questions that they can answer.
//Users should be asked questions 1 after the other.
//Users should only be prompted with 1 question at a time.
//Users should not be able to skip questions.
//Users should also be able to see which question they're on (for instance, "7 out of 10") and their current score ("5 correct, 2 incorrect").
//Upon submitting an answer, users should:
//receive textual feedback about their answer. If they were incorrect, they should be told the correct answer.
//be moved onto the next question (or interact with an element to move on).
//Users should be shown their overall score at the end of the quiz. In other words, how many questions they got right out of the total questions asked.
//Users should be able to start a new quiz.


let questionNumber = 0;
let quizScore = 0;

//listen for when user clicks start
function handleStartQuiz() {
  $('.quiz-start-window').on('click', '#begin-quiz-button', () => {
    event.preventDefault();
    console.log('clicked');
  });
  handleRenderNextQuestion();
}

//render question
function handleRenderNextQuestion() {
  questionNumber++;
  $('.quiz-template').html(handleRenderQuestion());
}

//render a question
function handleRenderQuestion() {
  return `
  <form id="quiz-question-window" class="quiz-window">
        <div class="quiz-progress-bar">
          <span class="quiz-progress">Question: ${questionNumber} / ${STORE.length}</span>
          <span class="quiz-score">Score: ${quizScore} / ${questionNumber}</span>
        </div>
        <fieldset>
          <legend><h2 class="quiz-question">${STORE[questionNumber - 1].question}</h2></legend>
          <label class="answers-class" for="A">
            <input 
              type="radio" 
              name="answer" 
              id="A" 
              value="${STORE[questionNumber - 1].answers.a}"
              required
            >
            <span class="answer-options">${STORE[questionNumber - 1].answers.a}</span> 
          </label>
          <label class="answers-class" for="B">
            <input 
              type="radio" 
              name="answer" 
              id="B" 
              value="${STORE[questionNumber - 1].answers.b}"
              required
            >
            <span class="answer-options">${STORE[questionNumber - 1].answers.b}</span>  
          </label>
          <label class="answers-class" for="C">
            <input 
              type="radio" 
              name="answer" 
              id="B" 
              value="${STORE[questionNumber - 1].answers.c}"
              required
            > 
            <span class="answer-options">${STORE[questionNumber - 1].answers.c}</span> 
          </label>
          <label class="answers-class" for="D">
            <input type="radio" 
              name="answer" 
              id="D" 
              value="${STORE[questionNumber - 1].d}"
              required
            >
            <span class="answer-options">${STORE[questionNumber - 1].answers.d}</span>  
          </label>
          <button class="button submit-button" id="submit-button">Submit</button>
        </fieldset>
  </form>
  `; 
}

//submit button 
function handleSubmitButton() {
  $('.quiz-template').on('click', '#submit-button', () => {
    event.preventDefault();
    handleCheckAnswer();
  });
  
}

function handleNextButton() {
  console.log('handle next btn');
  $('.quiz-template').on('click', '.next-button', () => {
    event.preventDefault();
    console.log('nextclicked');
    if (questionNumber === STORE.length) {
      renderResultsTemplate();
    } else {
      handleRenderNextQuestion();
    }
  });
}

function renderResultsTemplate() {
  $('.quiz-template').html(`
  <form id="quiz-end" class="quiz-window">
  <fieldset>
    <legend><h2>End Of Quiz!</h2></legend>
    <div class="quiz-results-page">
      <p>Your Score Is: <b>${quizScore} / ${questionNumber}</b></p>
      <h3><h3 class="quiz-percentage">${quizScore*10}%</h3></h3> 
    </div>
    <button class="button restart-quiz">Restart Quiz</button>
  </fieldset>
  </form>
  `);
}


//check if question answered is right or wrong and displays the correct message accordingly 
function handleCheckAnswer() {
  let correctAnswer = STORE[questionNumber - 1].correctAnswer;
  let selectedAnswer = $('input[name="answer"]:checked').val();
  console.log('correct answer: ', correctAnswer);
  console.log(selectedAnswer);
    if (selectedAnswer === correctAnswer) {
      quizScore++;
      renderCorrectTemplate();
    } else {
      renderIncorrectTemplate();
    }
}

function renderIncorrectTemplate() {
  $('.quiz-template').html(`
    <form id="quiz-question-incorrect" class="quiz-window">
      <div class="quiz-progress-bar">
        <span class="quiz-progress">Question: ${questionNumber} / ${STORE.length}</span>
        <span class="quiz-score">Your Score: ${quizScore} / ${questionNumber}</span>
      </div>
      <fieldset>
        <legend><h2>Incorrect!</h2></legend>
      <div class="correct-answer">
        <p>The correct answer is: <b>${STORE[questionNumber - 1].correctAnswer}</b></p>
      </div>
    <section class="quiz-template-feedback">  
      <button class="button next-button">Next</button>
      </fieldset>
    </form>
    </section>
  `);
}

function renderCorrectTemplate() {
  $('.quiz-template').html(`   
    <form id="quiz-question-correct" class="quiz-window">
        <div class="quiz-progress-bar">
          <span class="quiz-progress">Question: ${questionNumber} / ${STORE.length}</span>
          <span class="quiz-score">Your Score: ${quizScore} / ${questionNumber}</span>
        </div>
        <fieldset>
          <legend><h2>Correct!</h2></legend>
    <section class="quiz-template-feedback">
          <button class="button next-button">Next</button>
        </fieldset>
    </form>
    </section>    
  `);
}

//button to restart quiz
function handleRestartQuiz() {
  
}

function changeQuestionNumber() {
  questionNumber++;
}

function quizScoreTracker() {
  quizScore++;
}

function handleBindEventListeners() {
  handleStartQuiz();
  handleSubmitButton();
  handleNextButton();
}

$(handleBindEventListeners)