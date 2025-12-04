function LoginPage({ onLogin }) {
    try {
        const [username, setUsername] = React.useState('');
        const [password, setPassword] = React.useState('');
        const [showFingerprint, setShowFingerprint] = React.useState(false);

        const handleLogin = (e) => {
            e.preventDefault();
            if (username.trim() && password.trim()) {
                onLogin(true, {
                    name: username,
                    id: 'CSH001',
                    location: { name: 'Fresh Grocery Main', address: 'Kimathi Street, Nairobi' }
                });
            } else {
                alert('Please enter username and password');
            }
        };

        const handleFingerprintLogin = () => {
            setShowFingerprint(true);
            setTimeout(() => {
                setShowFingerprint(false);
                onLogin(true, {
                    name: 'Fingerprint User',
                    id: 'CSH002',
                    location: { name: 'Fresh Grocery Main', address: 'Kimathi Street, Nairobi' }
                });
            }, 2000);
        };

        return (
            <div data-name="login-page" className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 flex items-center justify-center p-4">
                <div className="bg-gradient-to-br from-white/15 to-emerald-500/20 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-lg border border-white/20">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-3">
                            <span className="text-white">🛒</span> 
                            <span className="bg-gradient-to-r from-yellow-300 to-lime-400 bg-clip-text text-transparent">FRESH</span>
                            <span className="bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">MART</span>
                        </h1>
                        <p className="text-emerald-200 text-lg font-semibold">Best Choice</p>
                        <div className="flex justify-center space-x-2 text-2xl mt-4">
                            <span>🥕</span><span>🥬</span><span>🍅</span><span>🧅</span>
                            <span>🍎</span><span>🍌</span><span>🥛</span><span>🍞</span>
                        </div>
                    </div>

                    {showFingerprint && (
                        <div className="text-center mb-6 p-6 bg-blue-500/20 rounded-xl backdrop-blur-sm">
                            <i className="fas fa-fingerprint text-5xl text-blue-300 animate-pulse mb-3"></i>
                            <p className="text-white text-lg">Place finger on scanner...</p>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5 mb-6">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-emerald-200 backdrop-blur-sm text-lg"
                            placeholder="👤 Username"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-emerald-200 backdrop-blur-sm text-lg"
                            placeholder="🔒 Password"
                        />
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all"
                        >
                            🔑 Login to System
                        </button>
                    </form>

                    <div className="space-y-4">
                        <button
                            onClick={handleFingerprintLogin}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                        >
                            <i className="fas fa-fingerprint mr-2"></i>Fingerprint Login
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('LoginPage component error:', error);
        return null;
    }
}