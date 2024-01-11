import { LightningElement,wire,api} from 'lwc';
import getDataFromContact from '@salesforce/apex/ContactController.getDataFromContact';

export default class RetrieveContactsByWireApex extends LightningElement {
   /* @wire(getContacts) contactslist;*/
    contactrecords; 
    @api recordId;
    error;
    @wire(getDataFromContact,{recordId: '$recordId'}) contactsFunction({error,data}){
        if(data){
            this.contactrecords = data;
            console.log('Hlo this--->'+JSON.stringify(data))
            this.error = undefined;
        }
        else if(error){
            this.error = error;
            this.contactrecords = undefined;
        }
    }


}