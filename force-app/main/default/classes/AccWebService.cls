public with sharing class AccWebService { 

     

    public static Http http = new Http(); 

    public static HTTPResponse response; 

    public static HttpRequest request; 

     

    public class NewAccountRequestWrapper { 

        public String name {get; set;} 

        public String phone {get; set;} 
        
        public String website {get; set;} 


    } 

     

    //test querying an Account record 

    public static void getAccount(Id accId) { 

        request = new HttpRequest(); 

        request.setMethod('GET'); 

         

        request.setEndpoint('callout:Auth_Named_Credential/services/apexrest/vamritech/Account/' + accId); 

        response = http.send(request); 

        System.debug(response.getBody()); 

    } 

     

    //test creating an Account record 

    public static void addAccount(NewAccountRequestWrapper newAccount) { 

        request = new HttpRequest(); 

        request.setMethod('POST'); 

         

        request.setEndpoint('callout:Auth_Named_Credential/services/apexrest/vamritech/Account'); 

        request.setHeader('Content-Type','application/json;charset=UTF-8'); 

        request.setBody(JSON.serialize(newAccount)); 

        response = http.send(request); 

        System.debug(response.getBody()); 

    } 

     

    //test deleting an Account recoord 

    public static void deleteAccount(Id accId) { 

        request = new HttpRequest(); 

        request.setMethod('DELETE'); 

         

        request.setEndpoint('callout:Auth_Named_Credential/services/apexrest/vamritech/Account/' + accId); 

        response = http.send(request); 

        System.debug(response.getBody()); 

    } 

} 

 

//Executions 

//Add a new Account 

/* 

AccWebService.NewAccountRequestWrapper newAccount = new AccWebService.NewAccountRequestWrapper(); 

newAccount.name = 'Integration Account'; 

newAccount.phone = '61412345678'; 
newAccount.website = 'test.com';

AccWebService.addAccount(newAccount); 

*/ 

 

//get Account details based on Id 

//AccWebService.getAccount('001Dn000006o6bjIAA'); 

 

//delete Account based on Id 

//AccWebService.deleteAccount('001Dn000006o6bjIAA');