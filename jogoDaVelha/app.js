const listaCelulas = document.querySelectorAll("[data-celula]")
const tabuleiro = document.querySelector("[data-tabuleiro]")
const mensagem = document.querySelector("[data-mensagem]")
const msgFinal = document.querySelector("[data-msgFinal]")
const btnReiniciar = document.querySelector("[data-btnReiniciar]")

const condicaoVitoria = [
    // vitoria por linha
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    
    // vitoria por coluna
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // vitoria por diagonal
    [0, 4, 8],
    [2, 4, 6]
    
]

var turnoCirculo

function IniciarJogo() {
    for(const celula of listaCelulas) {
        celula.classList.remove('o')
        celula.classList.remove('x')

        celula.addEventListener('click', cliqueJogada, { once: true })
    }

    const jogador = SortearJogador()

    if(jogador === 'x') {
        turnoCirculo = false
        tabuleiro.classList.add(jogador)

    } else {
        turnoCirculo = true
        tabuleiro.classList.add(jogador)
    }

    mensagem.classList.remove("gameOver")
}

function GameOver(empate) {
    if(empate)
        msgFinal.textContent = "Empate!"
    else
        msgFinal.textContent = turnoCirculo ? 'O Venceu!' : 'X Venceu!'
    
    mensagem.classList.add('gameOver')
}

function ChegarEmpate() {
    return [...listaCelulas].every(celula => {
        return celula.classList.contains('o') || celula.classList.contains('x')
    })
}

function Vitoria(jogadorAtual) {
    return condicaoVitoria.some(combinacao => {
        return combinacao.every( index => {
            return listaCelulas[index].classList.contains(jogadorAtual)

        })
    })
}

function Jogada(celula, jogadorAtual) {
    celula.classList.add(jogadorAtual)

}

function Turno() {
    turnoCirculo = !turnoCirculo

    tabuleiro.classList.remove('o')
    tabuleiro.classList.remove('x')

    if(turnoCirculo)
        tabuleiro.classList.add('o')
    else
        tabuleiro.classList.add('x')

}

function SortearJogador() {
    const n = Math.floor(Math.random() * 2)

    return n === 1 ? 'x' : 'o'
}   

const cliqueJogada = e => {
    // coloca X ou O
    const celula = e.target
    const jogadorAtual = turnoCirculo ? 'o'  : 'x'

    Jogada(celula, jogadorAtual)

    // verifica se algum jogador venceu ou se é um empate
    const empate = ChegarEmpate()
    const ganhador = Vitoria(jogadorAtual)
    if(ganhador){
        GameOver(false)

    } else if(empate){
        GameOver(true)

    } else {
        // caso nenhuma condição seja atendida, muda o turno
        Turno()
    }

}

IniciarJogo()

btnReiniciar.addEventListener("click", e => {
    IniciarJogo()
})