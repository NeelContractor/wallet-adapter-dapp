"use client"
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";


export default function ShowBalance() {
    const [finalAmount, setFinalAmount] = useState<number | null>(null);
    const wallet = useWallet();
    const { connection } = useConnection();

    async function getBalance() {
        if (wallet.publicKey) {
            const balance = await connection.getBalance(wallet.publicKey);
            const amount = balance / LAMPORTS_PER_SOL;
            setFinalAmount(amount);
        } else {
            console.log("Connect Your Wallet")
        }
    }

    getBalance();
    return (
        <div className=" grid p-2 m-10">
            <h3 className="text-3xl font-mono text-red-600">Balance</h3>
            {finalAmount === null ? <div>SOL Balance: </div> : <div>SOL Balance: {finalAmount}</div>}
        </div>
    )
}