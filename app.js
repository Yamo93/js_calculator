/**
 * Blog stop: 'consecutive calculations done' (99 - 1 - 1 -1 = 96)
 */

const strings = {
    displayPad: document.querySelector('.calculator__display-num'),
    calcPad: document.querySelector('.calculator__pad'),
    divideBtn: document.querySelector(".calculator__pad-divide"),
    multiplyBtn: document.querySelector(".calculator__pad-multiply"),
    subtractBtn: document.querySelector(".calculator__pad-subtract"),
    addBtn: document.querySelector(".calculator__pad-add"),
    equalBtn: document.querySelector(".calculator__pad-equal"),
    decimalBtn: document.querySelector(".calculator__pad-decimal")
};




strings.calcPad.addEventListener('click', (e) => {
    if (e.target.matches('.calculator__pad, .calculator__pad *')) {

        function calculate(n1, operator, n2) {
            let result = '';

            if (operator === 'add') {
                result = parseFloat(n1) + parseFloat(n2);
            } else if (operator === 'subtract') {
                result = parseFloat(n1) - parseFloat(n2);
            } else if (operator === 'multiply') {
                result = parseFloat(n1) * parseFloat(n2);
            } else if (operator === 'divide') {
                result = parseFloat(n1) / parseFloat(n2);
            }

            return result;
        }


        // Do something
        const key = e.target;
        const action = key.dataset.operator;
        const keyContent = key.textContent;
        const displayedNum = strings.displayPad.textContent;
        const previousKeyType = strings.calcPad.dataset.previousKeyType;
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('pressed'));

        //Review this part of the code
        if (!action) {
            strings.calcPad.dataset.previousKeyType = 'number';
            console.log('number key');
            if (displayedNum === '0') {
                strings.displayPad.textContent = keyContent;
            } else if (previousKeyType === 'operator') {
                let newDisplayedNum = keyContent;
                strings.displayPad.textContent += newDisplayedNum;
            }
            else {
                strings.displayPad.textContent = displayedNum + keyContent;
            }
        }

        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                strings.displayPad.textContent = displayedNum + '.';
            } else if (previousKeyType === 'operator') {
                strings.displayPad.textContent = '0.';
            }
            strings.calcPad.dataset.previousKeyType = 'decimal';
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            const firstValue = strings.calcPad.dataset.firstValue;
            const operator = strings.calcPad.dataset.operator;
            const secondValue = displayedNum;

            
            if (firstValue && operator && previousKeyType !== 'operator') {
                const calcValue = calculate(firstValue, operator, secondValue);
                strings.displayPad.textContent = calcValue;
                console.log('calcvalue calculated');

                strings.calcPad.dataset.firstValue = calcValue;
            } else {
                strings.calcPad.dataset.firstValue = displayedNum;
            }

            key.classList.add('pressed');
            strings.calcPad.dataset.previousKeyType = 'operator';
            strings.calcPad.dataset.firstValue = displayedNum;
            strings.calcPad.dataset.operator = action;
            strings.displayPad.textContent = '';

        } else if (action === 'clear') {
            strings.calcPad.dataset.previousKeyType = 'clear';
            console.log('clear key!');
        } else if (action === 'equal') {
            strings.calcPad.dataset.previousKeyType = 'equal';
            const firstValue = strings.calcPad.dataset.firstValue;
            const operator = strings.calcPad.dataset.operator;
            const secondValue = displayedNum;
            console.log('equal key!');
            console.log(`DisplayedNum: ${displayedNum}`)


            strings.displayPad.textContent = calculate(firstValue, operator, secondValue);


        }
    }
})


