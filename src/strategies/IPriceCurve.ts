import { BigNumberish } from "ethers";

// SPDX-License-Identifier: GPL-3.0-or-later
export interface IPriceCurve {
  getOutput(totalInput: BigNumberish, filledInput: BigNumberish, input: BigNumberish, curveParams: string): Promise<BigNumberish>;
}