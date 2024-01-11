({
    //Method to fetch PricebookEnteries
    doInit : function(component, event, helper) {
        helper.doInit(component, event, helper);
    },
    
    //Method to remove OpportunityLineItem
    handleRemoveItem : function(component, event, helper){
        helper.handleRemoveItem(component, event, helper);
    },
    
    //Method to save OpportunityLineItems
    handleSubmit: function(component, event, helper) {
        helper.handleSubmit(component, event, helper);
    }, 
    
    //Method to add row to insert OpportunityLineItem
    addNewRow : function(component, event, helper) {
        helper.addNewRow(component, event, helper);
    },
    
    //Method to return to previous page
    handleCancel: function(conponent, event, helper){
        window.history.back();
    }
    
})