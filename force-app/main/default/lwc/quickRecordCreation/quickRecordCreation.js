import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import LAST_NAME from '@salesforce/schema/Contact.LastName';
import EMAIL from '@salesforce/schema/Contact.Email';
import PHONE from '@salesforce/schema/Contact.Phone';
export default class QuickRecordCreation extends LightningElement {
    @api recordId;
    @api title='Record Creation';
    fieldList = [FIRST_NAME,LAST_NAME,EMAIL,PHONE]; 
    @api fieldsStr;
    @api objectName='Contact';
    connectedCallback(){
        if(this.fieldsStr){
            this.fieldList = this.fieldsStr.split(',');
        }
    }
    handleSuccess(event){
        const evt = new ShowToastEvent({
            title: this.objectName+" Record created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);        
    }
    handleSubmit(event){
        event.preventDefault();
        const fieldsObj = event.detail.fields;
        fieldsObj.AccountId = this.recordId; // modify a field
        this.template.querySelector('lightning-record-form').submit(fieldsObj);
        eval("$A.get('e.force:refreshView').fire();");  
    }

}