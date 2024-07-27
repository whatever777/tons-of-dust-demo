// 调试函数
function debug(message) {
    const debugElement = document.getElementById('debug');
    const timestamp = new Date().toLocaleTimeString();
    debugElement.innerHTML += `[${timestamp}] ${message}<br>`;
    console.log(`[${timestamp}] ${message}`);
}

// 在文件开头添加
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
        debug('TonConnect SDK loaded finished');
    });
}

async function checkSDKLoaded() {
    debug('Checking if TonConnect SDK is loaded');
    if (typeof TonConnect === 'undefined') {
        debug('TonConnect is undefined. Attempting to load manually.');
        try {
            await loadScript('https://unpkg.com/@tonconnect/sdk@2.1.3/dist/tonconnect-sdk.min.js');
            debug('TonConnect SDK loaded manually');
            await initializeTonConnect();
        } catch (error) {
            debug(`Failed to load TonConnect SDK manually: ${error.message}`);
        }
    } else {
        debug('TonConnect SDK is already loaded');
        await initializeTonConnect();
    }
}

async function initializeTonConnect() {
    debug('Initializing TonConnect');
    if (typeof TonConnect !== 'undefined') {
        debug('TonConnect SDK loaded successfully');
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
    } else {
        debug('TonConnect SDK not loaded');
        document.getElementById('walletStatus').textContent = 'TonConnect SDK not available';
    }
}

// 修改页面加载完成后的初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkSDKLoaded);
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
