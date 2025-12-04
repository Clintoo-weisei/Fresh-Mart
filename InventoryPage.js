function InventoryPage({ onBack }) {
    try {
        const [inventory] = React.useState([
            { code: 'VG001', name: 'Tomatoes 1kg', stock: 45, price: 80, category: 'Vegetables', expiry: '2024-12-25', icon: '🍅' },
            { code: 'FR001', name: 'Apples 1kg', stock: 60, price: 180, category: 'Fruits', expiry: '2024-12-30', icon: '🍎' },
            { code: 'DY001', name: 'Fresh Milk 1L', stock: 50, price: 60, category: 'Dairy', expiry: '2024-12-25', icon: '🥛' },
            { code: 'BK001', name: 'White Bread 800g', stock: 50, price: 60, category: 'Bakery', expiry: '2024-12-22', icon: '🍞' },
            { code: 'BV001', name: 'Coca Cola 500ml', stock: 100, price: 50, category: 'Beverages', expiry: '2025-06-15', icon: '🥤' }
        ]);

        const getCategoryColor = (category) => {
            const colors = {
                'Vegetables': 'bg-gradient-to-r from-green-400 to-emerald-500',
                'Fruits': 'bg-gradient-to-r from-red-400 to-pink-500',
                'Dairy': 'bg-gradient-to-r from-blue-400 to-cyan-500',
                'Bakery': 'bg-gradient-to-r from-amber-400 to-orange-500',
                'Beverages': 'bg-gradient-to-r from-purple-400 to-indigo-500'
            };
            return colors[category] || 'bg-gradient-to-r from-gray-400 to-gray-500';
        };

        const getStockStatus = (stock) => {
            if (stock > 50) return { text: 'In Stock', color: 'text-green-600' };
            if (stock > 25) return { text: 'Low Stock', color: 'text-yellow-600' };
            return { text: 'Critical', color: 'text-red-600' };
        };

        return (
            <div data-name="inventory-page" className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-100">
                <div data-name="inventory-header" className="bg-gradient-to-r from-green-500 via-blue-600 to-purple-600 shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-white">
                                <i className="fas fa-boxes mr-3 text-yellow-300"></i>
                                📦 Inventory Management
                            </h1>
                            <button onClick={onBack} className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-white hover:bg-opacity-30 transition-all">
                                <i className="fas fa-arrow-left mr-2"></i>Back
                            </button>
                        </div>
                    </div>
                </div>

                <main data-name="inventory-content" className="max-w-7xl mx-auto px-4 py-8">
                    <div data-name="inventory-summary" className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                            <h3 className="text-lg font-semibold text-gray-800">📊 Total Items</h3>
                            <p className="text-3xl font-bold text-green-600">{inventory.length}</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                            <h3 className="text-lg font-semibold text-gray-800">📦 Total Stock</h3>
                            <p className="text-3xl font-bold text-blue-600">{inventory.reduce((sum, item) => sum + item.stock, 0)}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
                            <h3 className="text-lg font-semibold text-gray-800">💰 Total Value</h3>
                            <p className="text-3xl font-bold text-purple-600">Ksh {inventory.reduce((sum, item) => sum + (item.stock * item.price), 0).toLocaleString()}</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
                            <h3 className="text-lg font-semibold text-gray-800">🏷️ Categories</h3>
                            <p className="text-3xl font-bold text-orange-600">5</p>
                        </div>
                    </div>

                    <div data-name="inventory-table" className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-lg p-6 border-2 border-purple-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <i className="fas fa-list mr-3 text-purple-600"></i>
                            📋 Stock Overview
                        </h2>
                        <div className="grid gap-4">
                            {inventory.map((item) => {
                                const stockStatus = getStockStatus(item.stock);
                                return (
                                    <div key={item.code} className="bg-gradient-to-r from-white to-gray-50 p-4 rounded-lg shadow-md border-l-4 border-purple-400">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <span className="text-3xl">{item.icon}</span>
                                                <div>
                                                    <h3 className="font-bold text-lg text-blue-800">{item.name}</h3>
                                                    <p className="text-sm text-gray-600">Code: {item.code}</p>
                                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${getCategoryColor(item.category)}`}>
                                                        {item.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-green-600">Ksh {item.price}</p>
                                                <p className={`text-sm font-bold ${stockStatus.color}`}>Stock: {item.stock} ({stockStatus.text})</p>
                                                <p className="text-xs text-red-500 font-semibold">Exp: {item.expiry}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div>
        );
    } catch (error) {
        console.error('InventoryPage component error:', error);
        return null;
    }
}