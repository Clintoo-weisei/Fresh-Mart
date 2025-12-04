window.calculations = {
    calculateSubtotal: (items) => {
        try {
            if (!items || !Array.isArray(items)) return 0;
            return items.reduce((total, item) => {
                const quantity = parseFloat(item.quantity) || 0;
                const price = parseFloat(item.price) || 0;
                return total + (quantity * price);
            }, 0);
        } catch (error) {
            console.error('Error calculating subtotal:', error);
            return 0;
        }
    },

    calculateTax: (subtotal, taxRate = 0.08) => {
        try {
            const amount = parseFloat(subtotal) || 0;
            const rate = parseFloat(taxRate) || 0.08;
            return amount * rate;
        } catch (error) {
            console.error('Error calculating tax:', error);
            return 0;
        }
    },

    calculateTotal: (subtotal, tax) => {
        try {
            const sub = parseFloat(subtotal) || 0;
            const taxAmount = parseFloat(tax) || 0;
            return sub + taxAmount;
        } catch (error) {
            console.error('Error calculating total:', error);
            return 0;
        }
    },

    calculateDiscount: (amount, discountPercent) => {
        try {
            const price = parseFloat(amount) || 0;
            const discount = parseFloat(discountPercent) || 0;
            return price * (discount / 100);
        } catch (error) {
            console.error('Error calculating discount:', error);
            return 0;
        }
    },

    calculateChange: (amountPaid, total) => {
        try {
            const paid = parseFloat(amountPaid) || 0;
            const totalAmount = parseFloat(total) || 0;
            return Math.max(0, paid - totalAmount);
        } catch (error) {
            console.error('Error calculating change:', error);
            return 0;
        }
    },

    formatCurrency: (amount, currency = 'KSH') => {
        try {
            const value = parseFloat(amount) || 0;
            return `${currency} ${value.toFixed(2)}`;
        } catch (error) {
            console.error('Error formatting currency:', error);
            return `${currency} 0.00`;
        }
    }
};