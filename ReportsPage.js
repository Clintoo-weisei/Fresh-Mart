function ReportsPage({ onBack }) {
    try {
        const [selectedReport, setSelectedReport] = React.useState('daily');
        const [dateRange, setDateRange] = React.useState({
            start: new Date().toISOString().split('T')[0],
            end: new Date().toISOString().split('T')[0]
        });

        const reportTypes = [
            { id: 'daily', name: 'Daily Sales', icon: '📅', color: 'from-blue-500 to-cyan-600' },
            { id: 'weekly', name: 'Weekly Report', icon: '📊', color: 'from-green-500 to-emerald-600' },
            { id: 'monthly', name: 'Monthly Summary', icon: '📈', color: 'from-purple-500 to-violet-600' },
            { id: 'products', name: 'Product Analysis', icon: '📦', color: 'from-orange-500 to-red-600' },
            { id: 'cashiers', name: 'Cashier Performance', icon: '👥', color: 'from-pink-500 to-rose-600' },
            { id: 'inventory', name: 'Inventory Report', icon: '📋', color: 'from-teal-500 to-cyan-600' }
        ];

        const mockData = {
            daily: { sales: 15420, transactions: 87, customers: 65 },
            weekly: { sales: 108940, transactions: 612, customers: 456 },
            monthly: { sales: 467230, transactions: 2847, customers: 1923 }
        };

        const generateReport = () => {
            alert(`📊 Generating ${reportTypes.find(r => r.id === selectedReport)?.name} report for ${dateRange.start} to ${dateRange.end}`);
        };

        return (
            <div data-name="reports-page" className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                            📊 BUSINESS REPORTS
                        </h1>
                        <button onClick={onBack} className="bg-gradient-to-r from-gray-500 to-slate-600 text-white px-4 py-2 rounded-lg font-bold hover:from-gray-600 hover:to-slate-700 transition-all">
                            ← Back
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {reportTypes.map((report) => (
                            <button
                                key={report.id}
                                onClick={() => setSelectedReport(report.id)}
                                className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                                    selectedReport === report.id 
                                        ? `bg-gradient-to-r ${report.color} text-white border-white shadow-lg` 
                                        : 'bg-white border-gray-300 hover:border-gray-400'
                                }`}
                            >
                                <div className="text-center">
                                    <div className="text-2xl mb-2">{report.icon}</div>
                                    <h3 className="font-bold">{report.name}</h3>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 mb-6">
                        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            📅 Date Range Selection
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Start Date</label>
                                <input 
                                    type="date" 
                                    value={dateRange.start}
                                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">End Date</label>
                                <input 
                                    type="date" 
                                    value={dateRange.end}
                                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                            <div className="flex items-end">
                                <button onClick={generateReport} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2 rounded-lg font-bold hover:from-green-600 hover:to-emerald-700 transition-all">
                                    📊 Generate Report
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl border-2 border-green-300">
                            <h3 className="font-bold text-green-800 mb-2">💰 Total Sales</h3>
                            <p className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                Ksh {mockData[selectedReport]?.sales?.toLocaleString() || '0'}
                            </p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-6 rounded-xl border-2 border-blue-300">
                            <h3 className="font-bold text-blue-800 mb-2">🧾 Transactions</h3>
                            <p className="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                {mockData[selectedReport]?.transactions?.toLocaleString() || '0'}
                            </p>
                        </div>
                        <div className="bg-gradient-to-r from-purple-100 to-violet-100 p-6 rounded-xl border-2 border-purple-300">
                            <h3 className="font-bold text-purple-800 mb-2">👥 Customers</h3>
                            <p className="text-2xl font-black bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                                {mockData[selectedReport]?.customers?.toLocaleString() || '0'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ReportsPage component error:', error);
        return null;
    }
}