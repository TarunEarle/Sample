import { LightningElement,api } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import { CloseActionScreenEvent } from 'lightning/actions';
export default class DeleteRecordUI extends NavigationMixin(LightningElement) {
        @api objectApiName;
        error;
        @api set recordId(value) {
            this._recordId = value;
            this.handleDelete();
        }
        get recordId() {
            return this._recordId;
        }
        handleDelete(event) {
            deleteRecord(this.recordId)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record deleted',
                        variant: 'success'
                    })
                );
                this[NavigationMixin.Navigate]({
                    type: 'standard__objectPage',
                    attributes: {
                        objectApiName: 'Contact',
                        actionName: 'home',
                    },
                });
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
        }
        closeQuickAction() {
            this.dispatchEvent(new CloseActionScreenEvent());
        }
}