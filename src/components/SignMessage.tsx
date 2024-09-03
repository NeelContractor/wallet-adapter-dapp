"use client"
import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react"
import { SetStateAction, useState } from "react";
import bs58 from 'bs58'

export default function SignMessage() {
    const [message, setMessage] = useState("");
    const { publicKey, signMessage } = useWallet();

    async function handlerOnClick() {
        if (!publicKey) throw new Error('Wallet not Connected!')
        if (!signMessage) throw new Error('Wallet does not support message signing!')

        const messageToSign = message;
        const encodedMessage = new TextEncoder().encode(messageToSign);
        const signature = await signMessage(encodedMessage);

        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signautre invalid!');
        alert('success', `Message signautre: ${bs58.encode(signature)}`);
    }

    return (
        <div className="grid p-2 m-10">
            <h3 className="text-3xl font-mono text-red-600">Sign Message</h3>
            <input 
                type="text"
                value={message}
                className="bg-cyan-950 p-2" 
                onChange={(e: { currentTarget: { value: SetStateAction<string>; }; }) => {
                    setMessage(e.currentTarget.value)
                }}
                placeholder="Message" 
            />
            <button
                className="border border-gray-700 mt-3 p-2"
                onClick={handlerOnClick}
            >
                Sign Message
            </button>
        </div>
    )
}