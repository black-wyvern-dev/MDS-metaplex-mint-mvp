import { AccountInfo } from '@solana/web3.js';

export type AccountAndPubkey = {
  pubkey: string;
  account: AccountInfo<Buffer>;
};

export type CheckAccountFunc = (account: AccountInfo<Buffer>) => boolean;

export type UnPromise<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never;
