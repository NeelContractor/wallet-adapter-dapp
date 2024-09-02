"use client"
import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react"
import { useState } from "react";
import bs58 from 'bs58'

export default function SignMessage() {
    const [message, setMessage] = useState("");
    const { publicKey, signMessage } = useWallet();

    async function handlerOnClick() {
        console.log("inside function")
        if (!publicKey) throw new Error('Wallet not Connected!')
        if (!signMessage) throw new Error('Wallet does not support message signing!')

        const messageToSign = message;
        const encodedMessage = new TextEncoder().encode(messageToSign);
        const signature = await signMessage(encodedMessage);

        if (!ed25519.verify(signature, encodedMessage, publicKey.toBase58())) throw new Error('Message signautre invalid!');
        alert('success', `Message signautre: ${bs58.encode(signature)}`);
    }

    return (
        <div className="grid border-t mt-10 p-2">
            <h3 className="text-3xl font-mono text-red-600">Sign Message</h3>
            <input 
            type="text"
            value={message}
            className="bg-cyan-950 my-2 py-2 pl-5" 
            onChange={e => {
                setMessage(e.currentTarget.value)
            }}
            placeholder="Message" />
            <button
            className="border p-2 "
            onClick={handlerOnClick}>
                Sign Message
            </button>
        </div>
    )
}