public with sharing class whatsAppController {
    public whatsAppController() {

    }
    @AuraEnabled
    public static Boolean sendTemplateMessage(String contactId){
        try {
            Contact contactDetail = [Select id,Phone From Contact Where Id=: contactId];
            String whatsAppNumber = '91' +contactDetail.Phone;
            System.debug('Whatsapp Number-->' +whatsAppNumber);
            Http http = new http();
            HttpRequest req = new HttpRequest();
            req.setEndpoint('https://graph.facebook.com/v16.0/113392678427778/messages');
            req.setHeader('Content-Type' , 'application/json');
            req.setMethod('POST');

            String body = '{ "messaging_product": "whatsapp", "to": "'+whatsAppNumber+'", "type": "template", "template": { "name": "hello_world", "language": { "code": "en_US" } } }';
            System.debug('Template Body-->' +body);
            req.setBody(body);
            
            String apiToken = 'EAAOon5R9eCEBABTIicxHOv2f5nYCUcdbSmV1UTrrIo1oOX0jEVgEva9aBrrcgJwIUrucx2mn9kKpM3TgA92NyRMTfWEhBpozR6ZAE1ZB1FFFdguZCkTYLUf87qtD4nLUJ0csE0b81ogclXDzdroUWR9umYcE4TWi65AsJ1yQRPaJpXsjqgeMjT7f1zIF2KXLDEarjuEXAZDZD';
            req.setHeader('Authorization', 'Bearer ' +apiToken);
            HttpResponse res = http.send(req);
            System.debug('Response-->'+res.getBody());
            System.debug('status-->'+res.getStatusCode());

            if(res.getStatusCode() == 200){
                return true;
            }
            return false;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}