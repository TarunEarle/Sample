import { LightningElement, api, wire} from 'lwc';
import getContacttDetails from '@salesforce/apex/retriveDetailsByWrapper.getContacttDetails';
import ACCOUNTFIELD from '@salesforce/schema/Contact.AccountId';
import TYPEFIELD from '@salesforce/schema/Contact.Account.Type';



export default class RetriveAccountByContact extends LightningElement {
    @api recordId;
    accountId;
    contactFields = [ACCOUNTFIELD,TYPEFIELD];
    @wire(getContacttDetails, { accountId: '$recordId'})
    wiredRecord({ error, data }) {
      debugger;
        if(data){
            this.accountId = data.AccountId;

        } else if (error) {

        }

    }
   
   
}