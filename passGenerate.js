import { LightningElement, track } from 'lwc';

export default class PassGenerate extends LightningElement {

    @track length = 8;
    @track useUppercase = false;
    @track useDigit = false;
    @track useSymbol = false;
    @track useLower = true;
    @track password = '';
    @track isCopied = false;
    passGenerated = false;

    @track randFunc = {
        upper: this.getRandUpperCase,
        lower: this.getRandLowerCase,
        digit: this.getRandDigitCase,
        symbol: this.getRandSymbolCase,
    }

    handleSilder(event) {
        this.length = event.target.value;
    }

    handleUppercase() {
        this.useUppercase = !this.useUppercase;
        // console.log('upper:', this.useUppercase);
    }

    handleDigits() {
        this.useDigit = !this.useDigit;
    }

    handleSymbols() {
       this.useSymbol = !this.useSymbol;
    }

    getRandLowerCase() {
        return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
    }

    getRandUpperCase() {
        return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
    }

    getRandDigitCase() {
        return String.fromCharCode(Math.floor(Math.random() * 10 + 48));
    }

    getRandSymbolCase() {
        const symbols = '!@#$%^&*';
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

    generatePassword() {
        
        this.isCopied = false;
        this.password = '';
        if (!this.useUppercase && !this.useDigit && !this.useSymbol) {
            while (this.length > this.password.length) {
                this.password += this.randFunc.lower();
            }
        }

        let typeArr = [{ upper: this.useUppercase }, {lower: this.useLower}, { digit: this.useDigit }, { symbol: this.useSymbol }]
            .filter(
                type => Object.values(type)[0]
        );
        
        while (this.length > this.password.length) {

            //typeArr.forEach(type => {
            
            //picking the random options for genrating the char
            let randIndex = Math.floor(Math.random() * typeArr.length);  //get random index to get KEY -> for the checked options
            let randType = typeArr[randIndex];

            //generating the Random function name 
            let randFuncName = Object.keys(randType)[0];

            this.password += this.randFunc[randFuncName]();
            //})
        }
        this.passGenerated = true;
    }

    handleCopy() {
        this.isCopied = true;
        const textArea = document.createElement('textarea');
        textArea.value = this.password;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
        setTimeout(() => {
            this.isCopied = false;
        }, 1200);
    }

}



// String.fromCharCode()
// lowerCase a - z 97 - 122
// upperCase A - Z 65 - 90
// Math.random geneates between 0-122