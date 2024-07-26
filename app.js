const connector = new TonConnect.TonConnect({
    manifestUrl: 'https://你的GitHub用户名.github.io/tons-of-dust-demo/manifest.json'
});

document.getElementById('connectWallet').addEventListener('click', connectWallet);

async function connectWallet() {
    try {
        const walletConnectionSource = {
            universalLink: 'https://app.tonkeeper.com/ton-connect',
            bridgeUrl: 'https://bridge.tonapi.io/bridge'
        };
        
        await connector.connect(walletConnectionSource);
        
        const walletInfo = connector.wallet;
        if (walletInfo) {
            document.getElementById('walletStatus').textContent = `Connected: ${walletInfo.account.address}`;
        }
    } catch (error) {
        console.error('Connection error:', error);
        document.getElementById('walletStatus').textContent = 'Connection failed';
    }
}

// Check if wallet is already connected
if (connector.connected) {
    const walletInfo = connector.wallet;
    document.getElementById('walletStatus').textContent = `Connected: ${walletInfo.account.address}`;
}

// Initialize Telegram Mini App
window.Telegram.WebApp.ready();
