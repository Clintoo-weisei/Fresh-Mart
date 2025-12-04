function Calculator({ onClose }) {
    try {
        const [display, setDisplay] = React.useState('0');
        const [previousValue, setPreviousValue] = React.useState(null);
        const [operation, setOperation] = React.useState(null);
        const [waitingForNewValue, setWaitingForNewValue] = React.useState(false);

        const inputNumber = (num) => {
            if (waitingForNewValue) {
                setDisplay(String(num));
                setWaitingForNewValue(false);
            } else {
                setDisplay(display === '0' ? String(num) : display + num);
            }
        };

        const inputOperation = (nextOperation) => {
            const inputValue = parseFloat(display);
            if (previousValue === null) {
                setPreviousValue(inputValue);
            } else if (operation) {
                const currentValue = previousValue || 0;
                const newValue = calculate(currentValue, inputValue, operation);
                setDisplay(String(newValue));
                setPreviousValue(newValue);
            }
            setWaitingForNewValue(true);
            setOperation(nextOperation);
        };

        const calculate = (firstValue, secondValue, operation) => {
            switch (operation) {
                case '+': return firstValue + secondValue;
                case '-': return firstValue - secondValue;
                case '*': return firstValue * secondValue;
                case '/': return firstValue / secondValue;
                case '=': return secondValue;
                default: return secondValue;
            }
        };

        const performCalculation = () => {
            const inputValue = parseFloat(display);
            if (previousValue !== null && operation) {
                const newValue = calculate(previousValue, inputValue, operation);
                setDisplay(String(newValue));
                setPreviousValue(null);
                setOperation(null);
                setWaitingForNewValue(true);
            }
        };

        const clearAll = () => {
            setDisplay('0');
            setPreviousValue(null);
            setOperation(null);
            setWaitingForNewValue(false);
        };

        return (
            <div data-name="calculator-overlay" className="fixed inset-0 bg-gradient-to-br from-black/60 via-purple-900/50 to-pink-900/60 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-gradient-to-br from-white via-purple-50 to-blue-50 rounded-2xl shadow-2xl p-6 w-96 border-4 border-gradient-to-r from-purple-400 to-blue-400">
                    <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl">
                        <h3 className="text-lg font-bold text-white">🧮 Calculator</h3>
                        <button onClick={onClose} className="text-white hover:text-red-200 bg-red-500/30 hover:bg-red-500/50 p-1 rounded-lg transition-all">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 rounded-xl mb-4 text-right text-2xl font-mono shadow-inner">
                        <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold">{display}</span>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2">
                        <button onClick={clearAll} className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-xl font-bold col-span-2">Clear</button>
                        <button onClick={() => inputOperation('/')} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl font-bold">÷</button>
                        <button onClick={() => inputOperation('*')} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl font-bold">×</button>
                        
                        <button onClick={() => inputNumber(7)} className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 p-3 rounded-xl font-bold">7</button>
                        <button onClick={() => inputNumber(8)} className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 p-3 rounded-xl font-bold">8</button>
                        <button onClick={() => inputNumber(9)} className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 p-3 rounded-xl font-bold">9</button>
                        <button onClick={() => inputOperation('-')} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl font-bold">-</button>
                        
                        <button onClick={() => inputNumber(4)} className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 p-3 rounded-xl font-bold">4</button>
                        <button onClick={() => inputNumber(5)} className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 p-3 rounded-xl font-bold">5</button>
                        <button onClick={() => inputNumber(6)} className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 p-3 rounded-xl font-bold">6</button>
                        <button onClick={() => inputOperation('+')} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl font-bold">+</button>
                        
                        <button onClick={() => inputNumber(1)} className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 p-3 rounded-xl font-bold">1</button>
                        <button onClick={() => inputNumber(2)} className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 p-3 rounded-xl font-bold">2</button>
                        <button onClick={() => inputNumber(3)} className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 p-3 rounded-xl font-bold">3</button>
                        <button onClick={performCalculation} className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-xl font-bold row-span-2">=</button>
                        
                        <button onClick={() => inputNumber(0)} className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 p-3 rounded-xl font-bold col-span-2">0</button>
                        <button onClick={() => setDisplay(display + '.')} className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 p-3 rounded-xl font-bold">.</button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Calculator component error:', error);
        return null;
    }
}