"use client"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";


export default function RequestAirdrop() {
    const [amount, setAmount] = useState();
    const wallet = useWallet();
    const { connection } = useConnection();

    async function requestAirdrop() {
        if (wallet.publicKey) {
            await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
            alert(`Aidropped ${amount} SOL ${wallet.publicKey.toBase58()}`);
        }
    }

    return (
        <div className="grid mt-10 border-t p-2">
            <h3 className="text-3xl font-mono text-red-600">Request Airdrop</h3>
            <input 
            type="number" 
            onChange={e => { 
                setAmount(e.currentTarget.value)
            }}
            placeholder="Amount"
            className="py-2 bg-cyan-950 pl-5" />
            <button 
            className="border p-2 font-bold mt-2"
            onClick={requestAirdrop}
            >Request Airdrop</button>
        </div>
    )
}