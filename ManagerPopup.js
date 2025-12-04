function ManagerPopup({ onClose, onCall }) {
    try {
        const [selectedManager, setSelectedManager] = React.useState(null);
        const [message, setMessage] = React.useState('');
        const [showMessageForm, setShowMessageForm] = React.useState(false);

        const managers = [
            { name: 'John Kamau', role: 'Store Manager', phone: '+254 722 123456', available: true, lastSeen: 'Online now' },
            { name: 'Mary Wanjiku', role: 'Assistant Manager', phone: '+254 733 789012', available: true, lastSeen: 'Online now' },
            { name: 'Peter Mwangi', role: 'Floor Supervisor', phone: '+254 711 345678', available: false, lastSeen: '2 hours ago' },
            { name: 'Grace Akinyi', role: 'Customer Service', phone: '+254 700 987654', available: true, lastSeen: 'Online now' }
        ];

        const handleSendMessage = (manager) => {
            if (!message.trim()) {
                alert('Please enter a message');
                return;
            }
            const smsUrl = `sms:${manager.phone}?body=${encodeURIComponent(`Manager Request: ${message}`)}`;
            window.open(smsUrl, '_self');
            alert(`📱 Message sent to ${manager.name}!`);
            setMessage('');
            setShowMessageForm(false);
            setSelectedManager(null);
        };

        return (
            <div data-name="manager-popup-overlay" className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-gradient-to-br from-red-100 via-green-100 to-yellow-100 rounded-2xl shadow-2xl p-6 w-96 border-4 border-green-300">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">📞 Call Manager</h3>
                        <button onClick={onClose} className="text-red-500 hover:text-red-700 bg-red-100 rounded-full p-2">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                        {managers.map((manager, index) => (
                            <div key={index} className={`p-3 rounded-lg border-2 ${manager.available ? 'bg-gradient-to-r from-green-100 to-yellow-100 border-green-300' : 'bg-gradient-to-r from-gray-100 to-red-100 border-gray-300'}`}>
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h4 className="font-bold text-gray-800">{manager.name}</h4>
                                        <p className="text-sm text-gray-600">{manager.role}</p>
                                        <p className="text-xs text-gray-500">{manager.phone}</p>
                                        <p className="text-xs text-blue-600">{manager.available ? '🟢' : '🔴'} {manager.lastSeen}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => {onCall(manager.phone); onClose();}}
                                        disabled={!manager.available}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                                            manager.available 
                                                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700' 
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    >
                                        📞 Call
                                    </button>
                                    <button
                                        onClick={() => {setSelectedManager(manager); setShowMessageForm(true);}}
                                        className="px-3 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                                    >
                                        💬 Message
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {showMessageForm && selectedManager && (
                        <div className="mt-4 bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg border-2 border-yellow-400">
                            <h5 className="font-bold text-orange-700 mb-2">Message to {selectedManager.name}:</h5>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="w-full p-3 border-2 border-yellow-300 rounded-lg resize-none h-20 text-sm"
                            />
                            <div className="flex gap-2 mt-3">
                                <button
                                    onClick={() => handleSendMessage(selectedManager)}
                                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white p-2 rounded-lg font-bold hover:from-red-600 hover:to-red-700"
                                >
                                    📤 Send
                                </button>
                                <button
                                    onClick={() => {setShowMessageForm(false); setSelectedManager(null);}}
                                    className="px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('ManagerPopup component error:', error);
        return null;
    }
}