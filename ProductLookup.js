function ProductLookup({ onAddProduct, onClose }) {
    try {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 pt-20">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="text-lg font-bold text-gray-800">🔍 Product Lookup</h3>
                        <button onClick={onClose} className="text-red-500 hover:text-red-700">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div className="p-6 text-center">
                        <p className="text-gray-600">Product lookup features coming soon...</p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ProductLookup component error:', error);
        return null;
    }
}