import { WalletAdapter } from '@solana/wallet-adapter-base';
import {
  createContext,
  useContext,
} from 'react';

export interface WalletModalContextState {
  visible: boolean;
  setVisible: (open: boolean) => void;
}

export const WalletModalContext = createContext<WalletModalContextState>(
  {} as WalletModalContextState,
);

export function useWalletModal(): WalletModalContextState {
  return useContext(WalletModalContext);
}

export type WalletSigner = Pick<
  WalletAdapter,
  // @ts-ignore
  'publicKey' | 'signTransaction',
>;
