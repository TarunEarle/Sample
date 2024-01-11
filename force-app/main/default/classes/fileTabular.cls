@Suppresswarnings('PMD')
public with sharing class fileTabular {
    public fileTabular() {

    }
    @AuraEnabled(cacheable=true)
    public static List<ContentDocumentLink> getFetchFiles(String recordId){
        return [SELECT LinkedEntityId, ContentDocument.CreatedDate, ContentDocument.Title, ContentDocument.ContentSize, ContentDocument.FileType
                    FROM ContentDocumentLink WHERE LinkedEntityId  =:recordId];
    }

    @AuraEnabled(cacheable=false)
        public static String getRecToSave(String accountId) {
        List<File_Audit__c> eFile = new List<File_Audit__c>();
        File_Audit__c fileRecord;

        // Query Account object to retrieve Account Name based on AccountId
        Account acc = [SELECT Name FROM Account WHERE Id = :accountId LIMIT 1];

        if (acc != null) {
            List<ContentDocumentLink> contentLinks = [SELECT Id, ContentDocument.Title, ContentDocument.CreatedBy.Id,ContentDocument.FileType,ContentDocument.ContentSize, ContentDocument.CreatedDate,ContentDocument.CreatedBy.Name, LinkedEntityId 
                                                    FROM ContentDocumentLink WHERE LinkedEntityId =: accountId ORDER BY ContentDocument.CreatedDate DESC LIMIT 1];

            for(ContentDocumentLink oContent : contentLinks) {
                fileRecord = new File_Audit__c();
                fileRecord.Account_Name__c = acc.Name;
                fileRecord.File_Type__c = oContent.ContentDocument.FileType;
                fileRecord.File_Size__c = oContent.ContentDocument.ContentSize;
                fileRecord.User__c = oContent.ContentDocument.CreatedBy.Id;
                fileRecord.Action_Performed_By__c = oContent.ContentDocument.CreatedBy.Name;
                fileRecord.Name = oContent.ContentDocument.Title;
                fileRecord.Operation_Type__c = 'Uploaded';
                eFile.add(fileRecord);
            }

            if (eFile.isEmpty()) {
                throw new AuraHandledException('No related ContentDocument found for the provided Account Id');
            }

            try {
                System.debug('logLevel--'+eFile);
                insert eFile;
                return 'File Audit Record inserted Successfully';
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        } else {
            throw new AuraHandledException('Account not found with the provided Id');
        }
    }
    @AuraEnabled(cacheable=false)
    public static String downloadFileAuditRecord(String contentDocumentId, String actId) {

        File_Audit__c fileRecord = new File_Audit__c();

          Account acc = [SELECT Name FROM Account WHERE Id = :actId LIMIT 1];
        // Query the ContentDocument to retrieve information about the file
        ContentDocument doc = [SELECT Title,FileType,ContentSize, CreatedBy.Id,CreatedBy.Name, CreatedDate FROM ContentDocument WHERE Id = :contentDocumentId LIMIT 1];
        
        if (doc != null) {
            fileRecord.Account_Name__c = acc.Name;
            fileRecord.File_Type__c = doc.FileType;
            fileRecord.Action_Performed_By__c = doc.CreatedBy.Name;
            fileRecord.File_Size__c = doc.ContentSize;
             // You may need to set the appropriate Account Name here.
            fileRecord.User__c = doc.CreatedBy.Id;
            fileRecord.Name = doc.Title;
            fileRecord.Operation_Type__c = 'Downloaded'; // Set the appropriate operation type
            
            try {
                insert fileRecord;
                return 'File Audit Record inserted Successfully';
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        } else {
            throw new AuraHandledException('ContentDocument not found with the provided Id');
        }
    }

}