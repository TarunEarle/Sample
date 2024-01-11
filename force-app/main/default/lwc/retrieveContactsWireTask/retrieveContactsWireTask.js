import { LightningElement,wire,track} from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContactList';
export default class RetrieveContactsWireTask extends LightningElement {
    @track contacts=[];
    errormessage;
        @wire(getContacts) retrieveContacts({error,data}){
        if(data){
            for(let i=2; i<data.length; i++){
                console.log(data[i]);
                //return this.contacts[i].Name;
                this.contacts.push({value:data[i].Name,key:i});
            }
            this.errormessage = undefined;
        }
        else if(error){
            this.contacts = undefined;
            this.errormessage = error;
        }
    }
}