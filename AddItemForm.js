function AddItemForm({ onAddItem, onClose }) {
    try {
        const [itemData, setItemData] = React.useState({
            code: '',
            name: '',
            price: '',
            quantity: 1,
            icon: '📦'
        });

        const handleSubmit = (e) => {
            e.preventDefault();
            if (itemData.name && itemData.price) {
                const newItem = {
                    ...itemData,
                    price: parseFloat(itemData.price),
                    quantity: parseInt(itemData.quantity),
                    stock: 100,
                    expiry: 'N/A'
                };
                onAddItem(newItem);
                onClose();
                alert(`✅ ${itemData.name} added successfully!`);
            } else {
                alert('Please fill in all required fields');
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-2xl p-6 w-96">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-800">➕ Add New Item</h3>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={itemData.name}
                            onChange={(e) => setItemData({...itemData, name: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Product Name"
                            required
                        />
                        <input
                            type="number"
                            step="0.01"
                            value={itemData.price}
                            onChange={(e) => setItemData({...itemData, price: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Price (Ksh)"
                            required
                        />
                        <div className="flex space-x-3">
                            <button type="submit" className="flex-1 bg-blue-500 text-white p-2 rounded-lg font-semibold hover:bg-blue-600">
                                ✅ Add Item
                            </button>
                            <button type="button" onClick={onClose} className="flex-1 bg-gray-500 text-white p-2 rounded-lg font-semibold hover:bg-gray-600">
                                ❌ Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('AddItemForm component error:', error);
        return null;
    }
}