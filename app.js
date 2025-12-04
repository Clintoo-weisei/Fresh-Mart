class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return React.createElement('div', { className: 'p-4 text-center' },
                React.createElement('h1', { className: 'text-2xl font-bold text-red-600' }, '❌ Application Error'),
                React.createElement('p', { className: 'text-gray-600 mt-2' }, 'Please refresh the page and try again.')
            );
        }

        return this.props.children;
    }
}

function App() {
    try {
        const [isLoggedIn, setIsLoggedIn] = React.useState(false);
        const [currentCashier, setCurrentCashier] = React.useState({ 
            name: 'John Doe', 
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' 
        });
        const [items, setItems] = React.useState([]);
        const [paymentCompleted, setPaymentCompleted] = React.useState(false);
        const [paymentMethod, setPaymentMethod] = React.useState('');
        const [paymentAmount, setPaymentAmount] = React.useState(0);
        const [customerName, setCustomerName] = React.useState('');
        const [cashAmount, setCashAmount] = React.useState('');
        const [showSettings, setShowSettings] = React.useState(false);
        const [showInventory, setShowInventory] = React.useState(false);
        const [showSales, setShowSales] = React.useState(false);
        const [showReports, setShowReports] = React.useState(false);
        const [showCalculator, setShowCalculator] = React.useState(false);
        const [showBarcodeScanner, setShowBarcodeScanner] = React.useState(false);
        const [showManagerPopup, setShowManagerPopup] = React.useState(false);
        const [showTechSupport, setShowTechSupport] = React.useState(false);
        const [showPopupCart, setShowPopupCart] = React.useState(false);
        const [showCashDrawer, setShowCashDrawer] = React.useState(false);
        const [showPaymentSuccess, setShowPaymentSuccess] = React.useState(false);
        const [showReceipt, setShowReceipt] = React.useState(false);
        const [showPaymentConfirmation, setShowPaymentConfirmation] = React.useState(false);
        const [showCategoryPopup, setShowCategoryPopup] = React.useState(false);
        const [showReceiptHistory, setShowReceiptHistory] = React.useState(false);
        const [selectedCategoryData, setSelectedCategoryData] = React.useState(null);
        const [showLowStockAlert, setShowLowStockAlert] = React.useState(false);
        const [lowStockItems, setLowStockItems] = React.useState([]);

        React.useEffect(() => {
            const lowStockTimer = setInterval(() => {
                if (window.categoryData) {
                    const allProducts = [];
                    Object.values(window.categoryData).forEach(category => {
                        if (category.products) {
                            allProducts.push(...category.products);
                        }
                    });
                    
                    const lowStock = allProducts.filter(product => product.stock <= 10);
                    if (lowStock.length > 0) {
                        setLowStockItems(lowStock);
                        setShowLowStockAlert(true);
                        setTimeout(() => setShowLowStockAlert(false), 5000);
                    }
                }
            }, 300000); // 5 minutes = 300000ms
            
            return () => clearInterval(lowStockTimer);
        }, []);

        const handleLogin = (success, cashierData) => {
            if (success) {
                setIsLoggedIn(true);
                setCurrentCashier(cashierData);
            }
        };

        const handleLogout = () => {
            setIsLoggedIn(false);
            setCurrentCashier(null);
            setItems([]);
            setPaymentCompleted(false);
            setShowReceipt(false);
        };

        const handleAddItem = (item) => {
            const existingIndex = items.findIndex(i => i.code === item.code);
            if (existingIndex >= 0) {
                const newItems = [...items];
                newItems[existingIndex].quantity += 1;
                setItems(newItems);
            } else {
                setItems([...items, { ...item, quantity: 1 }]);
            }
        };

        const handleDeleteItem = (index) => {
            setItems(items.filter((_, i) => i !== index));
        };

        const handleCategorySelect = (categoryKey, categoryData) => {
            setSelectedCategoryData({ key: categoryKey, ...categoryData });
            setShowCategoryPopup(true);
        };

        const handlePaymentComplete = (method, amount, details) => {
            setPaymentMethod(method);
            setPaymentAmount(amount);
            if (details.includes('Cash:')) {
                setCashAmount(details.split('Cash: ')[1].split(',')[0]);
            }
            setShowPaymentConfirmation(true);
        };

        const handleConfirmPayment = () => {
            setPaymentCompleted(true);
            setShowPaymentConfirmation(false);
            setShowPaymentSuccess(true);
            
            setTimeout(() => {
                setShowPaymentSuccess(false);
                setShowReceipt(true);
            }, 3000);
        };

        const handleCancelPayment = () => {
            setShowPaymentConfirmation(false);
            setPaymentMethod('');
            setPaymentAmount(0);
            setCashAmount('');
        };

        const handleConfirmTransaction = () => {
            setItems([]);
            setPaymentCompleted(false);
            setPaymentMethod('');
            setPaymentAmount(0);
            setShowReceipt(false);
        };

        const handlePrintReceipt = () => {
            window.print();
        };

        if (!isLoggedIn) {
            return React.createElement(LoginPage, { onLogin: handleLogin });
        }

        if (showSettings) {
            return React.createElement(SettingsPage, { onBack: () => setShowSettings(false) });
        }

        if (showInventory) {
            return React.createElement(InventoryPage, { onBack: () => setShowInventory(false) });
        }

        if (showSales) {
            return React.createElement(SalesPage, { onBack: () => setShowSales(false) });
        }

        if (showReports) {
            return React.createElement(ReportsPage, { onBack: () => setShowReports(false) });
        }

        const total = window.calculations ? window.calculations.calculateTotal(
            window.calculations.calculateSubtotal(items),
            window.calculations.calculateTax(window.calculations.calculateSubtotal(items))
        ) : 0;

        return (
            React.createElement('div', { className: 'min-h-screen catalog-container' },
                React.createElement(Header, {
                    currentCashier,
                    onLogout: handleLogout,
                    onOpenInventory: () => setShowInventory(true),
                    onOpenSettings: () => setShowSettings(true),
                    onOpenSales: () => setShowSales(true),
                    onOpenReports: () => setShowReports(true),
                    onOpenBarcode: () => setShowBarcodeScanner(true),
                    onOpenReceipts: () => setShowReceiptHistory(true),
                    onCartClick: () => setShowPopupCart(true),
                    onOpenCashDrawer: () => setShowCashDrawer(true),
                    cartItems: items
                }),
                
                React.createElement('main', { className: 'px-2 py-4 pb-20' },
                    React.createElement('div', { className: 'max-w-full grid grid-cols-1 lg:grid-cols-12 gap-4' },
                        React.createElement('div', { className: 'lg:col-span-3 order-2 lg:order-1' },
                            React.createElement(ItemList, {
                                items,
                                onDeleteItem: handleDeleteItem,
                                onPaymentComplete: handlePaymentComplete,
                                paymentCompleted,
                                onConfirmTransaction: handleConfirmTransaction,
                                onShowReceipt: () => setShowReceipt(true)
                            }),
                            
                            React.createElement(PaymentOptions, {
                                total,
                                onPaymentComplete: handlePaymentComplete,
                                cartItems: items,
                                isVisible: items.length > 0
                            })
                        ),
                        
                        React.createElement('div', { className: 'lg:col-span-7 order-1 lg:order-2' },
                            React.createElement(Dashboard, {
                                onAddProduct: handleAddItem,
                                categories: window.categoryData
                            })
                        ),
                        
                        React.createElement('div', { className: 'lg:col-span-2 order-3' },
                            React.createElement(CategoryButtons, {
                                onCategorySelect: handleCategorySelect
                            })
                        )
                    )
                ),
                
                React.createElement(QuickActions, {
                    onReprint: handlePrintReceipt,
                    onNewCustomer: () => alert('👤 New customer session started'),
                    onManagerCall: () => setShowManagerPopup(true),
                    onOpenSettings: () => setShowSettings(true),
                    onOpenInventory: () => setShowInventory(true),
                    onOpenCalculator: () => setShowCalculator(true),
                    onCashDrawer: () => setShowCashDrawer(true),
                    onLogout: handleLogout,
                    onShutdown: () => confirm('Are you sure you want to shutdown?') && alert('🔌 System shutting down...'),
                    onTechSupport: () => setShowTechSupport(true)
                }),
                
                React.createElement(PaymentConfirmation, {
                    isVisible: showPaymentConfirmation,
                    items,
                    total,
                    paymentMethod,
                    customerName,
                    cashAmount,
                    onConfirm: handleConfirmPayment,
                    onCancel: handleCancelPayment
                }),
                
                React.createElement(CategoryPopup, {
                    isVisible: showCategoryPopup,
                    categoryKey: selectedCategoryData?.key,
                    categoryData: selectedCategoryData,
                    onClose: () => setShowCategoryPopup(false),
                    onAddProduct: handleAddItem
                }),
                
                showReceiptHistory && React.createElement(ReceiptHistory, {
                    onClose: () => setShowReceiptHistory(false)
                }),
                
                showPopupCart && React.createElement(PopupCart, {
                    items,
                    onClose: () => setShowPopupCart(false),
                    onDeleteItem: handleDeleteItem,
                    onPayment: handlePaymentComplete
                }),
                
                showCashDrawer && React.createElement(CashDrawerPopup, {
                    onClose: () => setShowCashDrawer(false)
                }),
                
                showPaymentSuccess && React.createElement(PaymentSuccess, {
                    isVisible: showPaymentSuccess,
                    amount: total,
                    method: paymentMethod,
                    onClose: () => setShowPaymentSuccess(false)
                }),
                
                showReceipt && React.createElement(Receipt, {
                    items,
                    onPrint: handlePrintReceipt,
                    paymentCompleted,
                    paymentMethod,
                    paymentAmount,
                    currentCashier,
                    onClose: () => setShowReceipt(false)
                }),
                
                showCalculator && React.createElement(Calculator, { onClose: () => setShowCalculator(false) }),
                showBarcodeScanner && React.createElement(BarcodeScanner, {
                    onProductFound: handleAddItem,
                    onClose: () => setShowBarcodeScanner(false)
                }),
                showManagerPopup && React.createElement(ManagerPopup, {
                    onClose: () => setShowManagerPopup(false),
                    onCall: (phone) => alert(`📞 Calling ${phone}`)
                }),
                showTechSupport && React.createElement(TechnicalSupportPopup, {
                    onClose: () => setShowTechSupport(false)
                }),
                
                showLowStockAlert && React.createElement(LowStockAlert, {
                    items: lowStockItems,
                    onClose: () => setShowLowStockAlert(false)
                })
            )
        );
    } catch (error) {
        console.error('App component error:', error);
        return React.createElement('div', { className: 'p-4 text-center' },
            React.createElement('h1', { className: 'text-2xl font-bold text-red-600' }, '❌ Application Error'),
            React.createElement('p', { className: 'text-gray-600 mt-2' }, 'Please refresh the page and try again.')
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(ErrorBoundary, null, React.createElement(App)));