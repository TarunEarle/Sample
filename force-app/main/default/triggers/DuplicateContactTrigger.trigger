trigger DuplicateContactTrigger on Contact (before insert) {
    if(Trigger.isBefore && Trigger.isInsert){
        ContactDuplicationCntrl.preventDuplicateContact(Trigger.new);
}
}