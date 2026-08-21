// const dicas = [
//   {
//     "dica": "O dia em que saímos pela <span>primeira vez</span>",
//     "palavra": "12/04"
//   },
//   {
//     "dica": "Me <span>apaixonei</span> pela tua",
//     "palavra": "alma"
//   },
//   {
//     "dica": "<span>Amo o brilho</span> dos teus",
//     "palavra": "olhos"
//   },
//   {
//     "dica": "Nome do <span>amor da minha vida </span>",
//     "palavra": "julia"
//   },
//   {
//     "dica": "Eu te amo <span>muito</span>",
//     "palavra": "muitao"
//   },
//   {
//     "dica": "O dia que respondi seu story pela <span>primeira vez</span>",
//     "palavra": "10/03"
//   },
// ]

// const tip = document.getElementById("tip")
// const inputBox = document.getElementById("inputBox")
// const wordInput = document.getElementById("inputPalavra")
// const aviso = document.getElementById("aviso")

// let i = 0
// let palavraSelecionada = dicas[i].palavra

// function renderWord(){
//   tip.innerHTML = dicas[i].dica
//   createInputs()
// }

// function nextWord(){
//   if((i+1) >= dicas.length){
//     return tip.innerHTML = "Arrasou amor!!!"
//   }

//   i++
//   palavraSelecionada = dicas[i].palavra
//   renderWord()
// }

// function checkWord(){
//   /*
//     junta os valores dos inputs em uma única string e faz a compraração
//   */

//   let answer = inputBox.getElementsByClassName("box")
//   let answerValue = ''

//   for (let i3 = 0; i3 < answer.length; i3++) {
//     const element = answer[i3]
//     answerValue += (element.value || '').trim()
//     answerValue = answerValue.toLowerCase()
//   }

//   if(!answerValue){
//     aviso.textContent = 'Digite a resposta'
//   }

//   else if(answerValue === palavraSelecionada){
//     alert(`Resposta certa!! (Rodada ${i+1} de ${dicas.length})`)
//     nextWord()
//   }
  
//   else {
//     aviso.textContent = 'palavra incorreta: ' + answerValue + ' palavra correta: ' + palavraSelecionada
//   }
// }

// function createInputs() {
//   /*
//     pega a var [palavraSelecionada], reconhece a [.length], gera o número ideal de inputs
//     com o id correspondente a letra do [.length], cria uma var para armazenar o valor esperado de cada input
//   */
//   inputBox.innerHTML = ''
//   let inputQuant = palavraSelecionada.length

//   for (let i2 = 0; i2 < inputQuant; i2++) {
//     const element = document.createElement("input")
//     element.setAttribute("class", 'box')
//     element.setAttribute("maxlength", '1')
//     element.style.textTransform = "uppercase"
//     element.dataset.index = i2

//     if(palavraSelecionada[i2] === '/'){
//       element.setAttribute("value", '/')
//     }

//     element.addEventListener("keydown", (e) => {
//       if (e.key === 'Backspace' && element.previousElementSibling) {
//         element.value = ''
//         element.previousElementSibling.focus()
//       } else if (element.value && element.nextElementSibling && e.key !== 'Backspace' && e.key !== 'Tab') {
//         element.nextElementSibling.focus()
//       }
//     })

//     inputBox.appendChild(element)
//   }
// }

const dicas = [
  {
    "dica": "O dia em que saímos pela <span>primeira vez</span>",
    "palavra": "12/04"
  },
  {
    "dica": "Me <span>apaixonei</span> pela tua",
    "palavra": "alma"
  },
  {
    "dica": "<span>Amo o brilho</span> dos teus",
    "palavra": "olhos"
  },
  {
    "dica": "Nome do <span>amor da minha vida </span>",
    "palavra": "julia"
  },
  {
    "dica": "Eu te amo <span>muito</span>",
    "palavra": "muitao"
  },
  {
    "dica": "O dia que respondi seu story pela <span>primeira vez</span>",
    "palavra": "10/03"
  }
]

const tip = document.getElementById("tip")
const inputBox = document.getElementById("inputBox")
const aviso = document.getElementById("aviso")
const sendBtn = document.getElementById("sendBtn")
const modalTutorial = document.getElementById("modalTutorial")
const closeModalBtn = document.getElementById("closeModalBtn")

let i = 0
let palavraSelecionada = dicas[i].palavra
let aguardandoProxima = false

function renderWord() {
  aviso.textContent = ''
  tip.innerHTML = dicas[i].dica
  createInputs()
}

function nextWord() {
  aguardandoProxima = false
  if (sendBtn) sendBtn.textContent = 'Enviar'

  if ((i + 1) >= dicas.length) {
    inputBox.innerHTML = ''
    if (sendBtn) sendBtn.style.display = 'none'
    return tip.innerHTML = "Arrasou amor!!!"
  }

  i++
  palavraSelecionada = dicas[i].palavra
  renderWord()
}

function checkWord() {
  // Se já acertou e o botão virou "Próxima pergunta", avança
  if (aguardandoProxima) {
    nextWord()
    return
  }

  const inputs = Array.from(inputBox.getElementsByClassName("box"))
  const answerValue = inputs.map(input => input.value.toLowerCase()).join('')

  if (answerValue.length < palavraSelecionada.length || inputs.some(inp => !inp.value)) {
    aviso.textContent = 'Preencha todas as letras!'
    return
  }

  const targetLetters = palavraSelecionada.toLowerCase().split('')
  const letterCounts = {}

  // Mapeia a frequência das letras da palavra secreta
  targetLetters.forEach(char => {
    letterCounts[char] = (letterCounts[char] || 0) + 1
  })

  const inputStates = new Array(inputs.length).fill('absent')

  // 1ª Passada: Posições exatas (Verde/Rosa)
  inputs.forEach((input, index) => {
    const char = input.value.toLowerCase()
    if (char === targetLetters[index]) {
      inputStates[index] = 'correct'
      letterCounts[char]--
    }
  })

  // 2ª Passada: Posições incorretas (Amarelo)
  inputs.forEach((input, index) => {
    const char = input.value.toLowerCase()
    if (inputStates[index] !== 'correct') {
      if ((letterCounts[char] || 0) > 0) {
        inputStates[index] = 'present'
        letterCounts[char]--
      }
    }
  })

  // Aplica os estilos e bloqueia apenas as letras corretas
  inputs.forEach((input, index) => {
    const state = inputStates[index]
    input.classList.remove('correct', 'present', 'absent')
    input.classList.add(state)

    if (state === 'correct') {
      input.readOnly = true
    }
  })

  // Validação do resultado final
  if (answerValue === palavraSelecionada.toLowerCase()) {
    aviso.textContent = 'Arrasou bebê!!!'
    aguardandoProxima = true
    if (sendBtn) sendBtn.textContent = 'Próximo'
  } else {
    aviso.textContent = 'Tente novamente!'
  }
}

function createInputs() {
  inputBox.innerHTML = ''
  const inputQuant = palavraSelecionada.length

  for (let i2 = 0; i2 < inputQuant; i2++) {
    const element = document.createElement("input")
    element.setAttribute("class", 'box')
    element.setAttribute("maxlength", '1')
    element.style.textTransform = "uppercase"
    element.dataset.index = i2

    if (palavraSelecionada[i2] === '/') {
      element.value = '/'
      element.readOnly = true
      element.classList.add('fixed')
    }

    element.addEventListener("input", () => {
      element.classList.remove('correct', 'present', 'absent')

      if (element.value) {
        let next = element.nextElementSibling
        while (next && next.readOnly) {
          next = next.nextElementSibling
        }
        if (next) next.focus()
      }
    })

    element.addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        checkWord()
        return
      }

      if (e.key === 'Backspace') {
        if (element.readOnly) return

        e.preventDefault()
        element.classList.remove('correct', 'present', 'absent')

        if (element.value) {
          element.value = ''
        } else {
          let prev = element.previousElementSibling
          while (prev && prev.readOnly) {
            prev = prev.previousElementSibling
          }
          if (prev) {
            prev.value = ''
            prev.classList.remove('correct', 'present', 'absent')
            prev.focus()
          }
        }
      }
    })

    inputBox.appendChild(element)
  }

  const firstEditable = inputBox.querySelector("input:not([readonly])")
  if (firstEditable) firstEditable.focus()
}

// Eventos de clique
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    modalTutorial.style.display = "none"
    const firstEditable = inputBox.querySelector("input:not([readonly])")
    if (firstEditable) firstEditable.focus()
  })
}

if (sendBtn) {
  sendBtn.addEventListener("click", checkWord)
}

// Inicializa o jogo
renderWord()