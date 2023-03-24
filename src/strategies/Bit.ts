import { BigNumberish } from "ethers";

export declare namespace Bit {
  function useBit(bitmapIndex: BigNumberish, bit: BigNumberish): void;
  function validBit(bit: BigNumberish): boolean;
  function bitmapPtr(bitmapIndex: BigNumberish): Uint8Array;
  function loadUint(ptr: Uint8Array): bigint;
}