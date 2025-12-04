function PopupCart({ items, onClose, onDeleteItem, onPayment }) {
    try {
        if (!window.calculations) {
            return <div>Loading calculations...</div>;
        }

        const { calculateSubtotal, calculateTax, calculateTotal } = window.calculations;
        const subtotal = calculateSubtotal(items);
        const tax = calculateTax(subtotal);
        const total = calculateTotal(subtotal, tax);

        const generateTransactionCode = () => {
            return 'SKM' + Math.random().toString(36).substr(2, 8).toUpperCase();
        };

        const handleCardPayment = () => {
            const transactionCode = generateTransactionCode();
            onPayment('Card', total, `Card Payment, Ref: ${transactionCode}`);
            onClose();
        };

        return (
            <div data-name="popup-cart-overlay" className="fixed inset-0 bg-gradient-to-br from-black/60 via-purple-900/50 to-pink-900/60 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 rounded-2xl shadow-2xl p-6 w-[700px] max-h-[90vh] overflow-y-auto border-4 border-gradient-to-r from-orange-400 to-red-400">
                    
                    <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-xl">
                        <h3 className="text-xl font-bold text-white flex items-center">
                            🛒 <span className="ml-2">Shopping Cart ({items.length})</span>
                        </h3>
                        <button onClick={onClose} className="text-white hover:text-red-200 bg-red-500/30 hover:bg-red-500/50 p-2 rounded-lg transition-all">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>

                    <div className="max-h-48 overflow-y-auto mb-4 scrollbar-hide">
                        {items.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <i className="fas fa-shopping-cart text-4xl mb-3 text-orange-300"></i>
                                <p className="text-lg font-semibold">🛒 Cart is empty</p>
                            </div>
                        ) : (
                            items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-gradient-to-r from-white via-orange-50 to-red-50 rounded-xl mb-2 shadow-md border-2 border-orange-200">
                                    <div className="flex items-center flex-1">
                                        <span className="mr-3 text-2xl">{item.icon}</span>
                                        <div>
                                            <p className="font-bold text-sm text-orange-800">{item.name}</p>
                                            <p className="text-xs text-gray-600">{item.quantity} × Ksh {item.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-bold text-lg text-emerald-600 bg-emerald-100 px-2 py-1 rounded border">
                                            Ksh {(item.quantity * item.price).toFixed(2)}
                                        </span>
                                        <button onClick={() => onDeleteItem(index)} className="text-red-500 hover:text-red-700 bg-red-100 hover:bg-red-200 rounded p-2 transition-all">
                                            <i className="fas fa-trash text-xs"></i>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {items.length > 0 && (
                        <div className="bg-gradient-to-r from-orange-100 via-red-100 to-pink-100 p-4 rounded-xl mb-4 border-2 border-orange-300">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm bg-white/70 p-2 rounded">
                                    <span>💰 Subtotal:</span>
                                    <span className="font-bold text-blue-600">Ksh {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm bg-white/70 p-2 rounded">
                                    <span>🏷️ Tax (8%):</span>
                                    <span className="font-bold text-orange-600">Ksh {tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg bg-gradient-to-r from-orange-500 to-red-600 text-white p-3 rounded shadow-lg">
                                    <span>💸 TOTAL:</span>
                                    <span>Ksh {total.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button
                                    onClick={handleCardPayment}
                                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white p-3 rounded-lg font-bold hover:from-purple-600 hover:to-purple-700"
                                >
                                    💳 Quick Card Payment
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('PopupCart component error:', error);
        return null;
    }
}