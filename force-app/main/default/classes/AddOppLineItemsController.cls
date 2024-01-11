public class AddOppLineItemsController {
    
    //Method to fetch PricebookEntries
    @AuraEnabled
    public static map<String,List<PricebookEntry>> getPricebookEntryList(Id opportunityId){
        Opportunity oppRecord = new Opportunity();
        Id pricebookId = null;
        if(opportunityId != null){
            oppRecord = [Select Id, Name, Pricebook2ID from Opportunity where Id =: opportunityId];
        }
        if(oppRecord != null && oppRecord.Pricebook2Id != null){
            pricebookId = oppRecord.Pricebook2Id;
        }
        map<String,List<PricebookEntry>> mapOfFamilyVsListOfProduct = new map<String,List<PricebookEntry>>();
        list<PricebookEntry> pricebookEntryList = new list<PricebookEntry>();
        if(pricebookId != null){
            pricebookEntryList = [Select PriceBook2.Name, PriceBook2Id, Product2.Id, Product2.Name, Product2.Family From PricebookEntry 
                                  where PriceBook2Id =: pricebookId];
        }
      
        set<String> familySet = new set<String>();
        if(pricebookEntryList != null && !pricebookEntryList.isEmpty()){
            for(PricebookEntry p : pricebookEntryList){
                if(p.Product2.Family != null && p.Product2.Family != ''){
                    familySet.add(p.Product2.Family);
                }
            }
        }
    
        if(pricebookEntryList != null && !pricebookEntryList.isEmpty()){
            for(PricebookEntry p : pricebookEntryList){
                    if(mapOfFamilyVsListOfProduct.containsKey(p.Product2.Family) && 
                       mapOfFamilyVsListOfProduct.get(p.Product2.Family) != null) {
                           List<PricebookEntry> listOfPriceookEntry = mapOfFamilyVsListOfProduct.get(p.Product2.Family);
                           listOfPriceookEntry.add(p);
                           mapOfFamilyVsListOfProduct.put(p.Product2.Family,listOfPriceookEntry); 
                       }   
                    else {
                        mapOfFamilyVsListOfProduct.put(p.Product2.Family, new List<PricebookEntry> {p});
                    }
                
            }
        }
        return mapOfFamilyVsListOfProduct;        
    }
    
    //Method to Insert Opportunity Line Items
    @AuraEnabled
    public static Boolean addOppLineItems(String LineItemList, String RecordId){
        
        Opportunity opp = [Select id,Pricebook2Id from Opportunity where id =:RecordId limit 1];
        if(opp.Pricebook2Id == null){
            opp.Pricebook2Id = [select id, name from Pricebook2 where isStandard = true limit 1].Id;
            update opp;
        }
        
        List<OpportunityLineItem> listtoInsert = new List<OpportunityLineItem>();
        
        Map<Id,Id> productidVspricebookIdMap = new Map<Id,Id>();
        Id pricebookId;
        if(Test.isRunningTest()){
            pricebookId = Test.getStandardPricebookId();
        }else{
            pricebookId = [select Pricebook2Id from Opportunity where id =:RecordId limit 1][0].Pricebook2Id;
        }
        for(PricebookEntry entry : [select id, name, pricebook2id,product2id from PricebookEntry where pricebook2id =:pricebookId limit 50000]){
            productidVspricebookIdMap.put(entry.product2id,entry.id);
        }
        
        List<OpportunityLineItem> productList = new List<OpportunityLineItem>();
        productList = (List<OpportunityLineItem>)System.JSON.deserialize(LineItemList, List<OpportunityLineItem>.class);
        
        for(OpportunityLineItem oppLineitem : productList){
            oppLineitem.OpportunityId = RecordId;
            
            if(oppLineitem.UnitPrice != null){
                oppLineitem.UnitPrice = oppLineitem.UnitPrice;
            }else{
                oppLineitem.UnitPrice = 0;
            }
            
            if(oppLineitem.Quantity != null && oppLineitem.Quantity != 0){
                oppLineitem.Quantity = oppLineitem.Quantity;
            }else{
                oppLineitem.Quantity = 1;
            } 
            
            
            if(!productidVspricebookIdMap.isEmpty() && productidVspricebookIdMap.containsKey(oppLineitem.Product2Id))
                oppLineitem.PricebookEntryId = productidVspricebookIdMap.get(oppLineitem.Name);
            
            if(oppLineitem.Name != null && oppLineitem.Name != ''){
                oppLineitem.Product2Id = oppLineitem.Name;
            }
            
            if(oppLineitem.Description != null && oppLineitem.Description != ''){
                oppLineitem.Description = oppLineitem.Description;
            }
            
            if(oppLineitem.ServiceDate != null){
                oppLineitem.ServiceDate = oppLineitem.ServiceDate;
            }

            listtoInsert.add(oppLineitem);
            
        }
        try{
            if(listtoInsert != null && !listtoInsert.isEmpty()){
                insert listtoInsert;
                return true;
            }
        }catch(Exception e){
            system.debug('Error is**********'+e);  
        }
        return false;
    }
}