// SPDX-License-Identifier: GPL-3.0-or-later
export interface ICallExecutor {
  proxyCall(to: string, data: string, options?: {value?: number}): Promise<void>;
}