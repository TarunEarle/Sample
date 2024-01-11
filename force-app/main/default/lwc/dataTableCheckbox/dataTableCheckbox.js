import { LightningElement, wire } from 'lwc';
import conList from '@salesforce/apex/conCaseCheckbox.getContactList';
import caseList from '@salesforce/apex/conCaseCheckbox.getCaseList';
const COLUMNS = [
    { label: 'Id', fieldName: 'Id', type: 'Text' },
    { label: 'FName', fieldName: 'FirstName', type: 'Text' },
    { label: 'LName', fieldName: 'LastName', type: 'Text' },
    { label: 'Phone', fieldName: 'Phone', type: 'Phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' }
];

const COLS = [
    { label: 'Id', fieldName: 'Id', type: 'Text' },
    { label: 'Case Number', fieldName: 'CaseNumber', type: 'Text' },
    { label: 'Status', fieldName: 'Status', type: 'Text' },
    { label: 'Priority', fieldName: 'Priority', type: 'Text' },
    { label: 'Case Origin', fieldName: 'Origin', type: 'Text' }
];
export default class DataTableCheckbox extends LightningElement {
    columns = COLUMNS;
    cols = COLS;
    data;
    caseData;
    selectedContactIds = [];
    selectedCaseIds = [];
    selectAllHide = true;
    deSelectAllHide = false;

    @wire(conList) conRecords({ error, data }) {
        if (data) {
            this.data = data;
        }
        else if (error) {
            this.data = undefined;
        }

    }
    @wire(caseList) caseRecords({ error, data }) {
        if (data) {
            this.caseData = data;
        }
        else if (error) {
            this.data = undefined;
        }

    }

    handleSelectAll() {
       

        const contIds = this.data.map(row => row.Id);
        const caseIds = this.caseData.map(row => row.Id);
        this.selectedContactIds = [...new Set([...this.selectedContactIds, ...contIds])];
        this.selectedCaseIds = [...new Set([...this.selectedCaseIds, ...caseIds])];
        this.selectAllHide = false;
        this.deSelectAllHide = true;
    }

    handleDeselectAll(){
        
        const contIds = this.data.map(row => row.Id);
        const caseIds = this.caseData.map(row => row.Id);
        this.selectedContactIds = [new Set([this.selectedContactIds, contIds])];
        this.selectedCaseIds = [new Set([this.selectedCaseIds, caseIds])];
        this.selectAllHide = true;
        this.deSelectAllHide = false;
    }

/*handleChange(event) {
    let i;
    let checkboxes = this.template.querySelectorAll('[data-id="checkbox"]')
    for (i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = event.target.checked;
    }
}*/


}


/*import { LightningElement } from 'lwc';

const columns = [
    { label: 'Opportunity name', fieldName: 'opportunityName', type: 'text' },
    {
        label: 'Confidence',
        fieldName: 'confidence',
        type: 'percent',
        cellAttributes: {
            iconName: { fieldName: 'trendIcon' },
            iconPosition: 'right',
        },
    },
    {
        label: 'Amount',
        fieldName: 'amount',
        type: 'currency',
        typeAttributes: { currencyCode: 'EUR', step: '0.001' },
    },
    { label: 'Contact Email', fieldName: 'contact', type: 'email' },
    { label: 'Contact Phone', fieldName: 'phone', type: 'phone' },
];

const data = [
    {
        id: 'a',
        opportunityName: 'Cloudhub',
        confidence: 0.2,
        amount: 25000,
        contact: 'jrogers@cloudhub.com',
        phone: '2352235235',
        trendIcon: 'utility:down',
    },
    {
        id: 'b',
        opportunityName: 'Quip',
        confidence: 0.78,
        amount: 740000,
        contact: 'quipy@quip.com',
        phone: '2352235235',
        trendIcon: 'utility:up',
    },
];

export default class DataTableCheckbox extends LightningElement {
    data = data;
    columns = columns;

    getSelectedName(event) {
        const selectedRows = event.detail.selectedRows;
        // Display that fieldName of the selected rows
        for (let i = 0; i < selectedRows.length; i++) {
            alert('You selected: ' + selectedRows[i].opportunityName);
        }
    }
}*/