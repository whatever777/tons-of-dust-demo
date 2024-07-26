
async function connectWallet() {
    try {
        console.log('Connect wallet function called');
        const walletConnectionSource = {
            universalLink: 'https://app.tonkeeper.com/ton-connect',
            bridgeUrl: 'https://bridge.tonapi.io/bridge'
        };

        console.log('Attempting to connect...');
        await connector.connect(walletConnectionSource);

        console.log('Connection successful');
        const walletInfo = connector.wallet;
        if (walletInfo) {
            console.log('Wallet info:', walletInfo);
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

function initializeTonConnect() {
  if (typeof TonConnect !== 'undefined') {
    const connector = new TonConnect.TonConnect({
      manifestUrl: 'https://whatever777.github.io/tons-of-dust-demo/manifest.json'
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
  } else {
    console.error('TonConnect SDK not loaded');
    document.getElementById('walletStatus').textContent = 'TonConnect SDK not available';
  }
}

// 等待页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTonConnect);
} else {
  initializeTonConnect();
}

// Telegram WebApp 初始化
if (window.Telegram && window.Telegram.WebApp) {
  window.Telegram.WebApp.ready();
} else {
  console.error('Telegram WebApp is not available');
}

// Initialize Telegram Mini App
if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
} else {
    console.error('Telegram WebApp is not available');
}
