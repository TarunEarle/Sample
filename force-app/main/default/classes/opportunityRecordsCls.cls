public with sharing class opportunityRecordsCls {
    @AuraEnabled(cacheable=true)
  public static List<Opportunity> getOpportunityListJan(){
    return [SELECT Id,Name,closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =1];
  }
@AuraEnabled(cacheable=true)
  public static List<Opportunity> getOpportunityListFeb(){
    return [SELECT Id,Name,closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =2];
  }
@AuraEnabled(cacheable=true)
  public static List<Opportunity> getOpportunityListMar(){
    return [SELECT Id,Name,closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =3 ];
  }
@AuraEnabled(cacheable=true)
  public static List<Opportunity> getOpportunityListApril(){
    return [SELECT Id,Name,closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =4];
  }
  @AuraEnabled(cacheable=true)
  public static List<Opportunity> getOpportunityListMay(){
    return [SELECT Id,Name,closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =5];
  }
  @AuraEnabled(cacheable=true)
  public static List<Opportunity> getOpportunityListJune(){
    return [SELECT Id,Name,closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =6];
  }
  @AuraEnabled(cacheable=true)
  public static List<Opportunity> getOpportunityListJuly(){
    return [SELECT Id,Name,closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =7];
  }
  @AuraEnabled(cacheable=true)
  public static List<Opportunity> getOpportunityListAug(){
    return [SELECT Id,Name,closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =8];
  }
  @AuraEnabled(cacheable=true)
  public static List<Opportunity> getOpportunityListSep(){
    return [SELECT Id,Name,closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =9];
  }
  @AuraEnabled(cacheable=true)
  public static List<Opportunity> getOpportunityListOct(){
    return [SELECT Id,Name,closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =10];
  }
  @AuraEnabled(cacheable=true)
  public static List<Opportunity> getOpportunityListNov(){
    return [SELECT Id,Name,closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =11];
  }
  @AuraEnabled(cacheable=true)
  public static List<Opportunity> getOpportunityListDec(){
    return [SELECT Id,Name,closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =12];
  }
}