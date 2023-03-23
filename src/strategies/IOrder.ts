
import { IUint256Oracle } from "./IUint256Oracle";
import { IdsProof, Token } from "./TokenHelper";
import { UnsignedMarketSwapData, UnsignedLimitSwapData } from "./Primitives01";
import { IPriceCurve } from "./IPriceCurve";

export interface IBitMap {
  bitmapIndex: number;
  bit: number
}

export interface IBlock {
  blockNumber: number;
}

export interface IBlockElapsed {
  id: string, 
  numberOfBlocksElapsed: number,
}

export interface IRuns {
  id: string, 
  numberOfRuns: number,
}

interface IBound {
  uint256Oracle: IUint256Oracle, 
  params: string, 
}

export interface ILowerBound extends IBound {
  lowerBound: number;
}

export interface IUpperBound extends IBound {
  upperBound: number;
}

export interface IStake {
  data: string;
}

export interface UnsignedTransferData {
  recipient: string;
  idsProof: IdsProof;
}

export interface ITransfer {
  token: Token, 
  owner: string, 
  recipient: string, 
  amount: number, 
  data: UnsignedTransferData
}

interface IMarketSwap {
  priceOracle: IUint256Oracle, 
  priceOracleParams: string, 
  owner: string, 
  tokenIn: Token, 
  tokenOut: Token, 
  feePercent: number, 
  feeMinTokenOut: number, 
  data: UnsignedMarketSwapData
}

export interface IMarketSwapExactOutput extends IMarketSwap {
  tokenOutAmount: number, 
}

export interface IMarketSwapExactInput extends IMarketSwap {
  tokenInAmount: number, 
}

export interface ILimitSwap {
  id: string, 
  owner: string, 
  tokenIn: Token, 
  tokenOut: Token, 
  tokenInAmount: number, 
  priceCurve: IPriceCurve, 
  priceCurveParams: string, 
  data: UnsignedLimitSwapData
}

export interface IRequireLimitSwap {
  id: string
}

export interface IBindLimitSwap {
  swapIds: string[]
}

export type createSeaportListing = {
  id: string
}

export type Order =  IRequireLimitSwap | ILimitSwap | IMarketSwapExactInput | IMarketSwapExactOutput | ITransfer | UnsignedTransferData | IStake | IUpperBound | ILowerBound | IRuns |IBlockElapsed | IBlock | IBitMap

export type Orders = Order[]