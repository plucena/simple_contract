import { Contract, CotiNetwork, getDefaultProvider, Wallet } from "@coti-io/coti-ethers";

async function readPrivateNumber() {
    try {
        // Connect to COTI testnet using getDefaultProvider
        const provider = getDefaultProvider(CotiNetwork.Testnet);
        
        // Create wallet with your private key and set AES key
        const wallet = new Wallet("0x3b8ad7ca3cf54b1273004775afa88587b8d6bd8a970c84fe216f6febb477347d", provider);
        wallet.setAesKey("63f49d1ef7b1510060edcec934828b09");

        // Contract ABI for PrivateStorage
        const abi = [
            {
                "inputs": [],
                "name": "privateNumber",
                "outputs": [
                    {
                        "internalType": "ctUint64",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];

        // Replace with your deployed contract address
        const contractAddress = "0x78953065c5bbD6035D58135a73f2caa9E050A373";
        
        // Create contract instance with the correct provider
        const contract = new Contract(contractAddress, abi, wallet);

        // Get the encrypted private number
        const encryptedNumber = await contract.privateNumber();
        
        // Decrypt the value using the wallet
        const decryptedNumber = await wallet.decryptValue(encryptedNumber);
        
        console.log("Decrypted private number:", decryptedNumber);
    } catch (error) {
        console.error("Error reading private number:", error.message);
    }
}

// Run the function
readPrivateNumber().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
});