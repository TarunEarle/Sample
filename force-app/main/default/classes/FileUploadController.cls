@Suppresswarnings('PMD')
public with sharing class FileUploadController {
    @AuraEnabled(cacheable=true)
    public static List<File_Audit__c> getUploadFiles (String parentId, List<Id> contentDocumentIds) {
        System.debug('logLevel1: ' + parentId + ', ' + contentDocumentIds);
        List<File_Audit__c> fileRecords = new List<File_Audit__c>();
        System.debug('logLevel2: ' + fileRecords);
        for (Id contentDocumentId : contentDocumentIds) {
            System.debug('logLevel: ' + contentDocumentId);
            // Create FileRecord__c records based on uploaded files
            File_Audit__c fileRecord = new File_Audit__c();
            System.debug('logLevel3: ' + fileRecord);
            ContentDocument contentDocument = [SELECT Title, CreatedBy.Name FROM ContentDocument WHERE Id = :contentDocumentId LIMIT 1];
            System.debug('logLevel4: ' + contentDocument);
            fileRecord.Name = contentDocument.Title;
            fileRecord.User__c = contentDocument.CreatedBy.Name;
            fileRecord.Account_Name__c = parentId; // Link the file record to a parent record if needed
            // Perform other operations if necessary
            fileRecords.add(fileRecord);
        }
        System.debug('logLevelLast: ' + fileRecords);
        // Insert the file records into the database
        insert fileRecords;
        return fileRecords;
    }
}