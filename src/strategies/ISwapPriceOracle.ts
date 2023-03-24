import { BigNumberish } from "ethers";

// SPDX-License-Identifier: GPL-3.0-or-later
export interface ISwapPriceOracle {
  getSwapPrice(): Promise<BigNumberish>;
}