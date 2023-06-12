// Pega todas as operações e núemeros
const $btNumeros = document.querySelectorAll("[data-num]")
const $btOperacoes = document.querySelectorAll("[data-op]")

const $btResultado = document.querySelector("[data-resultado]")
const $btLimpa = document.querySelector("[data-limpa]")
const $btExcluir = document.querySelector("[data-excluir]")

const opAtualText = document.querySelector("[data-op-atual]")
const opAnteriorText = document.querySelector("[data-op-anterior]")


class Calculadora {
    // Nesse momento estamos instanciando a classe
    constructor(opAtualText, opAnteriorText) {
        this.opAtualText = opAtualText
        this.opAnteriorText = opAnteriorText
        // É importante chamar o método limpar() ao instanciarmos
        this.limpar()
    }

    calculo() {
        let resultado

        const floatOpAnterior = parseFloat(this.opAnterior)
        const floatOpAtual = parseFloat(this.opAtual)

        if(isNaN((floatOpAnterior)) || isNaN(floatOpAtual)) return


        switch (this.operador) {
            // Aqui utilizamos o formato unicode para definir todos os casos
            case '\u002b':
                resultado = floatOpAnterior + floatOpAtual
                break

            case '\u2212':
                resultado = floatOpAnterior - floatOpAtual
                break
            
            case '\u2a2f':
                resultado = floatOpAnterior * floatOpAtual
                break

            case '\u00f7':
                resultado = floatOpAnterior / floatOpAtual
                break
        
            default:
                return
        }

        this.opAtual = resultado
        this.opAnterior = ''
        this.operador = undefined
    }

    // Esse metodo é o responsável por limpar as operações feitas
    limpar() {
        this.opAtual = ""
        this.opAnterior = ""
        this.operador = undefined
    }
    
    // Esse metodo define a operação a ser feita
    operacao(operador) {
        if(this.opAtual === '') return
        if(this.opAnterior !== ''){
            this.calculo()
        }

        this.operador = operador

        this.opAnterior = this.opAtual
        this.opAtual = ""
    }

    excluir() {
        this.opAtual = this.opAtual.toString().slice(0, -1)
    }
    
    formataNum(numero) {
        const strNum = numero.toString()

        const digitoInteiro = parseFloat(strNum.split('.')[0])
        const digitoDecimal = strNum.split('.')[1]

        let digitoDisplay

        if (isNaN(digitoInteiro)) {
            digitoDisplay = ''
        } else {
            digitoDisplay = digitoInteiro.toLocaleString("en", {
                maximumFractionDigits: 0,
            })
        }

        if(digitoDecimal != null) return `${digitoDisplay}.${digitoDecimal}`
        else return digitoDisplay

    }

    // Esse é o método responsável por adicionar um número ao final
    addNumero(number) {
        // Para evitar que possamos colocar diversos pontos, fazemos esse if
        if(this.opAtual.includes(".") && number === ".") return

        this.opAtual = `${this.opAtual}${number.toString()}`
    }

    // Esse metodo é responsavel por atualizar o display
    atualizaTela() {
        this.opAnteriorText.innerText = `${this.formataNum(this.opAnterior)} ${this.operador || ''}`
        this.opAtualText.innerText = this.formataNum(this.opAtual)
    }
}

// Esse for está percorrendo todoe elementos que possuem o atributo 'data-num'
for(const $btNumero of $btNumeros) {
    $btNumero.addEventListener('click', () => {
        // Estamos instanciando 'calculadora.addNumero()' com o número que está no innerText do botão clicado
        calculadora.addNumero($btNumero.innerText)
        calculadora.atualizaTela()
    })
}

for(const $btOperacao of $btOperacoes) {
    $btOperacao.addEventListener('click', () => {
        calculadora.operacao($btOperacao.innerText)
        calculadora.atualizaTela()
    })
}

const calculadora = new Calculadora(opAtualText, opAnteriorText)

$btLimpa.addEventListener('click', () => {
    calculadora.limpar()
    calculadora.atualizaTela()
})

$btResultado.addEventListener('click', () => {
    calculadora.calculo()
    calculadora.atualizaTela()
})

$btExcluir.addEventListener('click', () => {
    calculadora.excluir()
    calculadora.atualizaTela()
})