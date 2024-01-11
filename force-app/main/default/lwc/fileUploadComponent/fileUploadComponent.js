// fileUploadComponent.js
import { LightningElement, api, track } from 'lwc';
import uploadFiles from '@salesforce/apex/FileUploadController.getUploadFiles';

export default class FileUploadComponent extends LightningElement {
    @api recordId; // Pass record Id if needed
    acceptedFormats = ['.pdf', '.png', '.jpg', '.jpeg']; // Specify allowed file formats
    @track fileRecords;

    handleUploadFinished(event) {
        // Call Apex method to handle file upload and retrieve file records
        uploadFiles({ parentId: this.recordId, contentDocumentIds: event.detail.files })
            .then(result => {
                alert(result);
                this.fileRecords = result;
                console.log('data  =' + result);
            })
            .catch(error => {
                // Handle errors
            });
    }
}