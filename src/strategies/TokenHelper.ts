// SPDX-License-Identifier: GPL-3.0-or-later
import { BigNumberish } from 'ethers';

export enum TokenStandard {
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
  ETH = 'ETH',
}

export interface Token {
  standard: TokenStandard;
  addr: string;
  idsMerkleRoot: string;
  id: BigNumberish;
  disallowFlagged: boolean;
}

export interface IdsProof {
  ids: BigNumberish[];
  merkleProof_hashes: string[];
  merkleProof_flags: boolean[];
  statusProof_lastTransferTimes: BigNumberish[];
  statusProof_timestamps: BigNumberish[];
  statusProof_signatures: string[];
}

export interface TokenHelper {
  transferFrom(tokenAddress: string, tokenStandard: TokenStandard, from: string, to: string, amount: BigNumberish, ids: BigNumberish[]): void;
  tokenOwnership(owner: string, tokenStandard: TokenStandard, tokenAddress: string, ids: BigNumberish[]): Promise<{ balance: BigNumberish, ownedIdCount: BigNumberish, idBalances: BigNumberish[] }>;
  verifyTokenIds(token: Token, idsProof: IdsProof): boolean;
  verifyTokenIdsNotFlagged(tokenAddress: string, ids: BigNumberish[], lastTransferTimes: BigNumberish[], timestamps: BigNumberish[], signatures: string[]): void;
  verifyIdsMerkleProof(ids: BigNumberish[], proof: string[], proofFlags: boolean[], root: string): boolean;
  verifyId(proof: string[], root: string, id: BigNumberish): boolean;
  verifyIds(proof: string[], proofFlags: boolean[], root: string, ids: BigNumberish[]): boolean;
}