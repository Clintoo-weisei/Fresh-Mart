function PaymentSuccess({ isVisible, amount, method, onClose }) {
    try {
        if (!isVisible) return null;

        React.useEffect(() => {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }, [onClose]);

        return (
            <div data-name="payment-success-overlay" className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 rounded-2xl shadow-2xl p-8 w-96 border-4 border-green-400 animate-bounce">
                    <div className="text-center">
                        <div className="text-6xl mb-4 animate-pulse">✅</div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                            🎉 Payment Successful!
                        </h2>
                        
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl mb-4 shadow-lg">
                            <p className="text-lg font-bold">💰 Ksh {amount?.toFixed(2)}</p>
                            <p className="text-sm opacity-90">Payment Method: {method}</p>
                        </div>

                        <div className="bg-gradient-to-r from-yellow-200 to-orange-200 p-3 rounded-lg border-2 border-yellow-400 mb-4">
                            <p className="text-sm font-bold text-orange-800">🧾 Transaction completed successfully!</p>
                            <p className="text-xs text-gray-600">Receipt will be generated automatically</p>
                        </div>

                        <div className="flex justify-center space-x-2 text-2xl animate-pulse">
                            <span>🎊</span><span>🎉</span><span>✨</span><span>🎊</span><span>🎉</span>
                        </div>

                        <button
                            onClick={onClose}
                            className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
                        >
                            ✅ Continue
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('PaymentSuccess component error:', error);
        return null;
    }
}