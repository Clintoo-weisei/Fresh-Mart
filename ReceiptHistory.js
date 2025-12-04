function ReceiptHistory({ onClose }) {
    try {
        const [receipts, setReceipts] = React.useState([]);
        const [searchTerm, setSearchTerm] = React.useState('');

        React.useEffect(() => {
            const savedReceipts = JSON.parse(localStorage.getItem('receiptHistory') || '[]');
            setReceipts(savedReceipts);
        }, []);

        const filteredReceipts = receipts.filter(receipt => 
            receipt.receiptCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            receipt.paymentMethod?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            receipt.cashier?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const viewReceiptDetails = (receipt) => {
            alert(`Receipt: ${receipt.receiptCode}\nDate: ${receipt.date}\nTotal: Ksh ${receipt.total}\nMethod: ${receipt.paymentMethod}\nCashier: ${receipt.cashier}\nItems: ${receipt.items?.length || 0}`);
        };

        const deleteReceipt = (receiptCode) => {
            const updatedReceipts = receipts.filter(r => r.receiptCode !== receiptCode);
            setReceipts(updatedReceipts);
            localStorage.setItem('receiptHistory', JSON.stringify(updatedReceipts));
        };

        return (
            <div data-name="receipt-history-overlay" className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-end z-50">
                <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 w-96 h-full shadow-2xl overflow-y-auto border-l-4 border-gradient-to-b from-purple-400 to-pink-400">
                    <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 p-4 border-b-2 border-purple-300">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white flex items-center">
                                📄 <span className="ml-2">Receipt History ({receipts.length})</span>
                            </h3>
                            <button onClick={onClose} className="text-white hover:text-red-200 bg-red-500/30 hover:bg-red-500/50 p-2 rounded-lg transition-all">
                                <i className="fas fa-times text-lg"></i>
                            </button>
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search receipts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-3 border-2 border-purple-300 rounded-lg bg-gradient-to-r from-white to-purple-50 text-sm"
                            />
                        </div>

                        <div className="space-y-3">
                            {filteredReceipts.length === 0 ? (
                                <div className="text-center py-8 text-purple-500">
                                    <i className="fas fa-receipt text-4xl mb-3 text-purple-300"></i>
                                    <p className="text-lg font-semibold">📄 No receipts found</p>
                                    <p className="text-sm text-gray-600">Complete transactions to see history</p>
                                </div>
                            ) : (
                                filteredReceipts.map((receipt, index) => (
                                    <div key={index} className="bg-gradient-to-r from-white via-blue-50 to-purple-50 rounded-lg p-3 shadow-sm border-2 border-purple-200">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h4 className="font-bold text-sm bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center">
                                                    🧾 {receipt.receiptCode}
                                                </h4>
                                                <div className="grid grid-cols-1 gap-1 mt-2 text-xs">
                                                    <p><span className="font-semibold text-gray-600">📅</span> {receipt.date}</p>
                                                    <p><span className="font-semibold text-gray-600">💰</span> <span className="text-green-600 font-bold">Ksh {receipt.total}</span></p>
                                                    <p><span className="font-semibold text-gray-600">💳</span> <span className="text-blue-600 font-bold">{receipt.paymentMethod}</span></p>
                                                    <p><span className="font-semibold text-gray-600">👤</span> {receipt.cashier}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2 mt-3">
                                            <button onClick={() => viewReceiptDetails(receipt)} className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded text-xs hover:from-blue-600 hover:to-blue-700">
                                                👁️ View
                                            </button>
                                            <button onClick={() => deleteReceipt(receipt.receiptCode)} className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded text-xs hover:from-red-600 hover:to-red-700">
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ReceiptHistory component error:', error);
        return null;
    }
}