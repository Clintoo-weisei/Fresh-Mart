function CategoryButtons({ onCategorySelect }) {
    try {
        const categories = window.categoryData || {};

        const categoryColors = [
            'bg-gradient-to-r from-teal-500 to-cyan-600',
            'bg-gradient-to-r from-violet-500 to-purple-600', 
            'bg-gradient-to-r from-rose-500 to-pink-600',
            'bg-gradient-to-r from-amber-500 to-orange-600',
            'bg-gradient-to-r from-lime-500 to-green-600',
            'bg-gradient-to-r from-sky-500 to-blue-600',
            'bg-gradient-to-r from-fuchsia-500 to-purple-600',
            'bg-gradient-to-r from-emerald-500 to-teal-600'
        ];

        return (
            <div data-name="category-buttons" className="bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-100 rounded-lg shadow-md p-2 border border-gray-200">
                <h3 className="text-sm font-bold bg-gradient-to-r from-slate-600 to-gray-700 bg-clip-text text-transparent mb-2 flex items-center">
                    🏷️ Categories
                </h3>
                
                <div className="space-y-1">
                    {Object.entries(categories).map(([key, category], index) => (
                        <button
                            key={key}
                            onClick={() => onCategorySelect(key, category)}
                            className={`w-full p-2 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-sm ${categoryColors[index % categoryColors.length]} hover:shadow-md border border-white/20 bg-opacity-90 hover:bg-opacity-100`}
                        >
                            <div className="flex items-center justify-center">
                                <i className={`${category.icon} mr-2 text-sm`}></i>
                                <span className="text-xs font-bold">{category.name}</span>
                                <i className="fas fa-chevron-right text-xs ml-auto"></i>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('CategoryButtons component error:', error);
        return null;
    }
}