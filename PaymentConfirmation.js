function PaymentConfirmation({ isVisible, items, total, paymentMethod, customerName, cashAmount, onConfirm, onCancel }) {
    try {
        if (!isVisible) return null;

        const change = paymentMethod === 'Cash' && cashAmount ? (parseFloat(cashAmount) - total).toFixed(2) : '0.00';

        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-2xl p-6 w-[500px] max-h-[80vh] overflow-y-auto border-4 border-gradient-to-r from-blue-400 to-purple-400">
                    <div className="text-center mb-4">
                        <div className="text-6xl mb-3">💳</div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Confirm Payment
                        </h2>
                    </div>

                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-xl mb-4 border-2 border-blue-300">
                        <h3 className="font-bold text-blue-800 mb-2">🛍️ Order Summary</h3>
                        <div className="max-h-32 overflow-y-auto scrollbar-hide space-y-1">
                            {items.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                    <span>{item.icon} {item.name} x{item.quantity}</span>
                                    <span className="font-bold text-green-600">Ksh {(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-blue-300 mt-2 pt-2">
                            <div className="flex justify-between font-bold text-lg text-blue-800">
                                <span>Total:</span>
                                <span>Ksh {total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl mb-4 border-2 border-green-300">
                        <h3 className="font-bold text-green-800 mb-2">💰 Payment Details</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-purple-700">Payment Method:</span>
                                <span className="font-bold text-blue-600">{paymentMethod}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-purple-700">Customer:</span>
                                <span className="font-bold text-green-600">{customerName || 'Walk-in Customer'}</span>
                            </div>
                            {paymentMethod === 'Cash' && (
                                <>
                                    <div className="flex justify-between">
                                        <span className="text-purple-700">Cash Received:</span>
                                        <span className="font-bold text-green-600">Ksh {cashAmount}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-purple-700">Change:</span>
                                        <span className="font-bold text-orange-600">Ksh {change}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={onCancel}
                            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-bold hover:from-red-600 hover:to-red-700 transition-all"
                        >
                            ❌ Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-all"
                        >
                            ✅ Confirm Payment
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('PaymentConfirmation component error:', error);
        return null;
    }
}