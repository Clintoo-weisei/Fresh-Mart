window.mpesaConfig = {
    consumerKey: "CB6sUxSi8gAUymTiZQdSzWIYNLBhQT0ZVSmf0s0FnuZCpeRn",
    consumerSecret: "WfmsiH8Rqs9dzHyGaciiRiq7GKzTDXb40uPRKpBj1hmCgFXAjOah0bi9tXsmfqtq",
    passkey: "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
    shortcode: "174379",
    tillNumber: "4087549",
    environment: "sandbox"
};

window.transactionUtils = {
    generateSafaricomCode: () => {
        const prefixes = ['SKM', 'SAF', 'MPE'];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const numbers = Math.random().toString(36).substr(2, 8).toUpperCase();
        return prefix + numbers;
    },

    generateReceiptCode: () => {
        return 'GR-' + Date.now().toString().slice(-8);
    },

    saveReceiptToHistory: (receiptData) => {
        const existingReceipts = JSON.parse(localStorage.getItem('receiptHistory') || '[]');
        const newReceipt = {
            ...receiptData,
            id: Date.now(),
            timestamp: new Date().toISOString()
        };
        existingReceipts.unshift(newReceipt);
        
        if (existingReceipts.length > 100) {
            existingReceipts.splice(100);
        }
        
        localStorage.setItem('receiptHistory', JSON.stringify(existingReceipts));
        return newReceipt;
    },

    formatPhoneNumber: (phone) => {
        phone = phone.replace(/\D/g, '');
        if (phone.startsWith('0')) {
            phone = '254' + phone.substring(1);
        } else if (phone.startsWith('7') || phone.startsWith('1')) {
            phone = '254' + phone;
        }
        return phone;
    },

    generateTimestamp: () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hour = String(now.getHours()).padStart(2, '0');
        const minute = String(now.getMinutes()).padStart(2, '0');
        const second = String(now.getSeconds()).padStart(2, '0');
        return year + month + day + hour + minute + second;
    },

    simulateMpesaPayment: (phoneNumber, amount) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const transactionCode = window.transactionUtils.generateSafaricomCode();
                resolve({
                    success: true,
                    transactionId: transactionCode,
                    message: 'Payment successful',
                    phoneNumber: phoneNumber,
                    amount: amount,
                    timestamp: window.transactionUtils.generateTimestamp()
                });
            }, 2000);
        });
    }
};