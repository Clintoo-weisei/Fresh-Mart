function SalesPage({ onBack }) {
    try {
        const [salesData] = React.useState({
            todaySales: 45680,
            totalTransactions: 127,
            averageTransaction: 359.68,
            topProducts: [
                { name: 'Fresh Milk 1L', sales: 45, revenue: 2700, icon: '🥛' },
                { name: 'White Bread', sales: 38, revenue: 2280, icon: '🍞' },
                { name: 'Beef Steak 1kg', sales: 12, revenue: 9600, icon: '🥩' },
                { name: 'Bananas 1kg', sales: 35, revenue: 3500, icon: '🍌' },
                { name: 'Coca Cola 500ml', sales: 67, revenue: 3350, icon: '🥤' }
            ]
        });

        return (
            <div data-name="sales-page" className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-100">
                <div data-name="sales-header" className="bg-gradient-to-r from-purple-500 via-blue-600 to-indigo-600 shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-white">
                                <i className="fas fa-chart-line mr-3 text-yellow-300"></i>
                                📊 Sales Dashboard
                            </h1>
                            <button onClick={onBack} className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-white hover:bg-opacity-30 transition-all">
                                <i className="fas fa-arrow-left mr-2"></i>Back
                            </button>
                        </div>
                    </div>
                </div>

                <main data-name="sales-content" className="max-w-7xl mx-auto px-4 py-8">
                    <div data-name="sales-summary" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                            <h3 className="text-lg font-semibold text-gray-800">💰 Today's Sales</h3>
                            <p className="text-3xl font-bold text-green-600">Ksh {salesData.todaySales.toLocaleString()}</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                            <h3 className="text-lg font-semibold text-gray-800">📦 Transactions</h3>
                            <p className="text-3xl font-bold text-blue-600">{salesData.totalTransactions}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
                            <h3 className="text-lg font-semibold text-gray-800">📈 Average Sale</h3>
                            <p className="text-3xl font-bold text-purple-600">Ksh {salesData.averageTransaction}</p>
                        </div>
                    </div>

                    <div data-name="top-products" className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-lg p-6 border-2 border-purple-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <i className="fas fa-trophy mr-3 text-yellow-500"></i>
                            🏆 Top Selling Products
                        </h2>
                        <div className="grid gap-4">
                            {salesData.topProducts.map((product, index) => (
                                <div key={index} className="bg-gradient-to-r from-white to-gray-50 p-4 rounded-lg shadow-md border-l-4 border-yellow-400">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <span className="text-3xl">{product.icon}</span>
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                                                <p className="text-sm text-gray-600">Units Sold: {product.sales}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-green-600">Ksh {product.revenue.toLocaleString()}</p>
                                            <p className="text-sm text-gray-600">Revenue</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        );
    } catch (error) {
        console.error('SalesPage component error:', error);
        return null;
    }
}