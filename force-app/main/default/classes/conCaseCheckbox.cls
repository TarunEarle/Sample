public with sharing class conCaseCheckbox {
    public conCaseCheckbox() {
   
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [SELECT Id, FirstName, LastName, Phone, Email FROM Contact LIMIT 10];
    }

    @AuraEnabled(cacheable=true)
    public static List<Case> getCaseList() {
        return [SELECT Id, Origin, Status, Priority, CaseNumber FROM Case LIMIT 10];
    }
}