trigger contactcreation on Account (after insert) {
List<Contact> conlist=new List<Contact>();
    for(Account acc:Trigger.new){
        conlist.add(new Contact(FirstName='test',AccountId=acc.Id));
    }
    try{
        insert conlist;
        system.debug('conlist'+conlist);
    }catch(Exception e){
        LogService.debug('debug test','class/method');
            }
}