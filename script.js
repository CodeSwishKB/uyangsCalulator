// blueprint of the calculator
class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;

    }

    delete() {
        // convert to string and cut the last inputed digit
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        // stop the dot value to continue to click
        if (number === '.' && this.currentOperand.includes('.')) return

        // to append the clicked number
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }   

    chooseOperation(operation) {
        if (this.currentOperand === '') return // dont run when the user dont put a number

        // if the user enter a number it will execute the code
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation; // the operation that we passed in
        this.previousOperand = this.currentOperand // recycle the previous operand
        this.currentOperand = '' // clear the new current operand
    }

    compute() {
        let computation // the result of compute function
        const prev = parseFloat(this.previousOperand) // number version of previous operand
        const current = parseFloat(this.currentOperand) // number version of current operand

        // if the user dont input a number and click the equals 
        if (isNaN(prev) || isNaN(current)) return

        // swutch statement for each operaion
        switch (this.operation) {
            case '+':
                computation = prev + current
                break;

            case '-':
                computation = prev - current
                break;

            case 'x':
                computation = prev * current
                break;

            case '÷':
                computation = prev / current
                break;

            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString() // split the string in the decimal
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        // const floatNumber = parseFloat(number) // convert to a number 
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        } else { // set a comma
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }

        // user did enter period and has some numbers
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
        // if (isNaN(floatNumber)) return ''
        // return floatNumber.toLocaleString('en') // to have a coma
    }

    updateDisplay() {
        // set the text value at output for currentOperand
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand)

        if (this.operation != null) {
            // set the text value at output for currentOperand
            this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandText.innerText = ''
        }

    }
}


// get all the buttons
const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]")
const previousOperandText = document.querySelector("[data-previous-operand]")
const currentOperandText = document.querySelector("[data-current-operand]")

// create calculator
const calculator = new Calculator(previousOperandText, currentOperandText)

// loop all number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)

        // update the display 
        calculator.updateDisplay()
    })
})

// loop all operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)

        // update the display 
        calculator.updateDisplay()
    })
})

// compute and display when the equal button is clicke
equalsButton.addEventListener("click", button => {
    calculator.compute()
    calculator.updateDisplay()
})

// clear the output 
allClearButton.addEventListener("click", button => {
    calculator.clear()
    calculator.updateDisplay()  

})

// delete the last digit
deleteButton.addEventListener("click", button => {
    calculator.delete()
    calculator.updateDisplay()

}) 
