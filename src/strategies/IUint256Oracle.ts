// SPDX-License-Identifier: GPL-3.0-or-later

export interface IUint256Oracle {
  getUint256(params: Uint8Array): Promise<bigint>;
}