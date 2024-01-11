import { LightningElement, track, wire ,api} from 'lwc';
// importing apex class methods
import getContacts from '@salesforce/apex/ContactController.getDataFromContact';
// importing to show toast notifictions
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import STATUS_FIELD from '@salesforce/schema/Case.Status';
import ORIGIN_FIELD from '@salesforce/schema/Case.Origin';
import PRIORITY_FIELD from '@salesforce/schema/Case.Priority';
import SUBJECT_FIELD from '@salesforce/schema/Case.Subject';
import DESCRIPTION_FIELD from '@salesforce/schema/Case.Description';
import { NavigationMixin } from 'lightning/navigation';
// importing to refresh the apex if any record changes the datas
import { refreshApex } from '@salesforce/apex';
// datatable columns with row actions
const columns = [
    { label: 'FirstName', fieldName: 'FirstName' },
    { label: 'LastName', fieldName: 'LastName' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    {
        type: "button", typeAttributes: {
            label: 'New Case',
            name: 'edit',
            title: 'Edit',
            disabled: false,
            value: 'edit',
            iconPosition: 'left'
        }
    }
];
export default class CaseCreationInDataTable extends NavigationMixin(LightningElement) {
    fieldList = [STATUS_FIELD,ORIGIN_FIELD,PRIORITY_FIELD,SUBJECT_FIELD,DESCRIPTION_FIELD];
    // reactive variable
    @track data;
    @track columns = columns;
    @track record = [];
    @track bShowModal = false;
    @track currentRecordId;
    @track isEditForm = false;
    @track showLoadingSpinner = false;
    @api recordId;
    // non-reactive variables
    selectedRecords = [];
    refreshTable;
    error;
    // retrieving the data using wire service
    @wire(getContacts)
    contacts(result) {
        this.refreshTable = result;
        if (result.data) {
            this.data = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }
    handleRowActions(event) {
        let actionName = event.detail.action.name;
        window.console.log('actionName ====> ' + actionName);
        let row = event.detail.row;
        window.console.log('row ====> ' + row);
        // eslint-disable-next-line default-case
        switch (actionName) {
            case 'edit':
                this.editCurrentRecord(row);
                break;
        }
    }
    // closing modal box
    closeModal() {
        this.bShowModal = false;
    }
    editCurrentRecord(currentRow) {
        // open modal box
        this.bShowModal = true;
        this.isEditForm = true;
        // assign record id to the record edit form
        this.currentRecordId = currentRow.Id;
    }
    // handleing record edit form submit
   /* handleSubmit(event) {
        // prevending default type sumbit of record edit form
        event.preventDefault();
        // querying the record edit form and submiting fields to form
        this.template.querySelector('lightning-record-form').submit(event.detail.fields);
        // closing modal
        this.bShowModal = false;
        // showing success message
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success!!',
            message: ' Case created Successfully!!.',
            variant: 'success'
        }),);
    }*/
    // refreshing the datatable after record  form success
    handleSuccess(event){
        const evt = new ShowToastEvent({
            title: "Case created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'Case',
                actionName: 'view'
            },
        });
    }
}