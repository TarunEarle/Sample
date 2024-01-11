public with sharing class ContactController {
    public ContactController() {

    }
   
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [SELECT Id, FirstName, LastName, Title, Phone, Email FROM Contact LIMIT 10];
    }
   
    @AuraEnabled
    public static Case createCasee(Case caseRec){
        try{
            insert caseRec;
            return caseRec;
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String accId) {
        return [
            SELECT AccountId, Id, FirstName, LastName, Title, Phone, Email
            FROM Contact
            WHERE AccountId = :accId
            WITH SECURITY_ENFORCED
        ];
    }
    @AuraEnabled
    public static string createCase(Object data) {
    List<Case> caseForCreate = (List<Case>) JSON.deserialize(
         JSON.serialize(data),
         List<Case>.class
    );
    try {
        insert caseForCreate;
        return 'Success:case created successfully';
    }
    catch (Exception e) {
        return 'The following exception has occurred: ' + e.getMessage();
    }
 }
 @AuraEnabled(cacheable=true)
    public static List<Contact> getDataFromContact(String recordId){
      List<Contact> conList = [Select Id,AccountId, FirstName, LastName, Email, Phone from Contact where AccountId =: recordId];
      try{
         return conList;
      }
      catch(Exception e){
         throw new AuraHandledException(e.getMessage());
      }
    }
}