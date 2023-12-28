@isTest
public class StudentControllerTest {
 @isTest
     static void getStudentRecSize() {
        Student__c stdObj = new Student__c(Name='Test',Email__c='test1@gmail.com');
        Insert stdObj;
        Test.startTest();
         StudentController.getStudent();
        Test.stopTest();
    }
}