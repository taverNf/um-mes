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
  },
]

const tip = document.getElementById("tip")
const inputBox = document.getElementById("inputBox")
const wordInput = document.getElementById("inputPalavra")
const aviso = document.getElementById("aviso")

let i = 0
let palavraSelecionada = dicas[i].palavra

function renderWord(){
  tip.innerHTML = dicas[i].dica
  createInputs()
}

function nextWord(){
    if((i+1) >= dicas.length){
      return tip.innerHTML = "Arrasou amor!!!"
    }
  
    i++
    tip.innerHTML = dicas[i].dica
}

function checkWord(){
  /*
    junta os valores dos inputs em uma única string e faz a compraração
  */


  const word = wordInput.value.trim().toLowerCase()

  if(!word){
    aviso.textContent = "Digite a resposta"
  }

  else if(word === palavraSelecionada){
    alert(`Resposta certa!! (Rodada ${i+1} de ${dicas.length})`)
    wordInput.value = ''
    nextWord()
  }
  
  else {
    aviso.textContent = "palavra incorreta: " + word + " palavra correta: " + palavraSelecionada
  }
}

function createInputs(){
  /*
    pega a var [palavraSelecionada], reconhece a [.length], gera o número ideal de inputs
    com o id correspondente a letra do [.length], cria uma var para armazenar o valor esperado de cada input
  */

  let inputQuant = palavraSelecionada.length

  for (let i2 = 0; i2 < inputQuant; i2++) {
    const element = document.createElement("input")
    element.setAttribute("id", palavraSelecionada[i2])
    element.setAttribute("class", "box")
    element.setAttribute("maxlength", "1")
    inputBox.appendChild(element)


    // console.log(element.getAttribute("id"))
  }
}