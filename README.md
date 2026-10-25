# STON.fi integration — quote and simulation stage

This module uses the official STON.fi API client to request a real-time swap simulation on TON mainnet. It does **not** sign, send, or broadcast a transaction. Live trading remains disabled.

## Run in Termux

1. Install Node.js 20+ (`pkg install nodejs-lts`).
2. `cd stonfi-integration`
3. `npm install`
4. `cp .env.example .env`
5. Edit `.env` with the exact destination jetton address and source amount in blockchain base units.
6. `npm run typecheck`
7. `npm run quote`

For native TON as the source, `FROM_ASSET=ton`; 1 TON is 1,000,000,000 nanotons. `TO_ASSET` must be the token's exact TON jetton address, not its ticker/symbol. If you only want to inspect TON, a TON-to-TON swap is not useful.

## Current integration status

- STON.fi v2 API simulation/quote: implemented.
- Market observation scaffold: included at project root.
- Wallet connection/signing: not implemented.
- Transaction broadcast/live orders: not implemented; `LIVE_TRADING_ENABLED=false` is intentional.

Do not paste a Trust Wallet recovery phrase or private key into Termux scripts, `.env`, chat, or a cloud server. To move to real trades, add a wallet-controlled signing flow (preferably a wallet approval prompt) and implement explicit balance, fee, slippage, token-address, price-impact, duplicate-order, and daily-loss checks. A cloud process cannot spend from Trust Wallet merely because it knows a public wallet address. No strategy can guarantee profit.

Official reference: https://docs.ston.fi/developer-section/dex/sdk/v2/swap
