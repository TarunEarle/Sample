({
    //Method to fetch PricebookEnteries
    doInit : function(component, event, helper) {
        var opportunityId = component.get("v.recordId");
        var action = component.get("c.getPricebookEntryList");
        action.setParams({
            "opportunityId" : opportunityId
        });
        action.setCallback(this, function(a){
            var state = a.getState(); // get the response state
            if(state == 'SUCCESS'){
                var returnProductFamilyMap = a.getReturnValue();
                var pricebookEntryMap = [];
                for(var key in returnProductFamilyMap){
                    let tempProductArr = [];
                    pricebookEntryMap.push({value:returnProductFamilyMap[key], key:key, newProducts:tempProductArr});
                }
                component.set("v.PricebookEntryMap", pricebookEntryMap);
            }
        });
        $A.enqueueAction(action);
    },
    
    //Method to remove OpportunityLineItem
    handleRemoveItem : function(component, event, helper){
        var self = this;  // safe reference
        var index = event.target.dataset.index;
        var value = event.target.dataset.value;
        var PricebookEntryMap = component.get("v.PricebookEntryMap");
        var objIndex = PricebookEntryMap.findIndex((obj => obj.key == value));
        PricebookEntryMap[objIndex].newProducts.splice(index, 1);
        component.set("v.PricebookEntryMap", PricebookEntryMap);
    },
    
    //Method to save OpportunityLineItems
    handleSubmit: function(component, event, helper) {
        var LineItemList = [];
        var relatedProductList = component.get("v.PricebookEntryMap");
        for(var key in relatedProductList){
            for(var i in relatedProductList[key].newProducts){
                LineItemList.push(relatedProductList[key].newProducts[i]);
            }
        }
        if(LineItemList.length == 0){
            alert ('You have not added any Opportunity Product.');
            return false;
        }
        var validForm = component.find(
            'validateFields').reduce(
            function (validSoFar,
                      inputCmp) {
                // Displays error messages for invalid fields
                inputCmp.showHelpMessageIfInvalid();
                return validSoFar &&
                    inputCmp.get(
                    'v.validity'
                ).valid;
            }, true);
        
        if(validForm){
            
            var ItemList = [];
            var ProductList = component.get("v.PricebookEntryMap");
            for(var key in ProductList){
                for(var i in ProductList[key].newProducts){
                    ItemList.push(ProductList[key].newProducts[i]);
                }
            }
            for(var i in ItemList){ 
                if(ItemList[i].Quantity != null && (ItemList[i].Quantity == 0 || ItemList[i].Quantity < 0)){
                    alert('Quantity cannot be zero or less than 0.');
                    return false;
                }  
            }
            
            helper.callActionAsPromise(
                component,
                helper,
                { 'LineItemList' : JSON.stringify(ItemList),
                 'RecordId' : component.get("v.recordId")}
            ).then(function(r) {    
                if(r.r == true || r.r == 'true'){
                    setTimeout(function(){
                        window.open('/'+component.get("v.recordId"),'_self');
                        
                    }, 10000);
                } else {
                    alert('error in inserting product');
                }
            }) 
        }
    }, 
    
    callActionAsPromise : function(component, helper, params) {
        return new Promise($A.getCallback(function(resolve, reject) {
            let action = component.get("c.addOppLineItems"); 
            action.setParams(params);
            action.setCallback(helper, function(a){
                var state = a.getState(); // get the response state
                console.log('state'+state);
                if(state == 'SUCCESS') {
                    component.set("v.Savedisable",true);
                    resolve({'c':component, 'h':helper, 'r':a.getReturnValue()});
                }  
                else {
                    var errors = a.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log(errors);
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                    reject(new Error(errors && Array.isArray(errors) && errors.length === 1 ? errors[0].message : JSON.stringify(errors)));
                }
            });
            $A.enqueueAction(action);
            
        }));
    },
    
    //Method to add new row to insert LineItem
    addNewRow : function(component, event, helper) {
        var ctarget = event.currentTarget;
        var key_str = ctarget.dataset.value;
        console.log('key_str---');
        console.log(key_str);
        var PricebookEntryMap = component.get("v.PricebookEntryMap");
        var objIndex = PricebookEntryMap.findIndex((obj => obj.key == key_str));
        PricebookEntryMap[objIndex].newProducts.push({'sobjectType':'OpportunityLineItem',
                                                      Name: ""});
        component.set("v.PricebookEntryMap", PricebookEntryMap);
    },
    
    //Method to redirect to Opportunity detail page
    navigateToRecordDetailPage : function(component, opportunityId){
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": opportunityId
        });
        navEvt.fire();
    },
    
    fireToastSaveFailure : function(component, message, type){			//Added one more parameter 'type'
        if(message == null){
            message = "Unable to add Opportunity Products. Please contact your organization administrator";
        }
        
        //Added type to the Toast
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type": type,
            "title": "Error!",
            "message": message
        });
        
        toastEvent.fire();
    },
    
    fireToastSaveSuccess : function(component){
        var toastEvent = $A.get("e.force:showToast");
        
        if(toastEvent){
            toastEvent.setParams({
                "title": "Success!",
                "type": "success",
                "message": "The Opportunity Products has been successfully added."
            });
            
            toastEvent.fire();
        }       
    }
    
})