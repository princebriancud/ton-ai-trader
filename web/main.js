import { TonConnectUI } from '@tonconnect/ui';

const status = document.getElementById('status');

const manifestUrl =
  'https://YOUR-DOMAIN.example/tonconnect-manifest.json';

const tonConnectUI = new TonConnectUI({
  manifestUrl,
  buttonRootId: 'ton-connect'
});

tonConnectUI.onStatusChange((wallet) => {
  if (wallet) {
    status.textContent =
      'Connected wallet: ' + wallet.account.address;
  } else {
    status.textContent = 'Not connected';
  }
});
