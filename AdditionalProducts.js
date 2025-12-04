function AdditionalProducts({ onAddProduct }) {
    try {
        return (
            <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-cyan-100 rounded-xl shadow-lg p-4 border-2 border-purple-300">
                <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-3">
                    ⭐ Additional Products
                </h3>
                <p className="text-gray-600 text-sm">Additional products features coming soon...</p>
            </div>
        );
    } catch (error) {
        console.error('AdditionalProducts component error:', error);
        return null;
    }
}