import { LightningElement, api, wire } from 'lwc';
import fetchFiles from '@salesforce/apex/fileTabular.getFetchFiles';
import createFileAuditRecord from '@salesforce/apex/fileTabular.getRecToSave';
import downloadFileAuditRecord from '@salesforce/apex/fileTabular.downloadFileAuditRecord';

import { NavigationMixin } from 'lightning/navigation';

export default class FileAudit extends NavigationMixin(LightningElement) {
    @api accountId;
    lstAllFiles;
    error;
    acceptedFormats = ['.pdf', '.png', '.jpg', '.jpeg']; // Specify allowed file formats

    // @wire(user)
    // userI({ error, data }) {
    //     if (data) {
    //         alert('Data entry'+JSON.stringify(data));
    //         this.accId = data;
    //     }
    //     else{
    //         alert('Error--'+error.body.message);
    //     }
    // }

    connectedCallback() {
        fetchFiles({ recordId: this.accountId })
            .then(result => {
                this.lstAllFiles = result;
                this.error = undefined;
            }).catch(error => {
                this.lstAllFiles = undefined;
                this.error = error;
            })
    }
    handleUploadFinished(event) {
        createFileAuditRecord({ accountId: this.accountId })
            .then(result => {
                alert(result); // Show success message
            })
            .catch(error => {
                console.error(error); // Log any errors
                alert('Error: ' + error.body.message); // Show the error message in an alert
            });
    }

    handleClick(event) {
        const contentDocumentId = event.target.dataset.id;
        downloadFileAuditRecord({ contentDocumentId, actId: this.accountId })
            .then(result => {
                //alert(result); // Show success message
            })
            .catch(error => {
                console.error(error); // Log any errors
                alert('Error: ' + error.body.message); // Show the error message in an alert
            });

        // Perform the download action
        this[NavigationMixin.Navigate]({
            "type": "standard__webPage",
            "attributes": {
                "url": `/sfc/servlet.shepherd/document/download/${contentDocumentId}`
            }
        });
    }


    previewHandler(event) {
        const selectedId = event.target.dataset.id;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: selectedId,
                objectApiName: 'ContentDocument',
                actionName: 'view'
            }
        });
        /*this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'filePreview'
            },
            state: {
                selectedRecordId: event.target.dataset.id
            }
        })*/
    }

}