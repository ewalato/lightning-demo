/**
 * Created by elatoszek001 on 01.12.2018.
 */
({
    handleAddressChange: function (component, event, helper) {
        component.set('v.editMode', true);
        helper.handleSelection(component);
    },

    selectedPaymentMethod: function (component, event, helper) {
        component.set('v.paymentMethod', event.target.value);
        helper.handleSelection(component);
    }
})