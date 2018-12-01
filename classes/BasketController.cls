/**
 * Created by elatoszek001 on 01.12.2018.
 */

public with sharing class BasketController {

    @auraEnabled
    public static BasketData fetchData() {
        BasketData data = new BasketData();

        data.entries =
        [
            SELECT
                Id,
                UnitPrice,
                Pricebook2Id,
                Product2Id,
                Product2.Name,
                Product2.Author__c,
                Product2.Image__c,
                Product2.Description,
                Product2.Format__c
            FROM PricebookEntry
        ];

        data.account =
        [
            SELECT
                Id,
                ShippingStreet,
                ShippingState,
                ShippingPostalCode,
                ShippingCountry,
                ShippingCity
            FROM Account
            WHERE Name = 'Ewa Latoszek'];

        return data;
    }

    @auraEnabled
    public static String save(String jsonData) {
        BasketData data = (BasketData) JSON.deserialize(jsonData, BasketData.class);
        try {
            Order newOrder = new Order();
            newOrder.Status = 'Draft';
            newOrder.EffectiveDate = Date.today();
            newOrder.Pricebook2Id = data.entries.get(0).Pricebook2Id;
            newOrder.AccountId = data.account.Id;
            newOrder.ShippingStreet = data.account.ShippingStreet;
            newOrder.ShippingState = data.account.ShippingState;
            newOrder.ShippingPostalCode = data.account.ShippingPostalCode;
            newOrder.ShippingCountry = data.account.ShippingCountry;
            newOrder.ShippingCity = data.account.ShippingCity;
            insert newOrder;

            List<OrderItem> items = new List<OrderItem>();
            for (PricebookEntry entry : data.entries) {
                OrderItem item = new OrderItem();
                item.Product2Id = entry.Product2Id;
                item.PricebookEntryId = entry.Id;
                item.Quantity = 1;
                item.UnitPrice = entry.UnitPrice;
                item.OrderId = newOrder.Id;
                items.add(item);
            }
            insert items;

            return [SELECT Id, OrderNumber FROM Order WHERE Id = :newOrder.Id LIMIT 1].OrderNumber;
        } catch (Exception ex) {
            return null;
        }
    }

    public class BasketData {

        @auraEnabled
        public List<PricebookEntry> entries { get; set; }

        @auraEnabled
        public Account account { get; set; }

        @auraEnabled
        public String paymentMethod { get; set; }
    }
}