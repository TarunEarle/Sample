public with sharing class opportunityRec {
    @AuraEnabled(cacheable=true)
    Public static list<opportunity> getOppoJan()
    {
        list<opportunity> oppoJanRec = new list<opportunity>();
        oppoJanRec = [ SELECT Id, Name,StageName, closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =1];
        return oppoJanRec;
    }
     @AuraEnabled(cacheable=true)
    Public static list<opportunity> getOppoFeb()
    {
        list<opportunity> oppoFebRec = new list<opportunity>();
        oppoFebRec = [ SELECT Id, Name,StageName, closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =2];
        return oppoFebRec;
    }
    @AuraEnabled(cacheable=true)
    Public static list<opportunity> getOppoMar()
    {
        list<opportunity> oppoMarRec = new list<opportunity>();
        oppoMarRec = [ SELECT Id, Name,StageName, closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =3];
        return oppoMarRec;
    }
    @AuraEnabled(cacheable=true)
    Public static list<opportunity> getOppoApr()
    {
        list<opportunity> oppoAprRec = new list<opportunity>();
        oppoAprRec = [ SELECT Id, Name,StageName, closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =4];
        return oppoAprRec;
    }
    @AuraEnabled(cacheable=true)
    Public static list<opportunity> getOppoMay()
    {
        list<opportunity> oppoMayRec = new list<opportunity>();
        oppoMayRec = [ SELECT Id, Name,StageName, closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =5];
        return oppoMayRec;
    }
    @AuraEnabled(cacheable=true)
    Public static list<opportunity> getOppoJun()
    {
        list<opportunity> oppoJunRec = new list<opportunity>();
        oppoJunRec = [ SELECT Id, Name,StageName, closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =6];
        return oppoJunRec;
    }
    @AuraEnabled(cacheable=true)
    Public static list<opportunity> getOppoJuly()
    {
        list<opportunity> oppoJulyRec = new list<opportunity>();
        oppoJulyRec = [ SELECT Id, Name,StageName, closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =7];
        return oppoJulyRec;
    }
    @AuraEnabled(cacheable=true)
    Public static list<opportunity> getOppoAug()
    {
        list<opportunity> oppoAugRec = new list<opportunity>();
        oppoAugRec = [ SELECT Id, Name,StageName, closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =8];
        return oppoAugRec;
    }
    @AuraEnabled(cacheable=true)
    Public static list<opportunity> getOppoSep()
    {
        list<opportunity> oppoSepRec = new list<opportunity>();
        oppoSepRec = [ SELECT Id, Name,StageName, closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =9];
        return oppoSepRec;
    }
    @AuraEnabled(cacheable=true)
    Public static list<opportunity> getOppoOct()
    {
        list<opportunity> oppoOctRec = new list<opportunity>();
        oppoOctRec = [ SELECT Id, Name,StageName, closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =10];
        return oppoOctRec;
    }
    @AuraEnabled(cacheable=true)
    Public static list<opportunity> getOppoNov()
    {
        list<opportunity> oppoNovRec = new list<opportunity>();
        oppoNovRec = [ SELECT Id, Name,StageName, closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =11];
        return oppoNovRec;
    }
    @AuraEnabled(cacheable=true)
    Public static list<opportunity> getOppoDec()
    {
        list<opportunity> oppoDecRec = new list<opportunity>();
        oppoDecRec = [ SELECT Id, Name,StageName, closeDate FROM opportunity where CALENDAR_MONTH(CloseDate) =12];
        return oppoDecRec;
    }
}