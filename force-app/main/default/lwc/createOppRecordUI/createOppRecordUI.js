import { LightningElement ,wire} from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import OPP_OBJECT from '@salesforce/schema/Opportunity';
import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';
import DATE_FIELD from '@salesforce/schema/Opportunity.CloseDate';
export default class CreateOppRecordUI extends LightningElement {
    oppId;
    name;
    date;
    stage;
    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: STAGE_FIELD 
    }) stageValues;
    handleNameChange(event) {       
        this.name = event.target.value;
    }
    handleoppChange(event){
        this.date = event.target.value;
    }
    handleStageChange(event){
        this.stage = event.target.value;
    }
    createOpportunity() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.name;
        fields[DATE_FIELD.fieldApiName] = this.date;
        fields[STAGE_FIELD.fieldApiName] = this.stage;
        const recordInput =  { apiName: OPP_OBJECT.objectApiName, fields };
        createRecord(recordInput)
        .then(opportunity => {
            this.oppId = opportunity.id;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Opportunity created',
                    variant: 'success',
                }),
            );
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error',
                }),
            );
        });
    }
}