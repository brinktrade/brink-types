import { BigNumberish } from "ethers";

export interface IUint256Oracle {
  getUint256(params: Uint8Array): Promise<BigNumberish>;
}