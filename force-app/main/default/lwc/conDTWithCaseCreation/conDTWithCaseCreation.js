import { LightningElement, api, wire, track } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import conDetail from '@salesforce/apex/ContactController.getContactList';
import createCase from '@salesforce/apex/ContactController.createCase';
import STATUS from '@salesforce/schema/Case.Status';
import CASE_ORIGIN from '@salesforce/schema/Case.Origin';
import PRIORITY from '@salesforce/schema/Case.Priority';
import SUBJECT from '@salesforce/schema/Case.Subject';
import DESCRIPTION from '@salesforce/schema/Case.Description';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
const columns = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    {
        type: "button", typeAttributes: {
            label: 'New Case',
            name: 'New',
            title: 'Case Creation',
            variant: 'brand',
            disabled: false,
            value: 'New',
            iconPosition: 'left'
        }
    }

];
export default class ConDTWithCaseCreation extends NavigationMixin(LightningElement) {
    error;
    columns = columns;
    @wire(conDetail) contacts;
    selectedStatusType;
    selectedPriorityType;
    selectedOriginType;
    @track caseRecord = {
        [STATUS.fieldApiName]: '',
        [CASE_ORIGIN.fieldApiName]: '',
        [PRIORITY.fieldApiName]: '',
        [SUBJECT.fieldApiName]: '',
        [DESCRIPTION.fieldApiName]: ''
    }
    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: STATUS
    }) statusValues;
    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: CASE_ORIGIN
    }) originValues;
    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: PRIORITY
    }) priorityValues;

    /*hadle selected type for Account Type Field*/
    handleStatusChange(event) {
        this.selectedStatusType = event.target.value;
    }
    handlePriorityChange(event) {
        this.selectedPriorityType = event.target.value;
    }
    handleOriginChange(event) {
        this.selectedOriginType = event.target.value;
    }
    handleStatusChange(event) {
        this.caseRecord[STATUS.fieldApiName] = event.target.value;
    }
    handlePriorityChange(event) {
        this.caseRecord[PRIORITY.fieldApiName] = event.target.value;
    }
    handleOriginChange(event) {
        this.caseRecord[CASE_ORIGIN.fieldApiName] = event.target.value;
    }
    handleSubjectChange(event) {
        this.caseRecord[SUBJECT.fieldApiName] = event.target.value;
    }
    handleDescriptionChange(event) {
        this.caseRecord[DESCRIPTION.fieldApiName] = event.target.value;
    }

    handleChange(event) {
        if (event.target.name == 'caseStatus') {
            this.caseRecord[STATUS.fieldApiName] = event.target.value;
        }
        else if (event.target.name == 'casePrior') {
            this.caseRecord[PRIORITY.fieldApiName] = event.target.value;
        }
        else if (event.target.name == 'caseOrigin') {
            this.caseRecord[CASE_ORIGIN.fieldApiName] = event.target.value;
        }
        else if (event.target.name == 'caseSub') {
            this.caseRecord[SUBJECT.fieldApiName] = event.target.value;
        }
        else if (event.target.name == 'caseDes') {
            this.caseRecord[DESCRIPTION.fieldApiName] = event.target.value;
        }
        console.log('caseRecord:::' + JSON.stringify(this.caseRecord));
    }

    createCaseRecord() {
        console.log('caseRecord:::' + this.caseRecord);
        console.log('caseRecord:::' + JSON.stringify(this.caseRecord));
        createCase({ caseRec: this.caseRecord })
            .then(result => {
                this.caseRecord = {};
                const toastEvent = new ShowToastEvent({
                    title: 'Success!',
                    message: 'Case Created Successfully!!',
                    variant: 'success'
                });
                this.dispatchEvent(toastEvent);
            })
            .catch(error => {
                this.error = error.message;
            });

    }
    handlesClick(event) {
        const row = event.detail.row;
        console.log(JSON.stringify(row));
    }
}