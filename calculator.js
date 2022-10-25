console.log("calculator.js loaded");
const display = document.querySelector('.display');
console.log("display = " + display);
display.textContent="0";

let operator="none";
let numArray = ["",""];
let numIndex = 0; // 0 for num1, 1 for num2


function buttonPressed(e) {
    //console.log("in buttonPressed");
    //console.log(e.target);
    const key = e.target.id;
    //console.log(key);
    /*  state-machine
        cancel - clear and reset
        equals - evaluate calculation and send answer to num1
        operand - store num1 + operator, start building num2
        zero,[1..9], decimal, sign - build num1 if calculation hasn't started, build num2 if calculation exists
    */
    switch (key) {
        case 'equals':
            console.log('calculate');
            if(operator == "none" || numArray[1].length == 0) break; // ignore, not ready to calculate  
            let result = calculate(numArray,operator);
            console.log(result);
            operator=null;
            numArray[0] = "";
            numArray[1] = "";
            numIndex = 0;
            break;
        case 'divide': case 'multiply': case 'subtract': case 'add':
            console.log('operator key: '+key);
            if(numArray[0].length == 0) break; // ignore, first number not entered yet
            operator = key;
            numIndex = 1;
            break;            
        case 'zero': case '1': case'2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
            buildNumber(key, numIndex);
            console.log(numArray[numIndex]);
            break;
        case 'sign':
            // not yet implemented
            console.log('switch sign for current number');
            break;
        case 'decimal':
            // not yet implemented
            console.log('add a decimal');
            break;
        case 'backspace':
            // not yet implemented
            console.log('delete last digit');
            break;
        case 'cancel':
            // not yet implemented
            console.log('cancel');
        default:
            console.log('default case reached');
            break;
    }
    

}


function buildNumber(digit, numIndex) {
    if(digit === 'zero') {
        if(numArray[numIndex].length == 0) return; // do nothing
        numArray[numIndex] += '0';
    } else {
        numArray[numIndex] += digit;  
    }
    // refresh display
    display.textContent=numArray[numIndex];
    return;
}

function calculate(numArray, operator) {
    if (operator == "none") return;

    console.log(numArray[0] + operator + numArray[1]);
    let num1 = Number(numArray[0]);
    let num2 = Number(numArray[1]);
    let result = 0;
    switch (operator) {
        case 'add': 
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            result = num1 / num2;
            break;
        default:
            break;
    }
    
    // refresh display
    display.textContent = result.toString();
    return result;
}

const buttons = Array.from(document.querySelectorAll("button"));
//console.log(buttons);

buttons.forEach(button => button.addEventListener('click',buttonPressed));




