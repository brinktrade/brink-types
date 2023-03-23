import { IPriceCurve } from "./IPriceCurve";
import { IUint256Oracle } from "./IUint256Oracle";
import { Call } from "./StrategyBase";
import { IdsProof, Token } from "./TokenHelper";

interface UnsignedTransferData {
  recipient: string;
  idsProof: IdsProof;
}

export interface UnsignedMarketSwapData {
  recipient: string;
  tokenInIdsProof: IdsProof;
  tokenOutIdsProof: IdsProof;
  fillCall: Call;
}

export interface UnsignedLimitSwapData {
  recipient: string;
  tokenInAmount: number;
  tokenInIdsProof: IdsProof;
  tokenOutIdsProof: IdsProof;
  fillCall: Call;
}

interface UnsignedStakeProofData {
  stakerSignature: string;
}

interface Primitives01 {
  requireBitNotUsed(bitmapIndex: number, bit: number): void;
  requireBitUsed(bitmapIndex: number, bit: number): void;
  useBit(bitmapIndex: number, bit: number): void;
  requireBlockMined(blockNumber: number): void;
  requireBlockNotMined(blockNumber: number): void;
  maxRuns(id: string, numberOfRuns: number): void;
  requireBlocksElapsed(id: string, numberOfBlocksElapsed: number): void;
  requireUint256LowerBound(uint256Oracle: IUint256Oracle, params: string, lowerBound: number): void;
  requireUint256UpperBound(uint256Oracle: IUint256Oracle, params: string, upperBound: number): void;
  requireStake(data: UnsignedStakeProofData): void;
  transfer(token: Token, owner: string, recipient: string, amount: number, data: UnsignedTransferData): void;
  marketSwapExactInput(priceOracle: IUint256Oracle, priceOracleParams: string, owner: string, tokenIn: Token, tokenOut: Token, tokenInAmount: number, feePercent: number, feeMinTokenOut: number, data: UnsignedMarketSwapData): void;
  marketSwapExactOutput(priceOracle: IUint256Oracle, priceOracleParams: string, owner: string, tokenIn: Token, tokenOut: Token, tokenOutAmount: number, feePercent: number, feeMinTokenIn: number, data: UnsignedMarketSwapData): void;
  limitSwap(id: string, owner: string, tokenIn: Token, tokenOut: Token, tokenInAmount: number, priceCurve: IPriceCurve, priceCurveParams: string, data: UnsignedLimitSwapData): void;
  requireLimitSwapOpen(id: string): void;
  requireLimitSwapFilled(id: string): void;
  invertLimitSwapFills(swap0: string, swap1: string): void;
  bindLimitSwapFills(swapIds: string[]): void;
  createSeaportListing(id: string): void;
}