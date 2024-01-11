import { LightningElement } from 'lwc';
const knowledgeData = [
    {
        type: 'Text',
        question: 'What is the capital of France?',
        answer: '',
        giventext: '',
        required:true,
        isText: true
    },
    {
        type: 'Text Area',
        question: 'Explain text area data.',
        answer: '',
        giventext: '',
        required:false,
        isTextArea: true
    },
    {
        type: 'Number', question: 'What are numbers used for?', giventext: '',required:false,
        isnumber: true
    },
    {
        type: 'URL', question: 'What is a URL?', giventext: '',required:false,
        isURL: true
    },
    {
        type: 'Email',
        question: 'What is an email address?',
        answer: '',
        giventext: '',
        required:true,
        isEmail: true
    },
    {
        type: 'Date',
        question: 'What is a date?',
        answer: '',
        givendate: '',
        required:true,
        isDate: true
    },
    {
        type: 'Picklist',
        question: 'What is a picklist?',
        answer: '',
        isPicklist: true,
        required:true,
        isMultiSelectPicklist: false,
        picklistOptions: [
            { label: 'Option 1', value: 'Option 1' },
            { label: 'Option 2', value: 'Option 2' },
            { label: 'Option 3', value: 'Option 3' }
        ],
        selectedOption: ''
    },
    {
        type: 'Picklist (Multi-Select)',
        question: 'How does multi-select picklist work?',
        answer: '',
        isPicklist: false,
        required:false,
        isMultiSelectPicklist: true,
        verticalOptions: [
            { label: 'Fast', value: 'Fast' },
            { label: 'Long', value: 'Long' },
            { label: 'First', value: 'First' }
        ],
        selectedVerticalOptions: [],
    },
    {
        type: 'Boolean',
        question: 'Is the sky blue?',
        answer: '',
        isPicklist: false,
        isMultiSelectPicklist: false,
        isBoolean: true,
        required:true,
        booleanOptions: [
            { label: 'True', value: 'true' },
            { label: 'False', value: 'false' }
        ],
        selectedOption: ''
    }
];
knowledgeData.forEach((item, index) => {
    item.index = index + 1;
});
export default class KnowledgeAnswers extends LightningElement {
    surveyQuestions = knowledgeData;
    title = 'Knowledge Survey';
    handleVerticalChange(event) {
        const selectedOptions = event.detail.value;
        const question = this.surveyQuestions.find(surveyQuestions => surveyQuestions.type === 'Picklist (Multi-Select)');
        question.selectedVerticalOptions = selectedOptions;
    }
    handleSubmit() {
        // Handle form submission logic here
        // You can send the data to a server, save it in Salesforce, or perform other actions
        // For this example, we'll just log the data
        alert('Survey Responses:', this.surveyQuestions);
        console.log('Survey Responses:', this.surveyQuestions);
    }
}