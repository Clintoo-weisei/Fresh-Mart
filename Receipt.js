function Receipt({ items, onPrint, paymentCompleted, paymentMethod, paymentAmount, currentCashier, onClose }) {
    try {
        if (!paymentCompleted) return null;
        if (!window.calculations || items.length === 0) return React.createElement('div', null, 'Loading receipt...');

        const { calculateSubtotal, calculateTax, calculateTotal } = window.calculations;
        const subtotal = calculateSubtotal(items);
        const tax = calculateTax(subtotal);
        const total = calculateTotal(subtotal, tax);
        
        const currentDate = new Date().toLocaleDateString();
        const currentTime = new Date().toLocaleTimeString();
        const receiptNumber = `RCP-${Date.now().toString().slice(-8)}`;

        return React.createElement('div', { 
            className: 'fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4' 
        },
            React.createElement('div', { 
                className: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-2xl border-2 border-indigo-300 w-full max-w-md h-[85vh] flex flex-col' 
            },
                React.createElement('div', { 
                    className: 'flex justify-between items-center p-4 border-b-2 border-indigo-200 bg-gradient-to-r from-indigo-600 to-purple-600' 
                },
                    React.createElement('h3', { className: 'text-xl font-bold text-white' }, '🧾 Receipt'),
                    React.createElement('button', { 
                        onClick: onClose, 
                        className: 'text-red-500 hover:text-red-700 bg-red-100 hover:bg-red-200 rounded-lg p-2 transition-all' 
                    }, React.createElement('i', { className: 'fas fa-times' }))
                ),
                
                React.createElement('div', { 
                    className: 'flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-100' 
                },
                    React.createElement('div', { className: 'receipt-paper bg-white p-4 rounded-xl shadow-lg border border-gray-200' },
                        React.createElement('div', { className: 'text-center mb-4 border-b-2 border-red-400 pb-4' },
                            React.createElement('div', { className: 'flex justify-center mb-2' },
                                React.createElement('div', { 
                                    className: 'w-16 h-16 bg-gradient-to-br from-red-500 via-orange-500 to-green-500 rounded-full flex items-center justify-center shadow-lg' 
                                }, React.createElement('span', { className: 'text-2xl text-white font-bold' }, '🏪'))
                            ),
                            React.createElement('h2', { className: 'text-2xl font-bold text-red-600 mb-1' }, 'FRESHMART'),
                            React.createElement('p', { className: 'text-sm font-semibold text-orange-600' }, 'Nairobi Main Branch'),
                            React.createElement('p', { className: 'text-sm text-green-600' }, '📞 +254 700 123 456')
                        ),
                        
                        React.createElement('div', { className: 'mb-4 border-b border-red-300 pb-3' },
                            React.createElement('div', { className: 'grid grid-cols-2 gap-2 text-sm' },
                                React.createElement('div', { className: 'text-gray-700' }, 
                                    '🧾 Receipt #: ', 
                                    React.createElement('span', { className: 'font-bold text-red-600' }, receiptNumber)
                                ),
                                React.createElement('div', { className: 'text-gray-700' }, 
                                    '📅 Date: ', 
                                    React.createElement('span', { className: 'font-bold text-green-600' }, currentDate)
                                ),
                                React.createElement('div', { className: 'text-gray-700' }, 
                                    '⏰ Time: ', 
                                    React.createElement('span', { className: 'font-bold text-orange-600' }, currentTime)
                                ),
                                React.createElement('div', { className: 'text-gray-700' }, 
                                    '👤 Cashier: ', 
                                    React.createElement('span', { className: 'font-bold text-purple-600' }, currentCashier?.name || 'Staff')
                                )
                            )
                        ),
                        
                        React.createElement('div', { className: 'mb-4' },
                            React.createElement('h3', { className: 'font-bold text-center mb-3 text-red-600 text-lg pb-2 border-b border-red-300' }, '🛍️ ITEMS PURCHASED'),
                            React.createElement('div', { className: 'max-h-40 overflow-y-auto' },
                                items.map((item, index) => 
                                    React.createElement('div', { key: index },
                                        React.createElement('div', { className: 'flex justify-between items-center py-2 px-2' },
                                            React.createElement('div', { className: 'flex-1 flex items-center' },
                                                React.createElement('span', { className: 'mr-3 text-lg' }, item.icon),
                                                React.createElement('div', null,
                                                    React.createElement('p', { className: 'font-bold text-sm text-gray-800' }, item.name),
                                                    React.createElement('p', { className: 'text-xs font-semibold text-orange-600' }, 
                                                        `${item.quantity} × Ksh ${item.price.toFixed(2)}`
                                                    )
                                                )
                                            ),
                                            React.createElement('span', { className: 'font-bold text-sm text-green-600' }, 
                                                `Ksh ${(item.quantity * item.price).toFixed(2)}`
                                            )
                                        ),
                                        index < items.length - 1 && React.createElement('div', { className: 'border-b border-dotted border-gray-400 my-2' })
                                    )
                                )
                            )
                        ),
                        
                        React.createElement('div', { className: 'border-t-2 border-red-400 pt-3 mb-4' },
                            React.createElement('div', { className: 'space-y-2 text-sm' },
                                React.createElement('div', { className: 'flex justify-between' },
                                    React.createElement('span', { className: 'text-gray-700' }, 'Subtotal:'),
                                    React.createElement('span', { className: 'font-bold text-green-600' }, `Ksh ${subtotal.toFixed(2)}`)
                                ),
                                React.createElement('div', { className: 'flex justify-between' },
                                    React.createElement('span', { className: 'text-gray-700' }, 'VAT (8%):'),
                                    React.createElement('span', { className: 'font-bold text-orange-600' }, `Ksh ${tax.toFixed(2)}`)
                                ),
                                React.createElement('div', { className: 'border-t-2 border-red-400 pt-2 mt-3' },
                                    React.createElement('div', { className: 'flex justify-between text-lg font-black' },
                                        React.createElement('span', { className: 'text-gray-800' }, 'TOTAL:'),
                                        React.createElement('span', { className: 'text-red-600 text-xl' }, `Ksh ${total.toFixed(2)}`)
                                    )
                                )
                            )
                        ),
                        
                        React.createElement('div', { className: 'border-t border-red-300 pt-3 text-center' },
                            React.createElement('h4', { className: 'text-sm font-bold mb-2 text-green-600' }, '🙏 THANK YOU FOR SHOPPING WITH US!'),
                            React.createElement('p', { className: 'text-xs text-gray-600 mb-1' }, 'Return Policy: Items can be returned within 7 days with receipt'),
                            React.createElement('p', { className: 'text-xs text-green-600 mt-2' }, 'Visit us again for fresh groceries daily!')
                        )
                    )
                ),
                
                React.createElement('div', { className: 'flex gap-2 p-4 border-t-2 border-indigo-200 bg-gradient-to-r from-indigo-600 to-purple-600' },
                    React.createElement('button', { 
                        onClick: onPrint, 
                        className: 'flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-2 rounded-lg font-bold hover:from-blue-700 hover:to-indigo-800 transition-all' 
                    }, '🖨️ Print'),
                    React.createElement('button', { 
                        onClick: () => alert('📱 SMS feature available'), 
                        className: 'flex-1 bg-gradient-to-r from-green-600 to-teal-700 text-white p-2 rounded-lg font-bold hover:from-green-700 hover:to-teal-800 transition-all' 
                    }, '📱 SMS')
                )
            )
        );
    } catch (error) {
        console.error('Receipt component error:', error);
        return null;
    }
}