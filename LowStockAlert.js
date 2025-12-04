function LowStockAlert({ items, onClose }) {
    try {
        return (
            <div className="fixed top-20 left-4 z-[60] animate-bounce">
                <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white p-4 rounded-xl shadow-2xl border-2 border-red-300 max-w-sm">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold flex items-center">
                            ⚠️ Low Stock Alert
                        </h4>
                        <button onClick={onClose} className="text-white hover:text-red-200 ml-2">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className="text-sm">
                        <p className="mb-2">Items running low in stock:</p>
                        <div className="max-h-32 overflow-y-auto">
                            {items.slice(0, 3).map((item, index) => (
                                <div key={index} className="flex justify-between items-center py-1 border-b border-red-300/30 last:border-b-0">
                                    <span className="flex items-center">
                                        <span className="mr-2">{item.icon}</span>
                                        <span className="text-xs">{item.name}</span>
                                    </span>
                                    <span className="font-bold text-yellow-200 text-xs">
                                        {item.stock} left
                                    </span>
                                </div>
                            ))}
                            {items.length > 3 && (
                                <p className="text-xs text-red-200 mt-2">
                                    +{items.length - 3} more items need restocking
                                </p>
                            )}
                        </div>
                        <div className="mt-2 text-xs text-red-200">
                            Auto-closes in 5 seconds (Shows every 5 minutes)
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('LowStockAlert component error:', error);
        return null;
    }
}
