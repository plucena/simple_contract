// Import required modules from coti-ethers which wraps ethers.js functionality.
const { ethers, CotiWallet, providers } = require('coti-ethers');

// Replace with your provided keys and contract address
const PRIVATE_KEY = '0x3b8ad7ca3cf54b1273004775afa88587b8d6bd8a970c84fe216f6febb477347d';
const AES_KEY = '63f49d1ef7b1510060edcec934828b09';
const CONTRACT_ADDRESS = '0x78953065c5bbD6035D58135a73f2caa9E050A373';

// The ABI for store.sol – we only need the getter function.
// (Assuming store.sol has a function: "function get() public view returns (uint256)" )
const abi = [
  "function get() view returns (uint256)"
];

async function main() {
  // Create a provider. This example uses a JSON-RPC provider.
  // Adjust the RPC URL to match your network if necessary.
  const provider = new providers.JsonRpcProvider("https://rpc.coti.io/");

  // Create a CotiWallet instance using your private key, AES key, and provider.
  const wallet = new CotiWallet(PRIVATE_KEY, AES_KEY, provider);

  // Instantiate the contract object.
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

  // Call the get() method to retrieve the stored privateNumber.
  const privateNumber = await contract.get();

  // Print the result.
  console.log("privateNumber:", privateNumber.toString());
}

main().catch(error => {
  console.error("Error:", error);
  process.exit(1);
});
