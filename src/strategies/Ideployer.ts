// SPDX-License-Identifier: GPL-3.0-or-later
export interface IDeployer {
  getDeployAddress(initCode: string): Promise<string>;
  deploy(initCode: string): Promise<void>;
}