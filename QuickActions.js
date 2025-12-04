function QuickActions({ onReprint, onNewCustomer, onManagerCall, onOpenSettings, onOpenInventory, onOpenCalculator, onCashDrawer, onLogout, onShutdown, onTechSupport }) {
    try {
        const actions = [
            { icon: 'fas fa-print', label: 'Print', action: onReprint, color: 'from-blue-500 via-blue-600 to-indigo-600' },
            { icon: 'fas fa-user-plus', label: 'New', action: onNewCustomer, color: 'from-green-500 via-emerald-600 to-teal-600' },
            { icon: 'fas fa-user-tie', label: 'Manager', action: onManagerCall, color: 'from-purple-500 via-violet-600 to-indigo-600' },
            { icon: 'fas fa-cog', label: 'Settings', action: onOpenSettings, color: 'from-gray-500 via-slate-600 to-zinc-600' },
            { icon: 'fas fa-boxes', label: 'Stock', action: onOpenInventory, color: 'from-orange-500 via-amber-600 to-yellow-600' },
            { icon: 'fas fa-calculator', label: 'Calc', action: onOpenCalculator, color: 'from-teal-500 via-cyan-600 to-blue-600' },
            { icon: 'fas fa-cash-register', label: 'Cash', action: onCashDrawer, color: 'from-emerald-500 via-green-600 to-lime-600' },
            { icon: 'fas fa-headset', label: 'Support', action: onTechSupport, color: 'from-cyan-500 via-sky-600 to-blue-600' },
            { icon: 'fas fa-sign-out-alt', label: 'Logout', action: onLogout, color: 'from-red-500 via-rose-600 to-pink-600' }
        ];

        return (
            <div data-name="quick-actions" className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-700 via-gray-800 to-zinc-800 shadow-xl border-t-2 border-slate-600 z-40">
                <div className="max-w-7xl mx-auto px-4 py-2">
                    <div className="grid grid-cols-9 gap-1">
                        {actions.map((action, index) => (
                            <button
                                key={index}
                                onClick={action.action}
                                className={`bg-gradient-to-r ${action.color} hover:shadow-md text-white p-1 rounded font-semibold transition-all duration-300 transform hover:scale-105 shadow-sm border border-white/20 group`}
                            >
                                <div className="text-center">
                                    <i className={`${action.icon} text-xs mb-1 block group-hover:animate-pulse`}></i>
                                    <span className="text-xs font-bold">{action.label}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('QuickActions component error:', error);
        return null;
    }
}