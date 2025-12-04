function ItemList({ items, onDeleteItem, onPaymentComplete, paymentCompleted, onConfirmTransaction, onShowReceipt }) {
    try {
        if (!window.calculations) {
            return <div>Loading calculations...</div>;
        }

        const { calculateSubtotal, calculateTax, calculateTotal } = window.calculations;
        const subtotal = calculateSubtotal(items);
        const tax = calculateTax(subtotal);
        const total = calculateTotal(subtotal, tax);

        return (
            <div data-name="item-list" className="bg-gradient-to-br from-orange-100 via-red-100 to-pink-100 rounded-xl shadow-lg p-4 border-2 border-orange-300 relative w-full max-w-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center">
                        🛒 Cart ({items.length})
                    </h3>
                    {paymentCompleted && (
                        <button 
                            onClick={onConfirmTransaction}
                            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-lg text-sm hover:from-orange-600 hover:to-red-700 shadow-lg font-semibold"
                        >
                            ✓ New Sale
                        </button>
                    )}
                </div>

                <div className="max-h-48 overflow-y-auto mb-4 scrollbar-hide">
                    {items.length === 0 ? (
                        <div className="text-center py-6 text-gray-500">
                            <div className="text-4xl mb-2">🛒</div>
                            <p className="text-sm font-semibold">Cart is empty</p>
                        </div>
                    ) : (
                        items.map((item, index) => (
                            <div key={index} className="cart-item bg-gradient-to-r from-white to-orange-50 border-2 border-orange-200 rounded-lg p-3 mb-2 shadow-md hover:shadow-lg transition-all">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center flex-1">
                                        <span className="mr-2 text-xl">{item.icon}</span>
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm text-orange-800">{item.name}</p>
                                            <p className="text-xs text-gray-600">{item.quantity} × Ksh {item.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
                                            Ksh {(item.quantity * item.price).toFixed(2)}
                                        </span>
                                        <button onClick={() => onDeleteItem(index)} className="text-red-500 hover:text-red-700 bg-red-100 hover:bg-red-200 rounded p-1 transition-all">
                                            <i className="fas fa-trash text-xs"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-3 rounded-lg border border-orange-200 mb-4">
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span className="font-bold text-green-600">Ksh {subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax (8%):</span>
                                <span className="font-bold text-orange-600">Ksh {tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between bg-gradient-to-r from-orange-500 to-red-600 text-white p-2 rounded font-bold">
                                <span>TOTAL:</span>
                                <span>Ksh {total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                )}

                {paymentCompleted && (
                    <div className="text-center">
                        <button
                            onClick={onShowReceipt}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 shadow-lg w-full"
                        >
                            📄 Show Receipt
                        </button>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('ItemList component error:', error);
        return null;
    }
}