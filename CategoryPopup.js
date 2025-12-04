function CategoryPopup({ isVisible, categoryKey, categoryData, onClose, onAddProduct }) {
    try {
        if (!isVisible || !categoryData) return null;

        const [currentTime, setCurrentTime] = React.useState(new Date().toLocaleTimeString());
        const [currentDate, setCurrentDate] = React.useState(new Date().toLocaleDateString());

        React.useEffect(() => {
            const timer = setInterval(() => {
                const now = new Date();
                setCurrentTime(now.toLocaleTimeString());
                setCurrentDate(now.toLocaleDateString());
            }, 1000);
            return () => clearInterval(timer);
        }, []);

        return (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
                    
                    <header className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 shadow-lg border-b-2 border-violet-400 rounded-t-2xl">
                        <div className="w-full px-4 py-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="text-white flex items-center bg-gradient-to-r from-pink-100/20 to-violet-100/20 p-2 rounded-lg backdrop-blur-sm border border-white/30">
                                        <h1 className="text-lg md:text-xl font-bold mr-3">
                                            <span className="bg-gradient-to-r from-yellow-200 to-orange-300 bg-clip-text text-transparent">{categoryData.name}</span> 
                                            <span className="bg-gradient-to-r from-pink-200 to-rose-300 bg-clip-text text-transparent">Products</span>
                                        </h1>
                                        <div className="flex space-x-1 text-sm animate-pulse">
                                            <span>🥕</span><span>🥬</span><span>🍅</span><span>🧅</span>
                                            <span>🍎</span><span>🍌</span><span>🥛</span><span>🍞</span>
                                        </div>
                                    </div>

                                    <div className="text-white text-center bg-gradient-to-r from-amber-100/20 to-orange-100/20 p-2 rounded-lg backdrop-blur-sm">
                                        <p className="text-sm font-semibold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">{currentTime}</p>
                                        <p className="text-xs opacity-90">{currentDate}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="text-white bg-gradient-to-r from-rose-100/20 to-pink-100/20 p-2 rounded-lg backdrop-blur-sm border border-white/30">
                                        <p className="text-sm font-semibold bg-gradient-to-r from-white to-rose-100 bg-clip-text text-transparent">
                                            {categoryData.products?.length || 0} Products
                                        </p>
                                    </div>

                                    <button onClick={onClose} className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-3 py-2 rounded-lg font-semibold transition-all shadow-lg transform hover:scale-105 flex items-center">
                                        <i className="fas fa-times mr-1"></i>
                                        <span className="text-sm">Close</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {categoryData.products?.map((product, index) => (
                                <div key={index} className="product-card bg-white p-4 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105">
                                    <div className="text-center">
                                        <div className="text-3xl mb-2">{product.icon}</div>
                                        <h3 className="font-bold text-sm text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
                                        <p className="text-lg font-bold text-purple-600 mb-2">Ksh {product.price}</p>
                                        <p className="text-xs text-gray-600 mb-3">Stock: {product.stock}</p>
                                        <button 
                                            onClick={() => onAddProduct(product)}
                                            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-2 px-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-700 transition-all"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('CategoryPopup component error:', error);
        return null;
    }
}