
import { Uint256Oracle } from "./Uint256Oracle";
import { IdsProof, Token } from "./smartContracts/TokenHelper";
import { UnsignedMarketSwapData, UnsignedLimitSwapData } from "./smartContracts/Primitives01";
import { IPriceCurve } from "./smartContracts/IPriceCurve";
import { BigNumberish } from "ethers";
export interface IBitMap {
  bitmapIndex: BigNumberish;
  bit: BigNumberish
}

export interface IBlock {
  blockNumber: BigNumberish;
}

export interface IBlockElapsed {
  id: string, 
  numberOfBlocksElapsed: BigNumberish,
}

export interface IRuns {
  id: string, 
  numberOfRuns: number,
}

interface IBound {
  uint256Oracle: Uint256Oracle, 
  params: string, 
}

export interface ILowerBound extends IBound {
  lowerBound: BigNumberish;
}

export interface IUpperBound extends IBound {
  upperBound: BigNumberish;
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
  amount: BigNumberish, 
  data: UnsignedTransferData
}

interface IMarketSwap {
  priceOracle: Uint256Oracle, 
  priceOracleParams: string, 
  owner: string, 
  tokenIn: Token, 
  tokenOut: Token, 
  feePercent: BigNumberish, 
  feeMinTokenOut: BigNumberish, 
  data: UnsignedMarketSwapData
}

export interface IMarketSwapExactOutput extends IMarketSwap {
  tokenOutAmount: BigNumberish, 
}

export interface IMarketSwapExactInput extends IMarketSwap {
  tokenInAmount: BigNumberish, 
}

export interface ILimitSwap {
  id: string, 
  owner: string, 
  tokenIn: Token, 
  tokenOut: Token, 
  tokenInAmount: BigNumberish, 
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

export type OrderParam =  IRequireLimitSwap | ILimitSwap | IMarketSwapExactInput | IMarketSwapExactOutput | ITransfer | UnsignedTransferData | IStake | IUpperBound | ILowerBound | IRuns |IBlockElapsed | IBlock | IBitMap

export type Orders = OrderParam[]