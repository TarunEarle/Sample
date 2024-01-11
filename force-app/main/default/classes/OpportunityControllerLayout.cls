/*public with sharing class OpportunityControllerLayout {
    @AuraEnabled (cacheable=true)
    public static Map<String,List<Opportunity>> getortunitys(){
        Map<String,List<Opportunity>> ListofMonth = new Map<String,List<Opportunity>>();
     List<Opportunity> oppList = [Select Id, Name,StageName,Month__c,Number__c FROM Opportunity order by Number__c];
     for(opportunity opp:oppList){
        if(ListofMonth.containskey(opp.Month__c)){
            List<opportunity> oppid = ListofMonth.get(opp.Month__c);
            ListofMonth.get(opp.Month__c).add(opp);
}
else{
    ListofMonth.put(opp.Month__c,new List<opportunity>{opp});
}
     }
     return ListofMonth;
    }
}*/
public with sharing class OpportunityControllerLayout {
    @AuraEnabled (cacheable=true)
    public static Map<String,List<Opportunity>> getortunitys(){
        Map<String,List<Opportunity>> ListofMonth = new Map<String,List<Opportunity>>();
        ListofMonth.put('January',New List<Opportunity>{});
        ListofMonth.put('February',New List<Opportunity>{});
        ListofMonth.put('March',New List<Opportunity>{});
        ListofMonth.put('April',New List<Opportunity>{});
        ListofMonth.put('May',New List<Opportunity>{});
        ListofMonth.put('June',New List<Opportunity>{});
        ListofMonth.put('July',New List<Opportunity>{});
        ListofMonth.put('August',New List<Opportunity>{});
        ListofMonth.put('September',New List<Opportunity>{});
        ListofMonth.put('October',New List<Opportunity>{});
        ListofMonth.put('November',New List<Opportunity>{});
        ListofMonth.put('December',New List<Opportunity>{});
List<Opportunity> oppList = [Select Id, Name,StageName,Month__c,Number__c,CloseDate  FROM Opportunity order by Number__c];
     for(opportunity opp:oppList){
        if(ListofMonth.containskey(opp.Month__c)){
            List<opportunity> oppid = ListofMonth.get(opp.Month__c);
            ListofMonth.get(opp.Month__c).add(opp);
}
else{
    ListofMonth.put(opp.Month__c,new List<opportunity>{opp});
}
     }
     return ListofMonth;
    }
}