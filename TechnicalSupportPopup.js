function TechnicalSupportPopup({ onClose }) {
    try {
        const [message, setMessage] = React.useState('');
        const [showMessageForm, setShowMessageForm] = React.useState(false);
        const [isOnline, setIsOnline] = React.useState(Math.random() > 0.5);
        const lastSeen = new Date(Date.now() - Math.random() * 3600000).toLocaleString();

        const handleCall = () => {
            window.open('tel:+254792505624', '_self');
            alert('📞 Calling Clinton Weisei...');
        };

        const handleSendMessage = () => {
            if (!message.trim()) {
                alert('Please enter a message');
                return;
            }
            const smsUrl = `sms:+254792505624?body=${encodeURIComponent(`Tech Support: ${message}`)}`;
            window.open(smsUrl, '_self');
            alert('📱 Message sent to technical support!');
            setMessage('');
            setShowMessageForm(false);
        };

        return (
            <div data-name="tech-support-overlay" className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-gradient-to-br from-cyan-100 via-blue-100 to-purple-100 rounded-2xl shadow-2xl p-6 w-96 border-4 border-cyan-300">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">🔧 Technical Support</h3>
                        <button onClick={onClose} className="text-red-500 hover:text-red-700 bg-red-100 rounded-full p-2">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white p-4 rounded-xl border-3 border-blue-400 mb-4">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-full mx-auto mb-3 flex items-center justify-center">
                                <span className="text-3xl">👨‍💻</span>
                            </div>
                            <h4 className="text-lg font-bold bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">Clinton Weisei</h4>
                            <p className="text-sm text-cyan-100">Lead Developer & Technical Support</p>
                            <p className="text-lg font-bold text-yellow-200">📱 +254 792 505 624</p>
                            <div className="flex items-center justify-center mt-2">
                                <div className={`w-3 h-3 rounded-full mr-2 ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                                <span className="text-xs">
                                    {isOnline ? '🟢 Online Now' : `🔴 Last seen: ${lastSeen}`}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={handleCall}
                                className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-lg font-bold hover:from-green-600 hover:to-green-700 shadow-lg transform hover:scale-105 transition-all"
                            >
                                📞 Call Now
                            </button>
                            <button
                                onClick={() => setShowMessageForm(!showMessageForm)}
                                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg font-bold hover:from-blue-600 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all"
                            >
                                💬 Message
                            </button>
                        </div>

                        {showMessageForm && (
                            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg border-2 border-yellow-400">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Describe your technical issue..."
                                    className="w-full p-3 border-2 border-yellow-300 rounded-lg resize-none h-24 text-sm"
                                />
                                <div className="flex gap-2 mt-3">
                                    <button
                                        onClick={handleSendMessage}
                                        className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white p-2 rounded-lg font-bold hover:from-cyan-600 hover:to-cyan-700"
                                    >
                                        📤 Send
                                    </button>
                                    <button
                                        onClick={() => setShowMessageForm(false)}
                                        className="px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-lg border-2 border-purple-300">
                            <h5 className="font-bold text-purple-700 mb-2">🚀 Available Support:</h5>
                            <ul className="text-sm space-y-1">
                                <li className="text-green-700">✅ System troubleshooting</li>
                                <li className="text-blue-700">✅ Payment issues</li>
                                <li className="text-purple-700">✅ Technical maintenance</li>
                                <li className="text-orange-700">✅ Software updates</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('TechnicalSupportPopup component error:', error);
        return null;
    }
}