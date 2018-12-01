/**
 * Created by elatoszek001 on 01.12.2018.
 */
({
    handleSelection: function(component) {
        var paymentMethodIds = [ 'dotPay', 'payU', 'blik', 'card' ];
        var paymentMethodId = component.get('v.paymentMethod');
        paymentMethodIds.forEach(function(element) {
            if (element != paymentMethodId) {
                $A.util.removeClass(component.find(element), 'payment-method-selected');
                $A.util.addClass(component.find(element), 'payment-method');
            } else {
                $A.util.addClass(component.find(paymentMethodId), 'payment-method-selected');
                $A.util.removeClass(component.find(paymentMethodId), 'payment-method');

            }
        });
    }
})