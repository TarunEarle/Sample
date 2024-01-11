import { LightningElement,wire } from 'lwc';
import conList from '@salesforce/apex/conCaseCheckbox.getContactList';
import caseList from '@salesforce/apex/conCaseCheckbox.getCaseList';
const CONTACT_COLUMNS = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Phone', fieldName: 'Phone', type:'number' },
    { label: 'Email', fieldName: 'Email', type: 'email' }
];

const CASE_COLUMNS = [
    { label: 'Case Number', fieldName: 'CaseNumber', type: 'number' },
    { label: 'Status', fieldName: 'Status', type: 'text' },
    { label: 'Priority', fieldName: 'Priority', type: 'text' }
];

export default class ContactCaseRecord extends LightningElement {
    contactData;
    caseData;
    selectedContactIds = [];
    selectedCaseIds = [];

    contactColumns = CONTACT_COLUMNS;
    caseColumns = CASE_COLUMNS;

    @wire(conList)
    wiredContacts({ error, data }) {
        if (data) {
            this.contactData = data;
        } else if (error) {
            console.error(error);
        }
    }

    @wire(caseList)
    wiredCases({ error, data }) {
        if (data) {
            this.caseData = data;
        } else if (error) {
            console.error(error);
        }
    }

    handleContactSelection(event) {
        this.selectedContactIds = event.detail.selectedRows.map(row => row.Id);
    }

    handleCaseSelection(event) {
        this.selectedCaseIds = event.detail.selectedRows.map(row => row.Id);
    }

    handleSelectAll() {
        const allContactIds = this.contactData.map(row => row.Id);
        const allCaseIds = this.caseData.map(row => row.Id);
        this.selectedContactIds = [...new Set([...this.selectedContactIds, ...allContactIds])];
        this.selectedCaseIds = [...new Set([...this.selectedCaseIds, ...allCaseIds])];
        
    
    }
    handleDeselectAll(){
        const allContactIds = this.contactData.map(row => row.Id);
        const allCaseIds = this.caseData.map(row => row.Id);
        this.selectedContactIds = [new Set([this.selectedContactIds, allContactIds])];
        this.selectedCaseIds = [new Set([this.selectedCaseIds, allCaseIds])];
    }
}