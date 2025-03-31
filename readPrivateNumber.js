const { Contract, CotiNetwork, getDefaultProvider, Wallet } = require("@coti-io/coti-ethers");

// Contract configuration
const PRIVATE_KEY = "0x3b8ad7ca3cf54b1273004775afa88587b8d6bd8a970c84fe216f6febb477347d";
const AES_KEY = "63f49d1ef7b1510060edcec934828b09";
const CONTRACT_ADDRESS = "0x78953065c5bbD6035D58135a73f2caa9E050A373";

// Contract ABI
const CONTRACT_ABI = [
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

async function main() {
    try {
        // Initialize provider and wallet
        const provider = getDefaultProvider(CotiNetwork.Testnet);
        const wallet = new Wallet(PRIVATE_KEY, provider);
        wallet.setAesKey(AES_KEY);

        // Create contract instance
        const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

        // Get the encrypted private number
        const encryptedNumber = await contract.privateNumber();

        // Decrypt the value
        const decryptedNumber = await wallet.decryptValue(encryptedNumber);

        console.log("Private Number:", decryptedNumber.toString());
    } catch (error) {
        console.error("Error:", error);
    }
}

main(); 