import { LightningElement,wire } from 'lwc';
import getProducts from '@salesforce/apex/priceBook.getProducts';
const columns = [
    {
        label: 'Product name',
       fieldName: 'Name',
       type: 'text',
    },
]
export default class OppLineItem extends LightningElement {
    columns = columns;
    priceBookName;  
    ProductList;
   /*priceBookRecordId;  
    onRecievedDocumentSelection(event){
        this.priceBookName = event.detail.selectedValue;  
         this.priceBookRecordId = event.detail.selectedRecordId;
      // alert('selectedValue is:'+JSON.stringify(this.priceBookName) );
       //alert('selectedRecordId is:' +JSON.stringify(this.priceBookRecordId));
    }*/
    @wire(getProducts, { searchString: '$priceBookName' })
    retrieveProducts({ error, data }) {
        alert('Hi');
        if (data) {
            this.ProductList = data;
            alert('------Hi'+JSON.stringify( this.ProductList));
        }
        else if (error) {
        }
    }
    handleKeyChange(event) {
        const searchString = event.target.value;
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => {
            this.priceBookName = searchString;
        });
    }
}