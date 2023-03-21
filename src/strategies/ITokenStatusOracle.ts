// SPDX-License-Identifier: GPL-3.0-or-later
import { IBoolOracle } from './IBoolOracle';

export interface ITokenStatusOracle extends IBoolOracle {
  verifyTokenStatus(contractAddr: string, tokenId: number, isFlagged: boolean, lastTransferTime: number, timestamp: number, signature: string): Promise<void>;
}
