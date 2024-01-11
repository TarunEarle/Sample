import { LightningElement } from 'lwc';
import Jan from '@salesforce/apex/opportunityRec.getOppoJan';
import Feb from '@salesforce/apex/opportunityRec.getOppoFeb';
import Mar from '@salesforce/apex/opportunityRec.getOppoMar';
import Apr from '@salesforce/apex/opportunityRec.getOppoApr';
import May from '@salesforce/apex/opportunityRec.getOppoMay';
import Jun from '@salesforce/apex/opportunityRec.getOppoJun';
import July from '@salesforce/apex/opportunityRec.getOppoJuly';
import Aug from '@salesforce/apex/opportunityRec.getOppoAug';
import Sep from '@salesforce/apex/opportunityRec.getOppoSep';
import Oct from '@salesforce/apex/opportunityRec.getOppoOct';
import Nov from '@salesforce/apex/opportunityRec.getOppoNov';
import Dec from '@salesforce/apex/opportunityRec.getOppoDec';
import { NavigationMixin } from 'lightning/navigation';
export default class OpportunityRecByMon extends NavigationMixin(LightningElement) {
    oppoJan = [];
    oppoFeb = [];
    oppoMar = [];
    oppoApr = [];
    oppoMay = [];
    oppoJun = [];
    oppoJuly = [];
    oppoAug = [];
    oppoSep = [];
    oppoOct = [];
    oppoNov = [];
    oppoDec = [];

    handleRecordsLoadJan() {
        Jan()
            .then(result => {
                this.oppoJan = result;
                console.log('Return Opportunity result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppoJan = undefined;
            });
    }
    handleRecordsLoadFeb() {
        Feb()
            .then(result => {
                this.oppoFeb = result;
                console.log('Return Opportunity result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppoFeb = undefined;
            });
    }
    handleRecordsLoadMar() {
        Mar()
            .then(result => {
                this.oppoMar = result;
                console.log('Return Opportunity result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppoMar = undefined;
            });
    }
    handleRecordsLoadApr() {
        Apr()
            .then(result => {
                this.oppoApr = result;
                console.log('Return Opportunity result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppoApr = undefined;
            });
    }
    handleRecordsLoadMay() {
        May()
            .then(result => {
                this.oppoMay = result;
                console.log('Return Opportunity result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppoMay = undefined;
            });
    }
    handleRecordsLoadJun() {
        Jun()
            .then(result => {
                this.oppoJun = result;
                console.log('Return Opportunity result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppoJun = undefined;
            });
    }
    handleRecordsLoadJuly() {
        July()
            .then(result => {
                this.oppoJuly = result;
                console.log('Return Opportunity result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppoJuly = undefined;
            });
    }
    handleRecordsLoadAug() {
        Aug()
            .then(result => {
                this.oppoAug = result;
                console.log('Return Opportunity result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppoAug = undefined;
            });
    }
    handleRecordsLoadSep() {
        Sep()
            .then(result => {
                this.oppoSep = result;
                console.log('Return Opportunity result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppoSep = undefined;
            });
    }
    handleRecordsLoadOct() {
        Oct()
            .then(result => {
                this.oppoOct = result;
                console.log('Return Opportunity result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppoOct = undefined;
            });
    }
    handleRecordsLoadNov() {
        Nov()
            .then(result => {
                this.oppoNov = result;
                console.log('Return Opportunity result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppoNov = undefined;
            });
    } handleRecordsLoadDec() {
        Dec()
            .then(result => {
                this.oppoDec = result;
                console.log('Return Opportunity result:' + result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.oppoDec = undefined;
            });
    }
    connectedCallback() {
        this.handleRecordsLoadJan();
        this.handleRecordsLoadFeb();
        this.handleRecordsLoadMar();
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
        this.navid1 = event.target.value;
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