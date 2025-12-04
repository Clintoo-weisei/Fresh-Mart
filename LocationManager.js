function LocationManager({ onBack }) {
    try {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-white">📍 Location Management</h1>
                            <button onClick={onBack} className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-white hover:bg-opacity-30">
                                <i className="fas fa-arrow-left mr-2"></i>Back
                            </button>
                        </div>
                    </div>
                </div>
                <div className="p-8 text-center">
                    <p className="text-gray-600">Location management features coming soon...</p>
                </div>
            </div>
        );
    } catch (error) {
        console.error('LocationManager component error:', error);
        return null;
    }
}