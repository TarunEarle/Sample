public class StudentController {
    public static List<Student__c> getStudent(){
        return[SELECT Id,Name,Email__c FROM Student__c];
    }
}