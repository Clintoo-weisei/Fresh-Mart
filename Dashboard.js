function Dashboard({ onAddProduct, categories }) {
    try {
        const [selectedCategory, setSelectedCategory] = React.useState('vegetables');

        const expandedProducts = window.categoryData || {};
        const currentProducts = expandedProducts[selectedCategory]?.products || [];
        const currentCategory = expandedProducts[selectedCategory];

        const getStockPercentage = (stock) => {
            const maxStock = 100;
            return Math.min((stock / maxStock) * 100, 100);
        };

        const getStockColor = (stock) => {
            if (stock > 50) return 'bg-green-500';
            if (stock > 25) return 'bg-yellow-500';
            return 'bg-red-500';
        };

        return (
            <div data-name="dashboard" className="bg-gold rounded-2xl shadow-2xl p-6 border-2 border-gray-200 transition-all duration-500">
                <div data-name="dashboard-header" className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                        <i className="fas fa-store mr-3 text-blue-600 text-3xl"></i>
                        🏪 Product Catalog
                    </h2>
                    
                    <div data-name="category-tabs" className="flex flex-wrap gap-3 mb-6">
                        {Object.entries(expandedProducts).map(([key, category]) => (
                            <button
                                key={key}
                                onClick={() => setSelectedCategory(key)}
                                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 text-sm shadow-lg ${
                                    selectedCategory === key 
                                        ? `${category.color} text-white shadow-xl scale-105 border-2 border-white` 
                                        : `bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:shadow-lg border border-gray-300 hover:from-gray-50 hover:to-gray-100`
                                }`}
                            >
                                <i className={`${category.icon} mr-2`}></i>
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div data-name="products-grid" className="overflow-y-auto max-h-[60vh] scrollbar-hide">
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-4">
                        {currentProducts.map((product, index) => (
                            <div
                                key={index}
                                onClick={() => onAddProduct(product)}
                                className="bg-white p-3 rounded-lg cursor-pointer transition-all duration-300 transform hover:shadow-lg hover:scale-105 border-2 border-gray-200 hover:border-blue-400 group min-h-[120px] flex flex-col justify-between"
                            >
                                <div className="text-center flex-1">
                                    <div className="text-2xl mb-2 group-hover:animate-pulse">{product.icon}</div>
                                    <h4 className="font-bold text-xs text-blue-800 mb-1 group-hover:text-purple-600 leading-tight line-clamp-2">{product.name}</h4>
                                    <p className="text-sm font-bold text-emerald-600 mb-1">Ksh {product.price}</p>
                                    <p className="text-xs text-orange-600 font-semibold">Stock: {product.stock}</p>
                                    
                                    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2">
                                        <div 
                                            className={`h-full rounded-full transition-all ${getStockColor(product.stock)}`}
                                            style={{ width: `${getStockPercentage(product.stock)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {currentProducts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <i className="fas fa-box-open text-4xl mb-3 text-gray-300"></i>
                        <p className="text-lg font-semibold">No products available</p>
                        <p className="text-sm">Please check back later</p>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Dashboard component error:', error);
        return null;
    }
}