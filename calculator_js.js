let display = '';
let result = '';
let angleMode = 'DEG'; // DEG or RAD
let lastOperation = '';

function updateDisplay() {
    const mainDisplay = document.getElementById('main-display');
    const secondaryDisplay = document.getElementById('secondary-display');
    
    mainDisplay.textContent = display || '0';
    secondaryDisplay.textContent = lastOperation;
}

function updateModeDisplay() {
    document.getElementById('mode-display').textContent = angleMode;
}

function inputNumber(num) {
    if (display === '0' || display === 'Error') {
        display = num;
    } else {
        display += num;
    }
    updateDisplay();
}

function inputOperator(op) {
    if (display === '' || display === 'Error') return;
    
    if (op === '**') {
        display += '^2';
    } else {
        display += op;
    }
    updateDisplay();
}

function inputFunction(func) {
    if (display === 'Error') display = '';
    display += func;
    updateDisplay();
}

function inputConstant(constant) {
    if (display === '0' || display === 'Error') {
        display = constant;
    } else {
        display += constant;
    }
    updateDisplay();
}

function clearAll() {
    display = '';
    result = '';
    lastOperation = '';
    updateDisplay();
}

function deleteLast() {
    if (display.length > 0) {
        display = display.slice(0, -1);
    }
    updateDisplay();
}

function toggleMode() {
    angleMode = angleMode === 'DEG' ? 'RAD' : 'DEG';
    updateModeDisplay();
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function toDegrees(radians) {
    return radians * (180 / Math.PI);
}

function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function evaluate(expression) {
    try {
        // Replace constants
        expression = expression.replace(/π/g, Math.PI);
        expression = expression.replace(/e/g, Math.E);
        
        // Handle factorial
        expression = expression.replace(/(\d+)!/g, (match, n) => {
            return factorial(parseInt(n));
        });
        
        // Handle trigonometric functions
        expression = expression.replace(/sin\(([^)]+)\)/g, (match, angle) => {
            const val = eval(angle);
            return Math.sin(angleMode === 'DEG' ? toRadians(val) : val);
        });
        
        expression = expression.replace(/cos\(([^)]+)\)/g, (match, angle) => {
            const val = eval(angle);
            return Math.cos(angleMode === 'DEG' ? toRadians(val) : val);
        });
        
        expression = expression.replace(/tan\(([^)]+)\)/g, (match, angle) => {
            const val = eval(angle);
            return Math.tan(angleMode === 'DEG' ? toRadians(val) : val);
        });
        
        // Handle logarithms
        expression = expression.replace(/log\(([^)]+)\)/g, (match, n) => {
            return Math.log10(eval(n));
        });
        
        expression = expression.replace(/ln\(([^)]+)\)/g, (match, n) => {
            return Math.log(eval(n));
        });
        
        // Handle square root
        expression = expression.replace(/sqrt\(([^)]+)\)/g, (match, n) => {
            return Math.sqrt(eval(n));
        });
        
        // Handle absolute value
        expression = expression.replace(/abs\(([^)]+)\)/g, (match, n) => {
            return Math.abs(eval(n));
        });
        
        // Handle power operations
        expression = expression.replace(/([^*])\^([^*])/g, '$1**$2');
        expression = expression.replace(/\^2/g, '**2');
        
        // Replace × with *
        expression = expression.replace(/×/g, '*');
        
        const result = eval(expression);
        return isFinite(result) ? result : 'Error';
    } catch (e) {
        return 'Error';
    }
}

function calculate() {
    if (display === '' || display === 'Error') return;
    
    lastOperation = display;
    const result = evaluate(display);
    
    if (result === 'Error') {
        display = 'Error';
    } else {
        display = result.toString();
        if (display.length > 12) {
            display = parseFloat(result).toExponential(6);
        }
    }
    
    updateDisplay();
}

// Initialize display
updateDisplay();
updateModeDisplay();