function RightPaymentPanel({ cartItems, total, onPaymentComplete }) {
    try {
        return (
            <div className="fixed right-0 top-16 bottom-0 w-80 bg-gradient-to-b from-green-50 via-emerald-50 to-teal-50 border-l-4 border-emerald-400 shadow-2xl z-40 overflow-y-auto">
                <div className="p-4">
                    <h2 className="text-xl font-bold text-center text-emerald-600 mb-4">💳 Payment Panel</h2>
                    <p className="text-gray-600 text-sm text-center">Payment panel features coming soon...</p>
                </div>
            </div>
        );
    } catch (error) {
        console.error('RightPaymentPanel component error:', error);
        return null;
    }
}