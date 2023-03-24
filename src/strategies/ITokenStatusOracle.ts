// SPDX-License-Identifier: GPL-3.0-or-later
import { BigNumberish } from 'ethers';
import { IBoolOracle } from './IBoolOracle';

export interface ITokenStatusOracle extends IBoolOracle {
  verifyTokenStatus(contractAddr: string, tokenId: BigNumberish, isFlagged: boolean, lastTransferTime: BigNumberish, timestamp: BigNumberish, signature: string): Promise<void>;
}
