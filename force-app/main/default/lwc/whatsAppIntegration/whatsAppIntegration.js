import { LightningElement,api } from 'lwc';
import sendTemplateMessage from '@salesforce/apex/whatsAppController.sendTemplateMessage';
export default class WhatsAppIntegration extends LightningElement {
    @api recordId;

    onSendTemplate(){
        sendTemplateMessage({ contactId: this.recordId})
        .then(result =>{
            window.alert('Message Sent Successfully!!...😊😊')
        })
        .catch(error => {
            window.alert('Message Failed...😕')
        })
    }
}