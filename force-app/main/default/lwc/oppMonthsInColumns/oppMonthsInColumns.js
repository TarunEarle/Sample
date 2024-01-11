/*import { LightningElement,wire } from 'lwc';
import getOpportunity from '@salesforce/apex/OpportunityControllerLayout.getortunitys';
export default class OppMonthsInColumns extends LightningElement {
    opportunitys;
    error;
    oppdata = [];
    @wire(getOpportunity)
    wiredOpportunitys({ error, data }) {
        if (data) {
            this.opportunitys = data;
            this.error = undefined;
            console.log('this.opportunitys13'+ JSON.stringify(this.opportunitys));
              for (let key in data) {
               var oppObjList = data[key];
                 console.log('+++oppObjList'+JSON.stringify(oppObjList));
                  oppObjList = oppObjList.map((item) => ({
                        ...item,
                        'url':window.location.origin + '/'+ item.Id
                    }));
                    console.log('+++oppObjList'+JSON.stringify(oppObjList));
                this.oppdata.push({value:oppObjList, key:key});
                console.log('data[key]17'+ JSON.stringify(data[key]));
                console.log('key18'+ JSON.stringify(key));
                console.log('this.oppdata19'+ JSON.stringify(this.oppdata));
    }
        } else if (error) {
            this.error = error;
            this.opportunitys = undefined;
        }
    }
}*/

import { LightningElement, wire } from 'lwc';
import getOpportunity from '@salesforce/apex/OpportunityControllerLayout.getortunitys';
export default class OppMonthsInColumns extends LightningElement {
    opportunities;
    error;
    oppdata = [];
    @wire(getOpportunity)
    wiredOpportunitys({ error, data }) {
        if (data) {
            this.opportunities = data;
            this.error = undefined;
            console.log('this.opportunities13' + JSON.stringify(this.opportunities));
            for (let key in data) {
                var oppObjList = data[key];
                console.log('+++oppObjList' + JSON.stringify(oppObjList));
                oppObjList = oppObjList.map((item) => (
                    {
                        ...item,
                        'url': window.location.origin + '/' + item.Id,
                        'endOfMonth': false
                    }));
                for (var opp in oppObjList) {
                    var closeDateVal = oppObjList[opp].CloseDate.substring(8);
                    console.log('+++closeDateVal' + closeDateVal)
                    if (closeDateVal > 20) {
                        oppObjList[opp].endOfMonth = true;
                    }
                }
                console.log('+++oppObjList' + JSON.stringify(oppObjList));
                this.oppdata.push({ value: oppObjList, key: key });
                console.log('data[key]17' + JSON.stringify(data[key]));
                console.log('key18' + JSON.stringify(key));
                console.log('this.oppdata19' + JSON.stringify(this.oppdata));
            }
        } else if (error) {
            this.error = error;
            this.opportunities = undefined;
        }
    }
}