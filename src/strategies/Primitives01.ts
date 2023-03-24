import { BigNumberish } from "ethers";
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
  tokenInAmount: BigNumberish;
  tokenInIdsProof: IdsProof;
  tokenOutIdsProof: IdsProof;
  fillCall: Call;
}

interface UnsignedStakeProofData {
  stakerSignature: string;
}

export interface Primitives01 {
  requireBitNotUsed(bitmapIndex: BigNumberish, bit: BigNumberish): Promise<unknown>;
  requireBitUsed(bitmapIndex: BigNumberish, bit: BigNumberish): Promise<unknown>;
  useBit(bitmapIndex: BigNumberish, bit: BigNumberish): Promise<unknown>;
  requireBlockMined(blockBigNumberish: BigNumberish): Promise<unknown>;
  requireBlockNotMined(blockBigNumberish: BigNumberish): Promise<unknown>;
  maxRuns(id: string, BigNumberishOfRuns: BigNumberish): Promise<unknown>;
  requireBlocksElapsed(id: string, BigNumberishOfBlocksElapsed: BigNumberish): Promise<unknown>;
  requireUint256LowerBound(uint256Oracle: string, params: string, lowerBound: BigNumberish): Promise<unknown>;
  requireUint256UpperBound(uint256Oracle: string, params: string, upperBound: BigNumberish): Promise<unknown>;
  requireStake(data: UnsignedStakeProofData): Promise<unknown>;
  transfer(token: Token, owner: string, recipient: string, amount: BigNumberish, data: UnsignedTransferData): Promise<unknown>;
  marketSwapExactInput(priceOracle: string, priceOracleParams: string, owner: string, tokenIn: Token, tokenOut: Token, tokenInAmount: BigNumberish, feePercent: BigNumberish, feeMinTokenOut: BigNumberish, data: UnsignedMarketSwapData): Promise<unknown>;
  marketSwapExactOutput(priceOracle: string, priceOracleParams: string, owner: string, tokenIn: Token, tokenOut: Token, tokenOutAmount: BigNumberish, feePercent: BigNumberish, feeMinTokenIn: BigNumberish, data: UnsignedMarketSwapData): Promise<unknown>;
  limitSwap(id: string, owner: string, tokenIn: Token, tokenOut: Token, tokenInAmount: BigNumberish, priceCurve: IPriceCurve, priceCurveParams: string, data: UnsignedLimitSwapData): Promise<unknown>;
  requireLimitSwapOpen(id: string): Promise<unknown>;
  requireLimitSwapFilled(id: string): Promise<unknown>;
  invertLimitSwapFills(swap0: string, swap1: string): Promise<unknown>;
  bindLimitSwapFills(swapIds: string[]): Promise<unknown>;
  createSeaportListing(id: string): Promise<unknown>;
}