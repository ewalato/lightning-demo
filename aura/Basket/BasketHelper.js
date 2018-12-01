/**
 * Created by elatoszek001 on 01.12.2018.
 */
({
    defineSteps: function (component) {
        var steps = [
            { name: 'products', value: 0 },
            { name: 'shipping', value: 1 },
            { name: 'summary', value: 2 }
        ];
        component.set('v.steps', steps)
    },

    retrieveData: function (component) {
        var action = component.get("c.fetchData");

        action.setCallback(this, function (response) {
            var state = response.getState();

            if (state == 'SUCCESS') {
                component.set('v.data', response.getReturnValue());
            }
        });

        $A.enqueueAction(action);
    },

    createToast: function (component, title, msg, isSuccess, isDismissible) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: title,
            message: msg,
            duration: '3000',
            type: isSuccess ? 'success' : 'error',
            mode: isDismissible ? 'dismissible' : 'pester'
        });
        return toastEvent;
    }
})