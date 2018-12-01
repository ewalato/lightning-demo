/**
 * Created by elatoszek001 on 01.12.2018.
 */
({
    removeItem: function (component, event, helper) {
        var productId = event.getSource().get('v.value');
        var event = component.getEvent("removeItem");
        
        event.setParams({
            "productId": productId
        });

        event.fire();
    }
})