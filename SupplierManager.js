function SupplierManager({ onClose }) {
    try {
        const [suppliers, setSuppliers] = React.useState([]);
        const [showAddForm, setShowAddForm] = React.useState(false);
        const [loading, setLoading] = React.useState(true);
        const [selectedSupplier, setSelectedSupplier] = React.useState(null);

        React.useEffect(() => {
            loadSuppliers();
        }, []);

        const loadSuppliers = async () => {
            try {
                const result = await trickleListObjects('suppliers', 50, true);
                setSuppliers(result.items || []);
                setLoading(false);
            } catch (error) {
                console.error('Error loading suppliers:', error);
                setLoading(false);
            }
        };

        const handleReorder = async (supplierID) => {
            try {
                const supplier = suppliers.find(s => s.objectData.supplierID === supplierID);
                if (supplier) {
                    alert(`📞 Calling ${supplier.objectData.name} at ${supplier.objectData.phone} for reorder`);
                    window.open(`tel:${supplier.objectData.phone}`, '_self');
                }
            } catch (error) {
                console.error('Error initiating reorder:', error);
            }
        };

        const getStatusColor = (status) => {
            switch (status) {
                case 'Active': return 'bg-green-500';
                case 'Inactive': return 'bg-gray-500';
                case 'Pending': return 'bg-yellow-500';
                default: return 'bg-gray-500';
            }
        };

        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-2xl w-[900px] max-h-[90vh] overflow-y-auto border-2 border-blue-300">
                    <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
                        <h3 className="text-xl font-bold flex items-center">
                            🏭 Supplier Management
                        </h3>
                        <button onClick={onClose} className="text-white hover:text-red-200 bg-red-500/30 hover:bg-red-500/50 p-2 rounded-lg transition-all">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-lg font-bold text-gray-800">Active Suppliers ({suppliers.length})</h4>
                            <button 
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-bold hover:from-green-600 hover:to-emerald-700"
                            >
                                ➕ Add Supplier
                            </button>
                        </div>

                        {loading ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-3"></div>
                                <p className="text-gray-600">Loading suppliers...</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {suppliers.map((supplier, index) => (
                                    <div key={index} className="bg-gradient-to-r from-white to-blue-50 p-4 rounded-lg border-2 border-blue-200 shadow-md">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center mb-2">
                                                    <h5 className="font-bold text-lg text-blue-800">{supplier.objectData.name}</h5>
                                                    <span className={`ml-3 px-2 py-1 rounded-full text-xs font-bold text-white ${getStatusColor(supplier.objectData.status)}`}>
                                                        {supplier.objectData.status}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 text-sm">
                                                    <p><span className="font-semibold">📞 Contact:</span> {supplier.objectData.contact}</p>
                                                    <p><span className="font-semibold">📱 Phone:</span> {supplier.objectData.phone}</p>
                                                    <p><span className="font-semibold">📧 Email:</span> {supplier.objectData.email}</p>
                                                    <p><span className="font-semibold">🏷️ Categories:</span> {supplier.objectData.categories}</p>
                                                    <p><span className="font-semibold">💰 Terms:</span> {supplier.objectData.paymentTerms}</p>
                                                    <p><span className="font-semibold">📍 Address:</span> {supplier.objectData.address}</p>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={() => handleReorder(supplier.objectData.supplierID)}
                                                    className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded text-sm hover:from-orange-600 hover:to-red-700"
                                                >
                                                    📞 Reorder
                                                </button>
                                                <button 
                                                    onClick={() => setSelectedSupplier(supplier)}
                                                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded text-sm hover:from-blue-600 hover:to-blue-700"
                                                >
                                                    ✏️ Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('SupplierManager component error:', error);
        return null;
    }
}