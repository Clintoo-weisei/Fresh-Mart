function Sidebar({ onAddProduct }) {
    try {
        return (
            <div data-name="sidebar" className="absolute right-0 top-20 bottom-20 w-80 bg-gradient-to-b from-purple-50 to-blue-50 border-l border-gray-200 p-4 overflow-y-auto z-30">
                <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Sidebar</h3>
                <p className="text-gray-600">Additional features coming soon...</p>
            </div>
        );
    } catch (error) {
        console.error('Sidebar component error:', error);
        return null;
    }
}