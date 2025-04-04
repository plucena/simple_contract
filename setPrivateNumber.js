const { Contract, CotiNetwork, getDefaultProvider, Wallet } = require("@coti-io/coti-ethers");

// Contract configuration
const PRIVATE_KEY = "0x3b8ad7ca3cf54b1273004775afa88587b8d6bd8a970c84fe216f6febb477347d";
const AES_KEY = "63f49d1ef7b1510060edcec934828b09";
const CONTRACT_ADDRESS = "0x78953065c5bbD6035D58135a73f2caa9E050A373";

// Contract ABI
const CONTRACT_ABI = [
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "ctUint64",
                        "name": "ciphertext",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "signature",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct itUint64",
                "name": "value",
                "type": "tuple"
            }
        ],
        "name": "setPrivateNumber",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

async function main() {
    try {
        // Initialize provider and wallet
        const provider = getDefaultProvider(CotiNetwork.Testnet);
        const wallet = new Wallet(PRIVATE_KEY, provider);

        // Onboard the account
        console.log("Starting account onboarding...");
        await wallet.generateOrRecoverAes();
        console.log("Account onboarded successfully!");

        // Set the AES key
        wallet.setAesKey(AES_KEY);

        // Create contract instance
        const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

        // Get the function selector for setPrivateNumber
        const functionSelector = contract.interface.getFunction("setPrivateNumber").selector;

        console.log("Encrypting value...");
        // Encrypt the value 99 with the contract address and function selector
        const encryptedValue = await wallet.encryptValue(
            99n,
            CONTRACT_ADDRESS,
            functionSelector
        );

        console.log("Sending transaction...");
        // Set the private number
        const tx = await contract.setPrivateNumber([encryptedValue.ciphertext, encryptedValue.signature]);
        console.log("Transaction hash:", tx.hash);

        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        console.log("Transaction confirmed in block:", receipt.blockNumber);
    } catch (error) {
        console.error("Error:", error);
        if (error.message) {
            console.error("Error message:", error.message);
        }
    }
}

main(); 