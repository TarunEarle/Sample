public without sharing class StudentController {
   
    public static Integer getStudentRec() {
        return[SELECT Id,Name,Email__c FROM Student__c].size();
    }

    public static void createStudentRec() {
        Student__c stdObj = new Student__c(Name = 'Test', Email__c = 'test@gmail.com');
        Insert stdObj;
    }
  
}