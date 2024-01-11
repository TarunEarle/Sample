public with sharing class retriveDetailsByWrapper {
    @AuraEnabled(cacheable=true)
	public static Contact getContacttDetails(String accountId) {
        Contact conObj = [select Id,Name,Account.Type,AccountId from Contact WHERE Id=:accountId];
	   System.debug('Return CaseRecord:'+conObj);
	
	    return conObj;
	}
    @AuraEnabled(cacheable=true)
    public static Wrappercls getWrapperRecord(String actRecordId){  
		
		
		
        System.debug('actRecordId::'+actRecordId);
        Account actObj = [Select Id,Name,Industry FROM Account WHERE Id=:actRecordId];
        System.debug('account Record::'+actObj);
		List<Contact> contList= [Select Id,LastName,Email FROM Contact
								WHERE AccountID =:actRecordId order by createddate desc limit 1];
								
		List<Opportunity> opportunityList = [SELECT Id,Name,StageName FROM Opportunity 
								WHERE AccountId = :actRecordId Order by lastModifiedDate desc limit 1];
         List<Case> caseList = [SELECT Id,Origin,Status FROM Case 
								WHERE AccountId = :actRecordId Order by lastModifiedDate desc limit 1];
		
		Wrappercls wrapObj = new Wrappercls();

		wrapObj.actObj = actObj;
		if(contList!=null && contList.size()>0)
			wrapObj.contObj = contList[0];
		
		if(opportunityList!=null && opportunityList.size()>0)	
			wrapObj.oppObj = opportunityList[0];

        if(caseList!=null && caseList.size()>0)	
			wrapObj.caseObj = caseList[0];
		
        return wrapObj;
    }
	
	public class Wrappercls{	
		@Auraenabled
		public Account actObj;
		@Auraenabled
		public Contact contObj;
		@Auraenabled
		public Opportunity oppObj;
        @Auraenabled
		public Case caseObj;	
	}
}