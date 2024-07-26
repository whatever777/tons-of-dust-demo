// 调试函数
function debug(message) {
    const debugElement = document.getElementById('debug');
    const timestamp = new Date().toLocaleTimeString();
    debugElement.innerHTML += `[${timestamp}] ${message}<br>`;
    console.log(`[${timestamp}] ${message}`);
}

function checkSDKLoaded() {
    debug('Checking if TonConnect SDK is loaded');
    if (typeof TonConnect === 'undefined') {
        debug('TonConnect is undefined. Attempting to load manually.');
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@tonconnect/sdk@2.1.3/dist/tonconnect-sdk.min.js';
        script.onload = function() {
            debug('TonConnect SDK loaded manually');
            initializeTonConnect();
        };
        script.onerror = function() {
            debug('Failed to load TonConnect SDK manually');
        };
        document.head.appendChild(script);
    } else {
        debug('TonConnect SDK is already loaded');
        initializeTonConnect();
    }
}

// 初始化函数
function initializeTonConnect() {
    debug('Initializing TonConnect');
    if (typeof TonConnect !== 'undefined') {
        debug('TonConnect SDK loaded successfully');
        const connector = new TonConnect.TonConnect({
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
    } else {
        debug('TonConnect SDK not loaded');
        document.getElementById('walletStatus').textContent = 'TonConnect SDK not available';
    }
}

// 等待页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTonConnect);
} else {
    checkSDKLoaded();
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
