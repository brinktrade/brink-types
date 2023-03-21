// SPDX-License-Identifier: GPL-3.0-or-later

export interface IBoolOracle {
  getBool(params: string): Promise<boolean>;
}