function PaymentDashboard({ onClose }) {
    try {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl">
                        <h3 className="text-xl font-bold">💳 Payment Dashboard</h3>
                        <button onClick={onClose} className="text-white hover:text-gray-200">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div className="p-6 text-center">
                        <p className="text-gray-600">Payment dashboard features coming soon...</p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('PaymentDashboard component error:', error);
        return null;
    }
}