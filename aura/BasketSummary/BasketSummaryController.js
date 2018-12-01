/**
 * Created by elatoszek001 on 01.12.2018.
 */
({
    init: function (component, event, helper) {
        var products = component.get('v.products');
        var amount = 0;

        products.forEach(function(product) {
            amount += product.UnitPrice;
        });

        amount = parseFloat(Math.round(amount * 100) / 100).toFixed(2);
        component.set('v.amount', amount);
    }
})