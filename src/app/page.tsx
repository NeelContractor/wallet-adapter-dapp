"use client"
import RequestAirdrop from "@/components/RequestAirdrop";
import SendTokens from "@/components/SendTokens";
import ShowBalance from "@/components/ShowBalance";
import SignMessage from "@/components/SignMessage";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import '@solana/wallet-adapter-react-ui/styles.css';

export default function Home() {
  return (
    <div>
      <ConnectionProvider endpoint="">
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <div className="m-20 "> 
                <WalletMultiButton />
                <div className="mt-2">
                  <ShowBalance />
                  <SignMessage />
                  <RequestAirdrop />
                  <SendTokens />
                </div>
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
    </div>
  );
}
