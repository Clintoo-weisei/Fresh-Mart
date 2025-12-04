function SettingsPage({ onBack }) {
    try {
        const [settings, setSettings] = React.useState({
            storeName: 'Fresh Grocery',
            taxRate: 8,
            currency: 'KSH',
            receiptFooter: 'Thank you for shopping with us!',
            autoSave: true,
            soundEnabled: true,
            darkMode: false,
            language: 'English',
            lowStockAlert: 10,
            maxDiscount: 20,
            sessionTimeout: 30
        });

        const handleSettingChange = (key, value) => {
            setSettings(prev => {
                const newSettings = { ...prev, [key]: value };
                return newSettings;
            });
        };

        const handleSave = () => {
            localStorage.setItem('posSettings', JSON.stringify(settings));
            alert('⚙️ Settings saved successfully!');
        };

        return (
            <div data-name="settings-page" className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-100">
                <div data-name="settings-header" className="bg-gradient-to-r from-gray-500 via-slate-600 to-gray-600 shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-white">
                                <i className="fas fa-cog mr-3 text-yellow-300"></i>
                                ⚙️ System Settings
                            </h1>
                            <button onClick={onBack} className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-white hover:bg-opacity-30 transition-all">
                                <i className="fas fa-arrow-left mr-2"></i>Back
                            </button>
                        </div>
                    </div>
                </div>

                <main data-name="settings-content" className="max-w-6xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-6 border-2 border-blue-200">
                            <h2 className="text-xl font-bold mb-4 flex items-center">
                                <i className="fas fa-store mr-3 text-blue-500"></i>
                                🏪 Store Settings
                            </h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Store Name</label>
                                    <input
                                        type="text"
                                        value={settings.storeName}
                                        onChange={(e) => handleSettingChange('storeName', e.target.value)}
                                        className="w-full p-3 border rounded-lg focus:outline-none border-gray-300 focus:border-blue-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Tax Rate (%)</label>
                                    <input
                                        type="number"
                                        value={settings.taxRate}
                                        onChange={(e) => handleSettingChange('taxRate', parseFloat(e.target.value))}
                                        className="w-full p-3 border rounded-lg focus:outline-none border-gray-300 focus:border-blue-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Currency</label>
                                    <select
                                        value={settings.currency}
                                        onChange={(e) => handleSettingChange('currency', e.target.value)}
                                        className="w-full p-3 border rounded-lg focus:outline-none border-gray-300 focus:border-blue-500"
                                    >
                                        <option value="KSH">KSH - Kenyan Shilling</option>
                                        <option value="USD">USD - US Dollar</option>
                                        <option value="EUR">EUR - Euro</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-lg p-6 border-2 border-purple-200">
                            <h2 className="text-xl font-bold mb-4 flex items-center">
                                <i className="fas fa-palette mr-3 text-purple-500"></i>
                                🎨 Preferences
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium">Auto Save</label>
                                    <input
                                        type="checkbox"
                                        checked={settings.autoSave}
                                        onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                                        className="w-5 h-5 text-blue-600"
                                    />
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium">Sound Effects</label>
                                    <input
                                        type="checkbox"
                                        checked={settings.soundEnabled}
                                        onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
                                        className="w-5 h-5 text-blue-600"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Language</label>
                                    <select
                                        value={settings.language}
                                        onChange={(e) => handleSettingChange('language', e.target.value)}
                                        className="w-full p-3 border rounded-lg focus:outline-none border-gray-300 focus:border-purple-500"
                                    >
                                        <option value="English">English</option>
                                        <option value="Swahili">Kiswahili</option>
                                        <option value="French">Français</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-white to-green-50 rounded-xl shadow-lg p-6 border-2 border-green-200">
                            <h2 className="text-xl font-bold mb-4 flex items-center">
                                <i className="fas fa-cogs mr-3 text-green-500"></i>
                                🔧 Advanced
                            </h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Low Stock Alert</label>
                                    <input
                                        type="number"
                                        value={settings.lowStockAlert}
                                        onChange={(e) => handleSettingChange('lowStockAlert', parseInt(e.target.value))}
                                        className="w-full p-3 border rounded-lg focus:outline-none border-gray-300 focus:border-green-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Max Discount (%)</label>
                                    <input
                                        type="number"
                                        value={settings.maxDiscount}
                                        onChange={(e) => handleSettingChange('maxDiscount', parseInt(e.target.value))}
                                        className="w-full p-3 border rounded-lg focus:outline-none border-gray-300 focus:border-green-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Session Timeout (min)</label>
                                    <input
                                        type="number"
                                        value={settings.sessionTimeout}
                                        onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                                        className="w-full p-3 border rounded-lg focus:outline-none border-gray-300 focus:border-green-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 text-center">
                        <button
                            onClick={handleSave}
                            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-lg font-bold hover:from-green-600 hover:to-blue-600 shadow-lg"
                        >
                            💾 Save Settings
                        </button>
                    </div>
                </main>
            </div>
        );
    } catch (error) {
        console.error('SettingsPage component error:', error);
        return null;
    }
}