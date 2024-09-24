const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('timer');
const resultElement = document.getElementById('result');

let shuffledQuestions, currentQuestionIndex, correctAnswers, timerInterval;

startButton.addEventListener('click', startGame);

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    correctAnswers = 0;
    questionContainerElement.classList.remove('hide');
    resultElement.classList.add('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    startTimer();
}

function startTimer() {
    let timeLeft = 30;
    timerElement.innerText = timeLeft;
    timerElement.classList.remove('hide');

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval); 
            selectAnswer({ target: { dataset: { correct: false }}});
        }
    }, 1000);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    clearInterval(timerInterval);
    timerElement.classList.add('hide');
}

function selectAnswer(e) {
    clearInterval(timerInterval);
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true'; 
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });

    if (correct) {
        correctAnswers++;
    }

    // Automatically move to the next question after a short delay
    setTimeout(() => {
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            currentQuestionIndex++;
            setNextQuestion();
        } else {
            showResult();
        }
    }, 1000); // 1 second delay before moving to the next question
}

function showResult() {
    resetState();
    questionElement.innerText = `You got ${correctAnswers} out of ${shuffledQuestions.length} correct!`;
    
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct'); 
    } else {
        element.classList.add('wrong'); 
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hyper Text Markup Language', correct: true },
            { text: 'High Text Markup Language', correct: false },
            { text: 'Hyperlink and Text Markup Language', correct: false },
            { text: 'Hyper Text Machine Language', correct: false },
        ]
    },
    {
        question: 'Which company developed Java?',
        answers: [
            { text: 'Sun Microsystems', correct: true },
            { text: 'Microsoft', correct: false },
            { text: 'Oracle', correct: false },
            { text: 'IBM', correct: false },
        ]
    },
    {
        question: 'What is the correct syntax for a comment in JavaScript?',
        answers: [
            { text: '// This is a comment', correct: true },
            { text: '# This is a comment', correct: false },
            { text: '<!-- This is a comment -->', correct: false },
            { text: '/* This is a comment */', correct: false },
        ]
    },
    {
        question: 'Which of the following is a JavaScript framework?',
        answers: [
            { text: 'Django', correct: false },
            { text: 'React', correct: true },
            { text: 'Ruby on Rails', correct: false },
            { text: 'Flask', correct: false },
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Creative Style System', correct: false },
            { text: 'Cascading Style System', correct: false },
            { text: 'Computer Style Sheets', correct: false },
        ]
    },
    {
        question: 'Which HTML tag is used to define an internal style sheet?',
        answers: [
            { text: '<style>', correct: true },
            { text: '<css>', correct: false },
            { text: '<script>', correct: false },
            { text: '<link>', correct: false },
        ]
    },
    {
        question: 'What is the main purpose of Git?',
        answers: [
            { text: 'Version control', correct: true },
            { text: 'Database management', correct: false },
            { text: 'Web hosting', correct: false },
            { text: 'Project management', correct: false },
        ]
    },
    {
        question: 'Which of the following is NOT a programming language?',
        answers: [
            { text: 'Python', correct: false },
            { text: 'HTML', correct: true },
            { text: 'Java', correct: false },
            { text: 'C++', correct: false },
        ]
    },
    {
        question: 'What is the purpose of the <div> tag in HTML?',
        answers: [
            { text: 'To define a division or section', correct: true },
            { text: 'To create a link', correct: false },
            { text: 'To insert an image', correct: false },
            { text: 'To style text', correct: false },
        ]
    },
    {
        question: 'Which of the following is a server-side scripting language?',
        answers: [
            { text: 'JavaScript', correct: false },
            { text: 'PHP', correct: true },
            { text: 'HTML', correct: false },
            { text: 'CSS', correct: false },
        ]
    }
];