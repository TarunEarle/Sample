import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getContacttDetails from '@salesforce/apex/retriveDetailsByWrapper.getContacttDetails';

export default class NavigationAccount extends NavigationMixin(LightningElement) {
    accountId;
    handleClick() {
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.accountId,
                objectApiName: 'Account',
                actionName: 'view',
            },
        }).then(url => this.url = url);
    }
}