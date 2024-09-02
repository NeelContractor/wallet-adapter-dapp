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
      <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/3eTxAn-YxaAwgdRbpZSnwqu4YcURHS9L">
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <div className="grid p-2 border border-gray-700 m-20 mx-80 py-10 justify-center">
                <WalletMultiButton />
                {/* <WalletDisconnectButton /> */}
                <ShowBalance />
                <RequestAirdrop />
                <SignMessage />
                <SendTokens />
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
    </div>
  );
}
