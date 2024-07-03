document.addEventListener('DOMContentLoaded', () => {
    window.electron.onQuestion((question) => {
      displayQuestion(question)
    })
  })
  
  function displayQuestion(question) {
    const quizContainer = document.getElementById('quizz')
    quizContainer.innerHTML = ''
    
    const questionDiv = document.createElement('div')
    questionDiv.className = 'question'
    
    const questionTitle = document.createElement('h2')
    questionTitle.textContent = question.question
    questionDiv.appendChild(questionTitle)
    
    question.answers.forEach(answer => {
      const answerLabel = document.createElement('label')
      const answerInput = document.createElement('input')
      answerInput.type = 'radio'
      answerInput.name = 'question'
      answerInput.value = String(answer.correct)
      answerLabel.appendChild(answerInput)
      answerLabel.appendChild(document.createTextNode(answer.answer))
      
      answerInput.addEventListener('click', () => {
        checkAnswer(answer.correct)
      })
      
      questionDiv.appendChild(answerLabel)
      questionDiv.appendChild(document.createElement('br'))
    })
    
    quizContainer.appendChild(questionDiv)
  }
  
  function checkAnswer(isCorrect) {
    const resultContainer = document.getElementById('result')
    
    if (!resultContainer) {
      const newResultContainer = document.createElement('div')
      newResultContainer.id = 'result'
      document.body.appendChild(newResultContainer)
      showResult(isCorrect, newResultContainer)
    } else {
      showResult(isCorrect, resultContainer)
    }
  }
  
  function showResult(isCorrect, container) {
    container.textContent = String(isCorrect) === 'true' ? 'Bonne réponse!' : 'Mauvaise réponse. Réessayez!'
    container.style.color = String(isCorrect) === 'true' ? 'green' : 'red'
  }
  