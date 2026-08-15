const dicas = [
  {
    "dica": "O dia que saímos pela primeira vez",
    "palavra": "12/04"
  },
  {
    "dica": "Me apaixonei pela tua",
    "palavra": "alma"
  },
  {
    "dica": "Amo o brilho dos teus",
    "palavra": "olhos"
  },
  {
    "dica": "Nome do amor da minha vida",
    "palavra": "julia"
  },
  {
    "dica": "Eu te amo muito",
    "palavra": "muitao"
  },
  {
    "dica": "O dia que respondi seu story pela primeira vez",
    "palavra": "10/03"
  },
]

const tip = document.getElementById("tip")
const wordInput = document.getElementById("input-palavra")
const aviso = document.getElementById("aviso")

let i = 0

function renderWord(){
  tip.textContent = dicas[i].dica
}

function nextWord(){
  i++
  tip.textContent = dicas[i].dica
}

function checkWord(){
  const word = wordInput.value.trim().toLowerCase()

  if(!word){
    aviso.textContent = "sem palavra"
  } else if(word === dicas[i].palavra){
    aviso.textContent = "palavra correta: " + word
  } else {
    aviso.textContent = "palavra incorreta: " + word + " palavra correta: " + dicas[i].palavra
  }
}