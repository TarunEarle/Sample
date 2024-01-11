import { LightningElement,api,wire } from 'lwc';
import Retrieve_Account from '@salesforce/apex/retriveDetailsByWrapper.getAccountDetails';
import retrieveWraperRec from '@salesforce/apex/retriveDetailsByWrapper.getWrapperRecord';

export default class RetrieveRecords extends LightningElement {
    @api recordId;
    accountRecord;
    wrapperRecord;
    @wire(Retrieve_Account,{actRecId:'$recordId'}) accountRec({error,data}){
        console.log('---->'+JSON.stringify(data));
        this.accountRecord = data;       
    }
    @wire(retrieveWraperRec,{actRecordId:'$recordId'}) wrapperRec({error,data}){
        console.log('---->'+JSON.stringify(data));
        this.wrapperRecord = data;       
    }
}