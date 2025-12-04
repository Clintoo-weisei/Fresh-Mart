function BarcodeScanner({ onProductFound, onClose }) {
    try {
        const [isScanning, setIsScanning] = React.useState(false);
        const [scannedCode, setScannedCode] = React.useState('');

        const productDatabase = {
            'VG001': { code: 'VG001', name: 'Tomatoes 1kg', price: 80, icon: '🍅', stock: 45, expiry: '2024-12-25' },
            'FR001': { code: 'FR001', name: 'Apples 1kg', price: 180, icon: '🍎', stock: 60, expiry: '2024-12-30' },
            'DY001': { code: 'DY001', name: 'Fresh Milk 1L', price: 60, icon: '🥛', stock: 50, expiry: '2024-12-25' },
            'BV001': { code: 'BV001', name: 'Coca Cola 500ml', price: 50, icon: '🥤', stock: 80, expiry: '2025-06-15' }
        };

        const handleScan = () => {
            setIsScanning(true);
            setTimeout(() => {
                const codes = Object.keys(productDatabase);
                const randomCode = codes[Math.floor(Math.random() * codes.length)];
                const product = productDatabase[randomCode];
                
                setScannedCode(randomCode);
                setIsScanning(false);
                
                if (product) {
                    onProductFound(product);
                    setTimeout(() => {
                        onClose();
                    }, 1500);
                }
            }, 2000);
        };

        const handleManualEntry = () => {
            const code = prompt('Enter product barcode:');
            if (code && productDatabase[code]) {
                onProductFound(productDatabase[code]);
                onClose();
            } else if (code) {
                alert('Product not found!');
            }
        };

        return (
            <div data-name="barcode-scanner-overlay" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl shadow-2xl p-6 w-96 border-2 border-orange-300">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-800">📱 Barcode Scanner</h3>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <div className="text-center mb-6">
                        {isScanning ? (
                            <div>
                                <div className="text-6xl mb-4 animate-pulse">📷</div>
                                <p className="text-lg font-semibold text-orange-600">Scanning...</p>
                                <div className="mt-4 bg-orange-200 p-4 rounded-lg">
                                    <div className="animate-pulse bg-orange-400 h-2 rounded mb-2"></div>
                                    <div className="animate-pulse bg-orange-400 h-2 rounded mb-2 w-3/4"></div>
                                    <div className="animate-pulse bg-orange-400 h-2 rounded w-1/2"></div>
                                </div>
                            </div>
                        ) : scannedCode ? (
                            <div>
                                <div className="text-6xl mb-4">✅</div>
                                <p className="text-lg font-semibold text-green-600">Product Found!</p>
                                <p className="text-sm text-gray-600">Code: {scannedCode}</p>
                            </div>
                        ) : (
                            <div>
                                <div className="text-6xl mb-4">📱</div>
                                <p className="text-lg font-semibold text-gray-700">Ready to Scan</p>
                                <p className="text-sm text-gray-600">Point camera at barcode</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="space-y-3">
                        <button
                            onClick={handleScan}
                            disabled={isScanning}
                            className={`w-full p-3 rounded-lg font-bold text-white ${
                                isScanning 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                            }`}
                        >
                            {isScanning ? 'Scanning...' : '📷 Start Scan'}
                        </button>
                        <button
                            onClick={handleManualEntry}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg font-bold hover:from-blue-600 hover:to-purple-600"
                        >
                            ⌨️ Manual Entry
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('BarcodeScanner component error:', error);
        return null;
    }
}