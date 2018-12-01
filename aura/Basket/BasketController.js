/**
 * Created by elatoszek001 on 01.12.2018.
 */
({
    doInit: function (component, event, helper) {
        helper.defineSteps(component);
        helper.retrieveData(component);
    },

    handleRemoveItem: function (component, event, helper) {
        var productId = event.getParam('productId');
        var data = component.get('v.data');
        var newList = [];

        data.entries.forEach(function(element) {
            if (element.Product2.Id != productId) {
                newList.push(element);
            }
        });
        data.entries = newList;
        component.set('v.data', data);
    },

    handleBack: function (component, event, helper) {
        component.set('v.currentStep', component.get('v.currentStep') - 1);
    },

    handleNext: function (component, event, helper) {
        component.set('v.currentStep', component.get('v.currentStep') + 1);
    },

    handleSave: function (component, event, helper) {
        var action = component.get("c.save");

        action.setParams({
            "jsonData": JSON.stringify(component.get("v.data"))
        });

        action.setCallback(this, function (response) {
            var state = response.getState();

            if (state == 'SUCCESS') {
                var orderNumber = response.getReturnValue();
                if (orderNumber != null) {
                    helper.createToast(component, 'Gratuluję', 'Twoje zamówienie zostało złożone. Numer zamówienia to: ' + orderNumber, true, true).fire();
                } else {
                    helper.createToast(component, 'Grrr', 'Coś poszło nie tak. Spróbuj raz jeszcze lub skontaktuj się z naszym supportem.', false, true).fire();
                }
            }
        });

        $A.enqueueAction(action);
    }
})