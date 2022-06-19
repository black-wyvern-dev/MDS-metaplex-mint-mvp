import React, { useMemo } from "react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

import { clusterApiUrl } from "@solana/web3.js";
import { ConfettiProvider } from '../components/Confetti';

// import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "../styles/App.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// const SOLANA_NETWORK = WalletAdapterNetwork.Mainnet;
const SOLANA_NETWORK = WalletAdapterNetwork.Devnet;
const network = SOLANA_NETWORK;

import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
// set custom RPC server endpoint for the final website
// const endpoint = "https://explorer-api.devnet.solana.com";
// const endpoint = "http://127.0.0.1:8899";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: "#000"
    },
    text: {
      primary: "#ffffff"
    }
  }
});


function MyApp({ Component, pageProps }: AppProps) {
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ConfettiProvider>
            <ThemeProvider theme={darkTheme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </ConfettiProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
