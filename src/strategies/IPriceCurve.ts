// SPDX-License-Identifier: GPL-3.0-or-later
export interface IPriceCurve {
  getOutput(totalInput: number, filledInput: number, input: number, curveParams: string): Promise<number>;
}