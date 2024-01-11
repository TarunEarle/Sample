import { LightningElement, api, wire } from 'lwc';
import getRelatedFilesByRecordId from '@salesforce/apex/filePreviewAndDownloadController.getRelatedFilesByRecordId';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';
export default class FilePreviewAndDownloads extends NavigationMixin(LightningElement) {
    @api recordId;
    title;
    filesList = []
    some = [];
    @wire(getRelatedFilesByRecordId, { recordId: '$recordId' })
    wiredResult({ data, error }) {
        if (data) {
            console.log('Full Data-->' + JSON.stringify(data));
            this.filesList = Object.keys(data).map(item => ({
                "label": data[item],
                "value": item,
            }))
           this.title = 'Files'+' ('+this.filesList.length+')';
           refreshApex(this.filesList);
        }
    }
    previewHandler(event) {
        console.log(event.target.dataset.id)
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'filePreview'
            },
            state: {
                selectedRecordId: event.target.dataset.id
            }
        })
    }
}