import { AddressLike, BigNumberish } from 'ethers';
import { PrimitiveParam } from '../PrimiteveParams';

interface OrderDbParam {
  primitives: PrimitiveParam[];
}

export interface StrategyDbParam {
  accountAddress: AddressLike;
  signature: string;
  signerAddress: AddressLike;
  strategyHash: string;
  chainId: BigNumberish;
  messageCallType: string;
  primitiveTarget: string;
  sigType: string;
  orders: OrderDbParam[];
};
