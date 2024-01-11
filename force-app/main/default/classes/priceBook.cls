public with sharing class priceBook {
    public priceBook() {

    }

/*@AuraEnabled(cacheable=true)
public static List<Product2> getProducts() {
    List<PriceBookEntry> pEntries = [SELECT Id, Product2Id, Product2.Name, Product2.IsActive FROM PricebookEntry WHERE Pricebook2Id='01s5j000002eU94AAE'];
    List<Product2> products = new List<Product2>();
    for (PriceBookEntry pEntry: pEntries) {
        Product2 aProduct = new Product2();
        aProduct.Id = pEntry.Product2Id;
        aProduct.Name = pEntry.Product2.Name;
        aProduct.IsActive = pEntry.Product2.IsActive;
        // add any additional fields from your query.
        products.add(aProduct);
    }
    for(Product2 productObj: products){
        system.debug('productObj:'+productObj);
        } 
    System.debug('product:'+products);

    return products;
    
}
@AuraEnabled(cacheable=true)
    public static List<sobject> findRecords(String searchKey, String objectName) {
      string searchText = '\'' + String.escapeSingleQuotes(searchKey) + '%\'';
      string query = 'SELECT Id, Name FROM ' +objectName+ ' WHERE Name LIKE '+searchText+' LIMIT 6';
     // return Database.query('SELECT Id, Name FROM ' +objectName+ ' WHERE Name LIKE '+searchText+' LIMIT 6');
     return Database.query(query);
    } */
    @AuraEnabled(cacheable=true)
    public static List<Product2> getProducts(string searchString) {
        string keyString = '%'+searchString+'%';
        List<PriceBookEntry> pEntries = [SELECT Id, Product2Id, Product2.Name,Name, Product2.IsActive FROM PricebookEntry WHERE Pricebook2Id='01s5j000002eU94AAE' AND Name like:keyString ];
        List<Product2> products = new List<Product2>();
        for (PriceBookEntry pEntry: pEntries) {
            Product2 aProduct = new Product2();
            aProduct.Id = pEntry.Product2Id;
            aProduct.Name = pEntry.Product2.Name;
            aProduct.IsActive = pEntry.Product2.IsActive;
            // add any additional fields from your query.
            products.add(aProduct);
        }
        System.debug('products'+products);
        return products;
    }
 
}