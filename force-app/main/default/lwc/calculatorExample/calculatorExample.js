import { LightningElement,api } from 'lwc';

export default class CalculatorExample extends LightningElement {
    @api firstNumber;
    @api secondNumber;
    result;
    @api title;

    handleClick(){
        this.result = parseInt(this.firstNumber) + parseInt(this.secondNumber);

    }
    handleNumberChange(event){
        if(event.target.name=='input1'){
            this.firstNumber = event.target.value;
        }
        if(event.target.name=='input2'){
            this.secondNumber = event.target.value;
        }
    }

    handleFirstNumberChange(event){
        this.firstNumber = event.target.value;
    }
    handleSeondNumberChange(event){
        this.secondNumber = event.target.value;
    }

}