function PaymentButtonsSection({ cartItems, total, onPaymentComplete }) {
    try {
        return (
            <div className="payment-buttons-section mt-6">
                <div className="bg-gradient-to-r from-orange-100 via-red-100 to-pink-100 p-4 rounded-xl border-2 border-orange-300 shadow-lg">
                    <h3 className="text-center font-bold text-lg bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
                        💳 Quick Payment - Total: Ksh {total?.toFixed(2)}
                    </h3>
                    <p className="text-gray-600 text-sm text-center">Payment buttons features coming soon...</p>
                </div>
            </div>
        );
    } catch (error) {
        console.error('PaymentButtonsSection component error:', error);
        return null;
    }
}