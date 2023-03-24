
import { BigNumberish } from 'ethers';
import { Orders, Order, IBitMap, UnsignedTransferData } from './src/strategies/IOrder'
import { IPriceCurve } from './src/strategies/IPriceCurve';
import { Primitives01, UnsignedLimitSwapData, UnsignedMarketSwapData } from './src/strategies/Primitives01';
import { Token } from './src/strategies/TokenHelper';

export class Primitives implements Primitives01 {
  constructor() {}

  create({type, order}: ({ order: Order, type: string})): Promise<unknown> {

    // As example of use. Better to determine dynamically the order type.
    switch (type) {
      case 'useBit':
        return this.useBit((order as IBitMap).bitmapIndex, (order as IBitMap).bit);    
      default:
        throw new Error('Invalid order type');
    }
  }

  requireBitNotUsed(bitmapIndex: BigNumberish, bit: BigNumberish): Promise<unknown> {
    // Validate bit and bitmapIndex are valid
    throw new Error('Method not implemented.');
  }
  requireBitUsed(bitmapIndex: BigNumberish, bit: BigNumberish): Promise<unknown> {
    // Validate bit and bitmapIndex are valid
    throw new Error('Method not implemented.');
  }
  useBit(bitmapIndex: BigNumberish, bit: BigNumberish): Promise<unknown> {
    // Validate bit and bitmapIndex are valid
    throw new Error('Method not implemented.');
    // return { type: , data }
  }
  requireBlockMined(blockNumber: BigNumberish): Promise<unknown> {
    // Validate blockNumber is valid
    throw new Error('Method not implemented.');
  }
  requireBlockNotMined(blockNumber: BigNumberish): Promise<unknown> {
    // Validate blockNumber is valid
    throw new Error('Method not implemented.');
  }
  maxRuns(id: string, numberRuns: BigNumberish): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  requireBlocksElapsed(id: string, BigNumberishOfBlocksElapsed: BigNumberish): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  requireUint256LowerBound(uint256Oracle: string, params: string, lowerBound: BigNumberish): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  requireUint256UpperBound(uint256Oracle: string, params: string, upperBound: BigNumberish): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  requireStake(data: UnsignedStakeProofData): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  transfer(token: Token, owner: string, recipient: string, amount: BigNumberish, data: UnsignedTransferData): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  marketSwapExactInput(priceOracle: string, priceOracleParams: string, owner: string, tokenIn: Token, tokenOut: Token, tokenInAmount: BigNumberish, feePercent: BigNumberish, feeMinTokenOut: BigNumberish, data: UnsignedMarketSwapData): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  marketSwapExactOutput(priceOracle: string, priceOracleParams: string, owner: string, tokenIn: Token, tokenOut: Token, tokenOutAmount: BigNumberish, feePercent: BigNumberish, feeMinTokenIn: BigNumberish, data: UnsignedMarketSwapData): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  limitSwap(id: string, owner: string, tokenIn: Token, tokenOut: Token, tokenInAmount: BigNumberish, priceCurve: IPriceCurve, priceCurveParams: string, data: UnsignedLimitSwapData): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  requireLimitSwapOpen(id: string): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  requireLimitSwapFilled(id: string): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  invertLimitSwapFills(swap0: string, swap1: string): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  bindLimitSwapFills(swapIds: string[]): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  createSeaportListing(id: string): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
}

const primitives = new Primitives();

const replayBit =  primitives.useBit('1', '1');

const expiry = primitives.requireBlockNotMined('16802111')

const PriceOracleCheck = primitives.requireUint256LowerBound('1234', '1234', '1234');

const marketSwap = primitives.marketSwapExactInput(
  'priceOracle',
  'priceOracleParams',
  'owner',
  'tokenIn',
  'tokenOut',
  'tokenInAmount',
  'feePercent',
  'feeMinTokenOut',
  'data',
)
