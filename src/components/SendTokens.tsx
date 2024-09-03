"use client"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";

export default function SendTokens() {
    const [toPubkey, setToPubkey] = useState();
    const [amountToSend, setAmountToSend] = useState();
    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendTokens() {
        let to = toPubkey;
        let amount = amountToSend;
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL
        }));

        await wallet.sendTransaction(transaction, connection);
        alert(`Send ${amountToSend} SOL to ${to}`);
    }

    return (
        <div className="grid p-2 m-10">
            <h3 className="text-3xl font-mono text-red-600">Send Solana</h3>
            <input 
                value={toPubkey} 
                type="text" 
                className="bg-cyan-950 my-2 py-2 pl-5"
                onChange={e => {
                    setToPubkey(e.currentTarget.value)
                }} 
            placeholder="To" />
            <input 
                value={amountToSend} 
                type="text" 
                className="bg-cyan-950 my-2 py-2 pl-5"
                onChange={e => {
                    setAmountToSend(e.currentTarget.value)
                }} 
            placeholder="Amount" />
            <button 
                className="border p-2 border-gray-700"  
            onClick={sendTokens}>Send</button>
        </div>
    )
}