public without sharing class StudentController {
   
    public static Integer getStudentRec() {
        System.debug([SELECT Id,Name,Email__c FROM Student__c].size());
        return[SELECT Id,Name,Email__c FROM Student__c].size();
    }

    public void createStudentRec() {
        Student__c stdObj = new Student__c(Name = 'Test', Email__c = 'test@gmail.com');
        System.debug('stdObj-->'+stdObj);
        Insert stdObj;
    }
  
}