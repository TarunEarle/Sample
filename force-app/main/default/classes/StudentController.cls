public class StudentController {
    public static List<Student__c> getStudent(){
    //Query to return data
        return[SELECT Id,Name,Email__c FROM Student__c];
    }
}
