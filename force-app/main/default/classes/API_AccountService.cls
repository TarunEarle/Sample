public class API_AccountService { 
	public static void doGetSFTest(){ 

        HttpRequest feedRequest = new HttpRequest();  

        feedRequest.setEndpoint('callout:Auth_Named_Credential/services/data/v32.0'); 	 

        feedRequest.setMethod('GET');  

        Http http = new Http();  

        HTTPResponse feedResponse = http.send(feedRequest);  

        while (feedResponse.getStatusCode() == 302) { 
		 feedRequest.setEndpoint(feedResponse.getHeader('Location')); 
		 feedResponse = new Http().send(feedRequest); 
		} 
		 System.debug(feedResponse.getBody()); 
	} 

     

    public static void doGetSFCase(){ 

        HttpRequest feedRequest = new HttpRequest();  

        feedRequest.setEndpoint('callout:Auth_Named_Credential/services/data/v53.0/sobjects/case/5005j00000dmedKAAQ'); 	 

        feedRequest.setMethod('GET');  

        Http http = new Http();  

        HTTPResponse feedResponse = http.send(feedRequest);  

        while (feedResponse.getStatusCode() == 302) { 
		feedRequest.setEndpoint(feedResponse.getHeader('Location')); 
		feedResponse = new Http().send(feedRequest); 
		 } 
		System.debug('Case Response= '+feedResponse.getBody()); 
		} 

     

     

    public static void doGetSFAccounts(){ 

        HttpRequest feedRequest = new HttpRequest();  

        feedRequest.setEndpoint('callout:Auth_Named_Credential/services/data/v53.0/query/?q=SELECT+Id,Name,Type,Industry+FROM+Account'); 	 

        feedRequest.setMethod('GET');  

        Http http = new Http();  

        HTTPResponse feedResponse = http.send(feedRequest);  

        while (feedResponse.getStatusCode() == 302) { 
		 feedRequest.setEndpoint(feedResponse.getHeader('Location')); 
		 feedResponse = new Http().send(feedRequest); 
		} 
	 System.debug('Account Response='+feedResponse.getBody()); 
	 } 
} 

 

/* execution 

 * API_AccountService.doGetSFTest(); 

API_AccountService.doGetSFCase(); 

API_AccountService.doGetSFAccounts(); 

*/