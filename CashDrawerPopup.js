function CashDrawerPopup({ onClose }) {
    try {
        const [isOpening, setIsOpening] = React.useState(true);
        const [drawerStatus, setDrawerStatus] = React.useState('opening');
        const [cashBalance, setCashBalance] = React.useState(2450.75);
        const [denominations, setDenominations] = React.useState({
            'KSH 1000': 2,
            'KSH 500': 3,
            'KSH 200': 5,
            'KSH 100': 8,
            'KSH 50': 10,
            'KSH 20': 15,
            'KSH 10': 20,
            'KSH 5': 25,
            'KSH 1': 30
        });

        React.useEffect(() => {
            setTimeout(() => {
                setIsOpening(false);
                setDrawerStatus('open');
            }, 2000);
        }, []);

        const handleCloseCashDrawer = () => {
            setDrawerStatus('closing');
            setTimeout(() => {
                onClose();
            }, 1000);
        };

        const updateDenomination = (denom, change) => {
            setDenominations(prev => {
                const newDenoms = { ...prev };
                const newCount = Math.max(0, newDenoms[denom] + change);
                newDenoms[denom] = newCount;
                
                // Recalculate total balance
                let newBalance = 0;
                Object.entries(newDenoms).forEach(([denomination, count]) => {
                    const value = parseInt(denomination.replace('KSH ', ''));
                    newBalance += value * count;
                });
                setCashBalance(newBalance);
                
                return newDenoms;
            });
        };

        const addCash = (denom) => updateDenomination(denom, 1);
        const removeCash = (denom) => updateDenomination(denom, -1);

        return (
            <div data-name="cash-drawer-overlay" className="fixed inset-0 bg-gradient-to-br from-black/60 via-green-900/50 to-emerald-900/60 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl shadow-2xl p-6 w-[500px] border-4 border-gradient-to-r from-green-400 to-emerald-400">
                    <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-xl">
                        <h3 className="text-lg font-bold text-white flex items-center">
                            💰 <span className="ml-2 bg-gradient-to-r from-yellow-200 to-green-200 bg-clip-text text-transparent">Cash Drawer</span>
                        </h3>
                        <button onClick={onClose} className="text-white hover:text-red-200 bg-red-500/30 hover:bg-red-500/50 p-1 rounded-lg transition-all">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>

                    <div className="text-center">
                        {isOpening && (
                            <div className="mb-4">
                                <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mx-auto mb-3"></div>
                                <p className="text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">🔓 Opening Cash Drawer...</p>
                            </div>
                        )}

                        {!isOpening && drawerStatus === 'open' && (
                            <div className="mb-4">
                            <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl border-2 border-green-300 mb-4">
                                <div className="text-center mb-4">
                                    <div className="bg-gradient-to-r from-green-800 to-emerald-800 p-6 rounded-2xl mb-4 shadow-lg">
                                        <div className="text-6xl mb-2">💰</div>
                                        <div className="grid gap-2 max-h-48 overflow-y-auto">
                                            {Object.entries(denominations).map(([denom, count]) => (
                                                <div key={denom} className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-2 rounded flex justify-between items-center">
                                                    <span className="text-sm font-bold">{denom}: {count}</span>
                                                    <div className="flex space-x-1">
                                                        <button onClick={() => addCash(denom)} className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs">+</button>
                                                        <button onClick={() => removeCash(denom)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs">-</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">✅ Cash Drawer Open</p>
                                <p className="text-lg text-gray-800 mt-2 font-bold">Total: KSH {cashBalance.toFixed(2)}</p>
                            </div>

                                <button
                                    onClick={handleCloseCashDrawer}
                                    className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white p-3 rounded-lg hover:from-gray-600 hover:to-gray-700 font-semibold shadow-lg"
                                >
                                    🔒 Close Cash Drawer
                                </button>
                            </div>
                        )}

                        {drawerStatus === 'closing' && (
                            <div className="mb-4">
                                <div className="animate-pulse">
                                    <div className="text-6xl mb-3">🔒</div>
                                    <p className="text-lg font-semibold bg-gradient-to-r from-gray-600 to-green-600 bg-clip-text text-transparent">Closing Cash Drawer...</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('CashDrawerPopup component error:', error);
        return null;
    }
}