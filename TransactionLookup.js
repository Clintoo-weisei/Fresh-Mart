function TransactionLookup() {
    try {
        return (
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-lg p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">🔍 Transaction Lookup</h3>
                <p className="text-gray-600 text-sm">Transaction lookup features coming soon...</p>
            </div>
        );
    } catch (error) {
        console.error('TransactionLookup component error:', error);
        return null;
    }
}