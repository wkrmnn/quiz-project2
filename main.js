'use strict';

const questions = [
  {
    text: 'Сколько будет 17 + 38?',
    answers: ['53', '55', '57', '59'],
    correct: 1
  },
  {
    text: 'Сколько будет 9 × 7?',
    answers: ['54', '61', '63', '67'],
    correct: 2
  },
  {
    text: 'Чему равен квадратный корень из 144?',
    answers: ['10', '11', '12', '13'],
    correct: 2
  },
  {
    text: 'Сколько будет 256 ÷ 16?',
    answers: ['14', '16', '18', '20'],
    correct: 1
  },
  {
    text: 'Чему равно 5² + 3²?',
    answers: ['30', '32', '34', '36'],
    correct: 2
  },
  {
    text: 'Сколько градусов в сумме углов треугольника?',
    answers: ['90', '180', '270', '360'],
    correct: 1
  },
  {
    text: 'Сколько будет 1000 − 387?',
    answers: ['603', '613', '623', '633'],
    correct: 1
  },
  {
    text: 'Чему равно 3³ (три в кубе)?',
    answers: ['9', '18', '27', '36'],
    correct: 2
  },
  {
    text: 'Площадь прямоугольника со сторонами 8 и 13 равна:',
    answers: ['94', '100', '104', '108'],
    correct: 2
  },
  {
    text: 'Сколько простых чисел от 1 до 20?',
    answers: ['6', '7', '8', '9'],
    correct: 2
  }
];

let currentIndex = 0;
let score = 0;
let answered = false;
const quizScreen      = document.getElementById('quiz-screen');
const resultScreen    = document.getElementById('result-screen');
const nextBtn         = document.getElementById('next-btn');

const questionCounter = document.getElementById('question-counter');
const scoreLabel      = document.getElementById('score-label');
const progressBar     = document.getElementById('progress-bar');
const questionText    = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const resultTitle     = document.getElementById('result-title');
const resultText      = document.getElementById('result-text');
const resultScore     = document.getElementById('result-score');

function showScreen(screen) {
  [quizScreen, resultScreen].forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

function updateProgress() {
  questionCounter.textContent = `Вопрос ${currentIndex + 1} из ${questions.length}`;
  scoreLabel.textContent = `Счёт: ${score}`;
  progressBar.style.width = `${(currentIndex / questions.length) * 100}%`;
}

function renderQuestion() {
  answered = false;
  nextBtn.style.display = 'none';

  const q = questions[currentIndex];
  updateProgress();
  questionText.textContent = q.text;

  answersContainer.innerHTML = '';
  q.answers.forEach((answer, idx) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = answer;
    btn.addEventListener('click', () => handleAnswer(idx));
    answersContainer.appendChild(btn);
  });
}

function handleAnswer(selectedIdx) {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  const buttons = answersContainer.querySelectorAll('.answer-btn');
  buttons.forEach(btn => btn.disabled = true);

  if (selectedIdx === q.correct) {
    buttons[selectedIdx].classList.add('correct');
    score++;
    scoreLabel.textContent = `Счёт: ${score}`;
  } else {
    buttons[selectedIdx].classList.add('incorrect');
    buttons[q.correct].classList.add('correct');
  }

  const isLast = currentIndex === questions.length - 1;
  nextBtn.textContent = isLast ? 'Посмотреть результат' : 'Следующий вопрос';
  nextBtn.style.display = 'block';
}

function showResult() {
  progressBar.style.width = '100%';
  const total = questions.length;
  const pct = Math.round((score / total) * 100);

  let title, comment;
  if (pct === 100)      { title = 'Отличный результат!';  comment = 'Все ответы верны.'; }
  else if (pct >= 70)   { title = 'Хорошая работа!';      comment = 'Большинство ответов правильные.'; }
  else if (pct >= 40)   { title = 'Неплохо.';             comment = 'Есть над чем поработать.'; }
  else                  { title = 'Попробуй ещё раз.';    comment = 'Стоит повторить материал.'; }

  resultTitle.textContent = title;
  resultText.textContent = comment;
  resultScore.textContent = `${score} / ${total}`;
  showScreen(resultScreen);
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  answered = false;
  renderQuestion();
  showScreen(quizScreen);
}

nextBtn.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= questions.length) showResult();
  else renderQuestion();
});
restartBtn.addEventListener('click', restartQuiz);
