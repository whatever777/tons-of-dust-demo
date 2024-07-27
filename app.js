// 调试函数
function debug(message) {
    const debugElement = document.getElementById('debug');
    const timestamp = new Date().toLocaleTimeString();
    debugElement.innerHTML += `[${timestamp}] ${message}<br>`;
    console.log(`[${timestamp}] ${message}`);
}

// 初始化 TonConnect
function initializeTonConnect() {
    debug('Initializing TonConnect');
    try {
        const connector = new TonConnectSDK.TonConnect({
            manifestUrl: 'https://whatever777.github.io/tons-of-dust-demo/manifest.json'
        });
        debug('TonConnect instance created');

        document.getElementById('connectWallet').addEventListener('click', connectWallet);

        async function connectWallet() {
            debug('Connect wallet button clicked');
            try {
                const walletConnectionSource = {
                    universalLink: 'https://app.tonkeeper.com/ton-connect',
                    bridgeUrl: 'https://bridge.tonapi.io/bridge'
                };
                
                debug('Attempting to connect to wallet');
                await connector.connect(walletConnectionSource);
                
                debug('Wallet connected successfully');
                const walletInfo = connector.wallet;
                if (walletInfo) {
                    debug(`Wallet info received: ${JSON.stringify(walletInfo)}`);
                    document.getElementById('walletStatus').textContent = `Connected: ${walletInfo.account.address}`;
                }
            } catch (error) {
                debug(`Connection error: ${error.message}`);
                console.error('Connection error:', error);
                document.getElementById('walletStatus').textContent = 'Connection failed';
            }
        }
    } catch (error) {
        debug(`Error initializing TonConnect: ${error.message}`);
    }
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTonConnect);
} else {
    initializeTonConnect();
}

// Telegram WebApp 初始化
if (window.Telegram && window.Telegram.WebApp) {
    debug('Telegram WebApp is available');
    window.Telegram.WebApp.ready();
} else {
    debug('Telegram WebApp is not available');
}

// 添加一些额外的调试信息
debug('App script loaded');
debug(`User Agent: ${navigator.userAgent}`);
debug(`Screen size: ${window.screen.width}x${window.screen.height}`);
