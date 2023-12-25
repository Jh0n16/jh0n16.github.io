const $btnCalcular = document.querySelector("#btnCalcular")
$btnCalcular.addEventListener("click", e => {
    const nome = document.querySelector("#nome").value
    const altura = parseFloat(document.querySelector("#altura").value)
    const peso = parseFloat(document.querySelector("#peso").value)

    const resultado = calculoImc(altura, peso)

    const msg = verificacaoImc(resultado)

    const $divResultado = document.querySelector("#resultado")
    return $divResultado.textContent = `Olá ${nome}! ${msg}`


})

function calculoImc(altura, peso) {
    return  (peso / (altura**2)).toFixed(1) // .toFixed(int) -> limita um float até determinada casa decimal
}

function verificacaoImc(valor) {
    let msg

    if (valor >= 40) {
        msg = `Cuidado você precisa ir a um médico urgentemente! Seu IMC é ${valor}, você tem Obesidade grau III.`;

    } else if (valor > 35) {
        msg = `Talvez seja hora de ir visitar um médico. Seu IMC é ${valor}, você tem Obesidade grau II.`;

    } else if (valor > 30) {
        msg = `Sinal de alerta! Seu IMC é ${valor}, você tem Obesidade grau I.`;

    } else if (valor > 25) {
        msg = `Cuide melhor dos seus hábitos. Seu IMC é ${valor}, você está em sobrepeso.`;

    } else if (valor > 18.6) {
        msg = `Tudo certo! Seu IMC é ${valor}, e você está na faixa ideal!`;

    } else if (valor <= 18.5) {
        msg = `Considere uma visita ao médico. Seu IMC é ${valor} e você está abaixo do ideal.`;

    } else {
        msg = "Valor inválido. Verifique os valores digitadoe e tente novamente.";

    }

    return msg
}