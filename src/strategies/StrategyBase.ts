// SPDX-License-Identifier: GPL-3.0-or-later
export interface Call {
  targetContract: string;
  data: string;
}

export abstract class StrategyBase {}