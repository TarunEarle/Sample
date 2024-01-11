import { LightningElement ,api, wire} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Student__c.Name';
import SUBJECT_FIELD from '@salesforce/schema/Student__c.Subjects__c';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import ID_FIELD from '@salesforce/schema/Student__c.Id';
import { getRecord } from 'lightning/uiRecordApi';
const FIELDS = [NAME_FIELD];

export default class QuickCustomUpdateUI extends LightningElement {
    @api recordId;
    student;
    name;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS }) wiredRecord({ error, data }) {
        if(data){
            this.student = data;
            this.name = this.student.fields.Name.value;
        }

    }

    handlenameChange(event){
        this.name = event.target.value;
    }
   
    updateStudent() {
          // Create the recordInput object
          const fields = {};
          fields[ID_FIELD.fieldApiName] = this.recordId;
          fields[NAME_FIELD.fieldApiName] = this.name;
          const recordInput = { fields };
          updateRecord(recordInput)
          .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Student updated',
                    variant: 'success'
                })
            );
            eval("$A.get('e.force:refreshView').fire();");
    })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });  


    }
}