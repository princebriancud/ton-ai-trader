import "dotenv/config";
import { StonApiClient } from "@ston-fi/api";

const from = (process.env.FROM_ASSET || "ton").trim();
const to = (process.env.TO_ASSET || "").trim();
const amount = (process.env.AMOUNT_UNITS || "").trim();
const slippage = (process.env.SLIPPAGE_TOLERANCE || "0.01").trim();
const maxSlippage = Number(process.env.MAX_SLIPPAGE_TOLERANCE || "0.01");

if (!to || !amount || !/^\d+$/.test(amount) || BigInt(amount) <= 0n) {
  console.error("Configure TO_ASSET and AMOUNT_UNITS as a positive integer in blockchain base units in .env.");
  process.exit(1);
}
if (!Number.isFinite(Number(slippage)) || Number(slippage) <= 0 || Number(slippage) > maxSlippage) {
  console.error(`SLIPPAGE_TOLERANCE must be > 0 and <= MAX_SLIPPAGE_TOLERANCE (${maxSlippage}).`);
  process.exit(1);
}

try {
  const api = new StonApiClient();
  const result = await api.simulateSwap({
    offerAddress: from,
    askAddress: to,
    offerUnits: amount,
    slippageTolerance: slippage,
  });
  const output = {
    timestamp: new Date().toISOString(),
    mode: "SIMULATION_ONLY",
    offerAddress: result.offerAddress,
    offerUnits: result.offerUnits,
    askAddress: result.askAddress,
    expectedMinimumAskUnits: result.minAskUnits,
    router: result.router,
    safety: {
      transactionSigned: false,
      transactionBroadcast: false,
      liveTradingEnabled: false,
    },
    warning: "Quote/simulation only. This does not execute a trade or guarantee the quoted output.",
  };
  console.log(JSON.stringify(output, null, 2));
} catch (error) {
  console.error("STON.fi simulation failed. Check asset addresses, amount units, API availability, and package versions.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
