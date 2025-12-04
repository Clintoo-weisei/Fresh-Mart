function CustomerLoyalty({ onClose }) {
    try {
        const [customers, setCustomers] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [showAddForm, setShowAddForm] = React.useState(false);
        const [searchTerm, setSearchTerm] = React.useState('');

        React.useEffect(() => {
            loadCustomers();
        }, []);

        const loadCustomers = async () => {
            try {
                const result = await trickleListObjects('customers', 50, true);
                setCustomers(result.items || []);
                setLoading(false);
            } catch (error) {
                console.error('Error loading customers:', error);
                setLoading(false);
            }
        };

        const getMembershipColor = (level) => {
            switch (level) {
                case 'Bronze': return 'bg-amber-600';
                case 'Silver': return 'bg-gray-500';
                case 'Gold': return 'bg-yellow-500';
                case 'Platinum': return 'bg-purple-600';
                default: return 'bg-gray-400';
            }
        };

        const filteredCustomers = customers.filter(customer =>
            customer.objectData.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.objectData.phone?.includes(searchTerm) ||
            customer.objectData.customerID?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-2xl w-[900px] max-h-[90vh] overflow-y-auto border-2 border-purple-300">
                    <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-2xl">
                        <h3 className="text-xl font-bold flex items-center">
                            👥 Customer Loyalty Program
                        </h3>
                        <button onClick={onClose} className="text-white hover:text-red-200 bg-red-500/30 hover:bg-red-500/50 p-2 rounded-lg transition-all">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex-1 mr-4">
                                <input
                                    type="text"
                                    placeholder="Search customers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full p-3 border-2 border-purple-300 rounded-lg"
                                />
                            </div>
                            <button 
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg font-bold hover:from-purple-600 hover:to-pink-700"
                            >
                                ➕ Add Customer
                            </button>
                        </div>

                        {loading ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-3"></div>
                                <p className="text-gray-600">Loading customers...</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {filteredCustomers.map((customer, index) => (
                                    <div key={index} className="bg-gradient-to-r from-white to-purple-50 p-4 rounded-lg border-2 border-purple-200 shadow-md">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center mb-2">
                                                    <h5 className="font-bold text-lg text-purple-800">{customer.objectData.name}</h5>
                                                    <span className={`ml-3 px-2 py-1 rounded-full text-xs font-bold text-white ${getMembershipColor(customer.objectData.membershipLevel)}`}>
                                                        {customer.objectData.membershipLevel}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 text-sm">
                                                    <p><span className="font-semibold">🆔 ID:</span> {customer.objectData.customerID}</p>
                                                    <p><span className="font-semibold">📱 Phone:</span> {customer.objectData.phone}</p>
                                                    <p><span className="font-semibold">⭐ Points:</span> {customer.objectData.loyaltyPoints}</p>
                                                    <p><span className="font-semibold">💰 Total Spent:</span> Ksh {customer.objectData.totalSpent}</p>
                                                    <p><span className="font-semibold">📅 Joined:</span> {customer.objectData.joinDate}</p>
                                                    <p><span className="font-semibold">📊 Status:</span> {customer.objectData.status}</p>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded text-sm hover:from-green-600 hover:to-emerald-700">
                                                    🎁 Reward
                                                </button>
                                                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded text-sm hover:from-blue-600 hover:to-blue-700">
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
        console.error('CustomerLoyalty component error:', error);
        return null;
    }
}