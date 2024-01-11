import { LightningElement,wire } from 'lwc';
import getOpportunityListJan from '@salesforce/apex/opportunityRecordsCls.getOpportunityListJan';
import getOpportunityListFeb from '@salesforce/apex/opportunityRecordsCls.getOpportunityListFeb';
import getOpportunityListMar from '@salesforce/apex/opportunityRecordsCls.getOpportunityListMar';
import getOpportunityListApril from '@salesforce/apex/opportunityRecordsCls.getOpportunityListApril';
import getOpportunityListMay from '@salesforce/apex/opportunityRecordsCls.getOpportunityListMay';
import getOpportunityListJune from '@salesforce/apex/opportunityRecordsCls.getOpportunityListJune';
import getOpportunityListJuly from '@salesforce/apex/opportunityRecordsCls.getOpportunityListJuly';
import getOpportunityListAug from '@salesforce/apex/opportunityRecordsCls.getOpportunityListAug';
import getOpportunityListSep from '@salesforce/apex/opportunityRecordsCls.getOpportunityListSep';
import getOpportunityListOct from '@salesforce/apex/opportunityRecordsCls.getOpportunityListOct';
import getOpportunityListNov from '@salesforce/apex/opportunityRecordsCls.getOpportunityListNov';
import getOpportunityListDec from '@salesforce/apex/opportunityRecordsCls.getOpportunityListDec';
import { NavigationMixin } from 'lightning/navigation';
export default class OpportunityColumnComp extends NavigationMixin(LightningElement) {
    oppListJan=[];
    oppListFeb=[];
    oppListJMar=[];
    oppListApr=[];
    oppListMay=[];
    oppListJun=[];
    oppListJuly=[];
    oppListAug=[];
    oppListSep=[];
    oppListOct=[];
    oppListNov=[];
    oppListDec=[];
    handleRecordsLoadJan() {
        getOpportunityListJan()
            .then(result => {
                this.oppListJan = result;
                console.log('Return  result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppListJan = undefined;
            });
    }
    handleRecordsLoadFeb() {
        getOpportunityListFeb()
            .then(result => {
                this.oppListFeb = result;
                console.log('Return  result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppListFeb = undefined;
            });
    }
    handleRecordsLoaadMar() {
        getOpportunityListMar()
            .then(result => {
                this.oppListJMar = result;
                console.log('Return  result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppListJMar = undefined;
            });
    }
    handleRecordsLoadApr() {
        getOpportunityListApril()
            .then(result => {
              //  alert('Hello2');
                this.oppListApr = result;
                console.log('Return  result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppListApr = undefined;
            });
    }
    handleRecordsLoadMay() {
       getOpportunityListMay()
            .then(result => {
              //  alert('Hello2');
                this.oppListMay = result;
                console.log('Return  result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppListMay = undefined;
            });
    }
    handleRecordsLoadJun() {
        getOpportunityListJune()
            .then(result => {
              //  alert('Hello2');
                this.oppListJun = result;
                console.log('Return  result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppListJun = undefined;
            });
    }
    handleRecordsLoadJuly() {
        getOpportunityListJuly()
            .then(result => {
               // alert('Hello2');
                this.oppListJuly = result;
                console.log('Return  result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppListJuly = undefined;
            });
    }
    handleRecordsLoadAug() {
        getOpportunityListAug()
            .then(result => {
                //alert('Hello2');
                this.oppListAug = result;
                console.log('Return  result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppListAug = undefined;
            });
    }
    handleRecordsLoadSep() {
        getOpportunityListSep()
            .then(result => {
               // alert('Hello2');
                this.oppListSep = result;
                console.log('Return  result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppListSep = undefined;
            });
    }
    handleRecordsLoadOct() {
        getOpportunityListOct()
            .then(result => {
              //  alert('Hello2');
                this.oppListOct = result;
                console.log('Return  result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppListOct = undefined;
            });
    }
    handleRecordsLoadNov() {
        getOpportunityListNov()
            .then(result => {
               // alert('Hello2');
                this.oppListNov = result;
                console.log('Return  result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppListNov = undefined;
            });
    }
    handleRecordsLoadDec() {
        getOpportunityListDec()
            .then(result => {
                //alert('Hello2');
                this.oppListDec = result;
                console.log('Return  result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppListDec = undefined;
            });
    }
    connectedCallback() {
        this.handleRecordsLoadJan();
        this.handleRecordsLoadFeb();
        this.handleRecordsLoaadMar();
        this.handleRecordsLoadApr();
        this.handleRecordsLoadMay();
        this.handleRecordsLoadJun();
        this.handleRecordsLoadJuly();
        this.handleRecordsLoadAug();
        this.handleRecordsLoadSep();
        this.handleRecordsLoadOct();
        this.handleRecordsLoadNov();
        this.handleRecordsLoadDec();
    }
    viewRecord1(event) {
        this.navid1=event.target.value;
        alert(this.navid1);
        // Navigate to Opportunity record page
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                "recordId": this.navid1,
                "objectApiName": "Opportunity",
                "actionName": "view"
            },
        });
    }
}