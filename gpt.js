const { Contract, CotiNetwork, getDefaultProvider, Wallet } = require("@coti-io/coti-ethers");
// Configuration
const PRIVATE_KEY = "0x3b8ad7ca3cf54b1273004775afa88587b8d6bd8a970c84fe216f6febb477347d";
const AES_KEY = "63f49d1ef7b1510060edcec934828b09";
const CONTRACT_ADDRESS = "0x78953065c5bbD6035D58135a73f2caa9E050A373";
const RPC_URL = "https://testnet.coti.io/rpc";

// ABI for store.sol (assuming it has a public getter function `get()`)
const abi = [
  "function get() view returns (uint256)"
];

async function main() {
  try {
    // Connect to the COTI Testnet provider
    const provider = getDefaultProvider(CotiNetwork.Testnet);
    
    // Create a CotiWallet instance
    const wallet = new CotiWallet(PRIVATE_KEY, AES_KEY, provider);
    
    // Attach to the deployed contract
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);
    
    // Fetch and print the privateNumber
    const privateNumber = await contract.get();
    console.log("privateNumber:", privateNumber.toString());
  } catch (error) {
    console.error("Error fetching privateNumber:", error);
  }
}

main();