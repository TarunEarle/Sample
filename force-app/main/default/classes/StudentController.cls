public class StudentController {
    public static Integer getStudent(){
    //Query to return data
        return[SELECT Id,Name,Email__c FROM Student__c].size();
    }
    public static void getCreateRec(){
        Student__c st = new Student__c(Name='Test',Email__c='test@gmail.com');
        insert st;
    }
}
