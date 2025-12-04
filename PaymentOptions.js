function PaymentOptions({ total, onPaymentComplete, cartItems, isVisible = true }) {
    try {
        const [selectedPayment, setSelectedPayment] = React.useState('');
        const [phoneNumber, setPhoneNumber] = React.useState('');
        const [cashAmount, setCashAmount] = React.useState('');
        const [confirmationCode, setConfirmationCode] = React.useState('');
        const [isProcessing, setIsProcessing] = React.useState(false);
        const [showConfirmation, setShowConfirmation] = React.useState(false);

        if (!cartItems || cartItems.length === 0) {
            return null;
        }

        const tillNumber = window.mpesaConfig?.tillNumber || "4087549";

        const generateTransactionCode = () => {
            return 'SKM' + Math.random().toString(36).substr(2, 8).toUpperCase();
        };

        const handleMpesaPayment = async () => {
            if (!phoneNumber) {
                alert('Please enter your phone number');
                return;
            }
            
            setIsProcessing(true);
            const transactionCode = generateTransactionCode();
            
            setTimeout(() => {
                setIsProcessing(false);
                setShowConfirmation(true);
                alert(`M-Pesa payment request sent to ${phoneNumber}\nTransaction Code: ${transactionCode}\nEnter confirmation code to complete payment`);
            }, 2000);
        };

        const handleConfirmPayment = () => {
            if (!confirmationCode) {
                alert('Please enter confirmation code');
                return;
            }
            const transactionCode = generateTransactionCode();
            onPaymentComplete('M-Pesa', total, `Phone: ${phoneNumber}, Code: ${confirmationCode}, Ref: ${transactionCode}`);
            resetForm();
        };

        const handleCashPayment = () => {
            const cash = parseFloat(cashAmount);
            if (!cash || cash < total) {
                alert(`Insufficient cash! Need at least Ksh ${total.toFixed(2)}`);
                return;
            }
            const change = cash - total;
            const transactionCode = generateTransactionCode();
            onPaymentComplete('Cash', total, `Cash: ${cash}, Change: ${change.toFixed(2)}, Ref: ${transactionCode}`);
            resetForm();
        };

        const handleCardPayment = () => {
            const transactionCode = generateTransactionCode();
            onPaymentComplete('Card', total, `Card Payment, Ref: ${transactionCode}`);
            resetForm();
        };

        const resetForm = () => {
            setSelectedPayment('');
            setPhoneNumber('');
            setCashAmount('');
            setConfirmationCode('');
            setShowConfirmation(false);
        };

        return (
            <div data-name="payment-options" className="bg-gradient-to-br from-orange-100 via-red-100 to-pink-100 p-4 rounded-xl border-2 border-orange-300 shadow-lg mt-3">
                <h4 className="text-center font-bold text-lg bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3 flex items-center justify-center">
                    💳 Payment Options - Total: Ksh {total?.toFixed(2)}
                </h4>
                
                <div className="grid grid-cols-3 gap-2 mb-3">
                    <button
                        onClick={() => setSelectedPayment('mpesa')}
                        className={`p-3 rounded-lg text-white font-bold text-sm transition-all shadow-md ${
                            selectedPayment === 'mpesa' 
                                ? 'bg-gradient-to-r from-green-600 to-green-700 scale-105' 
                                : 'bg-gradient-to-r from-green-500 to-green-600 hover:scale-105'
                        }`}
                    >
                        <div className="text-center">
                            <div className="text-xl mb-1">📱</div>
                            <div className="text-xs">M-PESA</div>
                            <div className="text-xs opacity-75">Till: {tillNumber}</div>
                        </div>
                    </button>

                    <button
                        onClick={() => setSelectedPayment('cash')}
                        className={`p-3 rounded-lg text-white font-bold text-sm transition-all shadow-md ${
                            selectedPayment === 'cash' 
                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 scale-105' 
                                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:scale-105'
                        }`}
                    >
                        <div className="text-center">
                            <div className="text-xl mb-1">💵</div>
                            <div className="text-xs">CASH</div>
                            <div className="text-xs opacity-75">Physical</div>
                        </div>
                    </button>

                    <button
                        onClick={handleCardPayment}
                        className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold text-sm transition-all shadow-md hover:scale-105"
                    >
                        <div className="text-center">
                            <div className="text-xl mb-1">💳</div>
                            <div className="text-xs">CARD</div>
                            <div className="text-xs opacity-75">Swipe</div>
                        </div>
                    </button>
                </div>

                {selectedPayment === 'mpesa' && (
                    <div className="bg-green-50 p-3 rounded-lg border border-green-300 mb-3">
                        {!showConfirmation ? (
                            <div>
                                <input
                                    type="tel"
                                    placeholder="Phone number (254...)"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full p-2 border border-green-300 rounded mb-2 text-sm"
                                />
                                <button
                                    onClick={handleMpesaPayment}
                                    disabled={isProcessing}
                                    className="w-full bg-green-600 text-white p-2 rounded font-bold text-sm disabled:opacity-50"
                                >
                                    {isProcessing ? '⏳ Sending...' : `📱 Pay Ksh ${total?.toFixed(2)}`}
                                </button>
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="text"
                                    placeholder="M-Pesa confirmation code"
                                    value={confirmationCode}
                                    onChange={(e) => setConfirmationCode(e.target.value)}
                                    className="w-full p-2 border border-green-300 rounded mb-2 text-sm"
                                />
                                <button
                                    onClick={handleConfirmPayment}
                                    className="w-full bg-emerald-600 text-white p-2 rounded font-bold text-sm"
                                >
                                    ✅ Confirm Payment
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {selectedPayment === 'cash' && (
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-300">
                        <input
                            type="number"
                            placeholder={`Cash amount (min: ${total?.toFixed(2)})`}
                            value={cashAmount}
                            onChange={(e) => setCashAmount(e.target.value)}
                            className="w-full p-2 border border-blue-300 rounded mb-2 text-sm"
                        />
                        <div className="bg-yellow-100 p-2 rounded mb-2 text-center border border-yellow-300">
                            <span className="text-sm font-bold text-orange-800">
                                💰 Change: Ksh {cashAmount ? Math.max(0, parseFloat(cashAmount) - total).toFixed(2) : '0.00'}
                            </span>
                        </div>
                        <button
                            onClick={handleCashPayment}
                            className="w-full bg-blue-600 text-white p-2 rounded font-bold text-sm"
                        >
                            💵 Complete Cash Payment
                        </button>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('PaymentOptions component error:', error);
        return null;
    }
}