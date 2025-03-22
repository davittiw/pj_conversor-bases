document.getElementById("converterButton").addEventListener("click", function() {
    converter();
});

    let numero = document.getElementById("numero").value.trim();
    let baseOrigem = parseInt(document.getElementById("baseOrigem").value);
    let baseDestino = parseInt(document.getElementById("baseDestino").value);
    let resultadoContainer = document.getElementById("resultadoContainer");
    let resultadoElement = document.getElementById("resultado");
    let passosElement = document.getElementById("passos");

    // Se o campo estiver vazio, avisa e não exibe resultado
    if (numero === "") {
        alert("Por favor, insira um número válido.");
        return;
    }

    try {
        let numeroDecimal = parseInt(numero, baseOrigem);
        if (isNaN(numeroDecimal)) throw "Número inválido para a base selecionada.";

        let resultado = numeroDecimal.toString(baseDestino).toUpperCase();
        resultadoElement.textContent = `O número convertido é: ${resultado}`;

        // Exibir passo a passo
        let passos = `Convertendo ${numero} da base ${baseOrigem} para a base ${baseDestino}:\n\n`;

        if (baseOrigem === 2 && baseDestino === 10) {
            // Passo a passo Binário -> Decimal
            let binArray = numero.split("").reverse();
            let soma = 0;
            for (let i = 0; i < binArray.length; i++) {
                let valor = parseInt(binArray[i]) * Math.pow(2, i);
                soma += valor;
                passos += `${binArray[i]} × 2^${i} = ${valor}\n`;
            }
            passos += `Resultado final: ${soma}`;
        } 
        else if (baseOrigem === 10 && baseDestino === 2) {
            // Passo a passo Decimal -> Binário
            let temp = numeroDecimal;
            while (temp > 0) {
                let resto = temp % 2;
                passos += `${temp} ÷ 2 = ${Math.floor(temp / 2)}, resto = ${resto}\n`;
                temp = Math.floor(temp / 2);
            }
            passos += `Resultado final: ${resultado}`;
        }
        else if (baseOrigem === 10 && baseDestino === 16) {
            // Passo a passo Decimal -> Hexadecimal
            let temp = numeroDecimal;
            while (temp > 0) {
                let resto = temp % 16;
                let hexChar = resto.toString(16).toUpperCase();
                passos += `${temp} ÷ 16 = ${Math.floor(temp / 16)}, resto = ${hexChar}\n`;
                temp = Math.floor(temp / 16);
            }
            passos += `Resultado final: ${resultado}`;
        }
        else if (baseOrigem === 16 && baseDestino === 10) {
            // Passo a passo Hexadecimal -> Decimal
            let hexArray = numero.toUpperCase().split("").reverse();
            let soma = 0;
            for (let i = 0; i < hexArray.length; i++) {
                let valor = parseInt(hexArray[i], 16) * Math.pow(16, i);
                soma += valor;
                passos += `${hexArray[i]} × 16^${i} = ${valor}\n`;
            }
            passos += `Resultado final: ${soma}`;
        } else {
            passos = "Conversão direta não implementada.";
        }

        passosElement.textContent = passos;

        // Exibir o resultado
        resultadoContainer.style.display = "block";

    } catch (error) {
        alert(error);
    }
}
