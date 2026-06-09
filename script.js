const operationDisplay = document.getElementById('operation-display');
const resultDisplay = document.getElementById('result-display');
const botoes = document.querySelectorAll('button');

let operationString = "";
let resultShown = false;

function processPercentage(str) {
    return str.replace(/([0-9.]+)%/g, "($1 / 100)");
}

for (let botao of botoes) {
    botao.addEventListener('click', function() {
        let value = botao.textContent;

        if (value === 'C') {
            operationString = "";
            operationDisplay.innerText = "";
            resultDisplay.innerText = "";
            resultShown = false;
            
        } else if (value === 'DEL') {
            if (resultShown) {
                operationString = "";
                operationDisplay.innerText = "";
                resultDisplay.innerText = "";
                resultShown = false;
            } else {
                operationString = operationString.slice(0, -1);
                resultDisplay.innerText = operationString; 
            }
            
        } else if (value === '=') {
            const temOperador = /[\+\-\*\/%]/.test(operationString);
            
            if (operationString.trim() === "" || !temOperador) {
                return; 
            }

            try {
                let processedOperation = processPercentage(operationString);
                let result = eval(processedOperation);
                
                operationDisplay.innerText = operationString; 
                resultDisplay.innerText = result;             
                
                operationString = result.toString();
                resultShown = true;
                
            } catch (erro) {
                resultDisplay.innerText = "Erro";
                operationString = "";
                resultShown = true;
            }
            
        } else {
            if (resultShown) {
                if (value === '+' || value === '-' || value === '*' || value === '/') {
                    operationString += value;
                    resultDisplay.innerText = operationString; // Mostra grande na tela
                    operationDisplay.innerText = "";           // Limpa o topo para a nova fase da conta
                } else if (value === '(' || value === ')' || value === '%') {
                     operationString += value;
                     resultDisplay.innerText = operationString;
                     operationDisplay.innerText = "";
                } else {
                    operationString = value;
                    resultDisplay.innerText = operationString;
                    operationDisplay.innerText = "";
                }
                resultShown = false;
                
            } else {
                operationString += value;
                resultDisplay.innerText = operationString; 
            }
        }
    });
}