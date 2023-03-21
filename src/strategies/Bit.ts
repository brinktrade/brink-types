export declare namespace Bit {
  function useBit(bitmapIndex: number, bit: number): void;
  function validBit(bit: number): boolean;
  function bitmapPtr(bitmapIndex: number): Uint8Array;
  function loadUint(ptr: Uint8Array): bigint;
}