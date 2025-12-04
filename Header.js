function Header({ currentCashier, onLogout, onOpenInventory, onOpenSettings, onOpenSales, onOpenReports, onOpenBarcode, onOpenReceipts, onCartClick, onOpenCashDrawer, cartItems }) {
    try {
        const [currentTime, setCurrentTime] = React.useState(new Date().toLocaleTimeString());
        const [currentDate, setCurrentDate] = React.useState(new Date().toLocaleDateString());

        React.useEffect(() => {
            const timer = setInterval(() => {
                const now = new Date();
                setCurrentTime(now.toLocaleTimeString());
                setCurrentDate(now.toLocaleDateString());
            }, 1000);
            return () => clearInterval(timer);
        }, []);

        const cashierImage = currentCashier?.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face';

        return (
            <header data-name="header" className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 shadow-lg border-b-2 border-violet-400">
                <div className="w-full px-4 py-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="text-white flex items-center bg-gradient-to-r from-pink-100/20 to-violet-100/20 p-2 rounded-lg backdrop-blur-sm border border-white/30">
                                <h1 className="text-lg md:text-xl font-bold mr-3">
                                    <span className="text-white">🛒</span> 
                                    <span className="bg-gradient-to-r from-yellow-200 to-orange-300 bg-clip-text text-transparent">FRESH</span> 
                                    <span className="bg-gradient-to-r from-pink-200 to-rose-300 bg-clip-text text-transparent">MART</span>
                                </h1>
                                <div className="flex space-x-1 text-sm animate-pulse">
                                    <span>🥕</span><span>🥬</span><span>🍅</span><span>🧅</span>
                                    <span>🍎</span><span>🍌</span><span>🥛</span><span>🍞</span>
                                </div>
                            </div>

                            <div className="text-white text-center bg-gradient-to-r from-amber-100/20 to-orange-100/20 p-2 rounded-lg backdrop-blur-sm">
                                <p className="text-sm font-semibold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">{currentTime}</p>
                                <p className="text-xs opacity-90">{currentDate}</p>
                            </div>

                            <div className="hidden md:flex items-center space-x-2">
                                <button onClick={onCartClick} className="relative px-2 py-1 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white transition-all transform hover:scale-105 shadow-lg flex items-center">
                                    <i className="fas fa-shopping-cart text-sm mr-1"></i>
                                    <span className="text-xs font-bold">Cart</span>
                                    {cartItems && cartItems.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold animate-pulse">
                                            {cartItems.length}
                                        </span>
                                    )}
                                </button>
                                
                                <button onClick={onOpenCashDrawer} className="px-2 py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white transition-all transform hover:scale-105 shadow-lg flex items-center">
                                    <i className="fas fa-cash-register text-sm mr-1"></i>
                                    <span className="text-xs font-bold">Drawer</span>
                                </button>
                                
                                <button onClick={onOpenSales} className="px-2 py-1 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white transition-all transform hover:scale-105 shadow-lg flex items-center">
                                    <i className="fas fa-chart-line text-sm mr-1"></i>
                                    <span className="text-xs font-bold">Sales</span>
                                </button>
                                
                                <button onClick={onOpenBarcode} className="px-2 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white transition-all transform hover:scale-105 shadow-lg flex items-center">
                                    <i className="fas fa-barcode text-sm mr-1"></i>
                                    <span className="text-xs font-bold">Scanner</span>
                                </button>
                                
                                <button onClick={onOpenReceipts} className="px-2 py-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white transition-all transform hover:scale-105 shadow-lg flex items-center">
                                    <i className="fas fa-receipt text-sm mr-1"></i>
                                    <span className="text-xs font-bold">Receipts</span>
                                </button>

                                <button onClick={onOpenReports} className="px-2 py-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all transform hover:scale-105 shadow-lg flex items-center">
                                    <i className="fas fa-chart-bar text-sm mr-1"></i>
                                    <span className="text-xs font-bold">Reports</span>
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2 text-white bg-gradient-to-r from-rose-100/20 to-pink-100/20 p-2 rounded-lg backdrop-blur-sm border border-white/30">
                                <div className="relative">
                                    <img 
                                        src={cashierImage} 
                                        alt="Cashier" 
                                        className="w-8 h-8 rounded-full border-2 border-white shadow-lg object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextElementSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 border-2 border-white shadow-lg hidden items-center justify-center">
                                        <i className="fas fa-user text-white text-sm"></i>
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border border-white rounded-full"></div>
                                </div>
                                <div className="text-left hidden md:block">
                                    <p className="text-sm font-semibold bg-gradient-to-r from-white to-rose-100 bg-clip-text text-transparent">{currentCashier?.name}</p>
                                    <p className="text-xs text-green-200">● Online</p>
                                </div>
                            </div>

                            <button onClick={onOpenInventory} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-2 py-1 rounded-lg font-semibold transition-all shadow-lg transform hover:scale-105 flex items-center">
                                <i className="fas fa-boxes mr-1"></i>
                                <span className="hidden md:inline text-sm">Inventory</span>
                            </button>

                            <button
                                onClick={onLogout}
                                className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-2 py-1 rounded-lg font-semibold transition-all shadow-lg transform hover:scale-105 flex items-center"
                            >
                                <i className="fas fa-sign-out-alt mr-1"></i>
                                <span className="hidden md:inline text-sm">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        return null;
    }
}