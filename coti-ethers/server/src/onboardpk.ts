import dotenv from "dotenv"

dotenv.config()

import {
    CotiNetwork,
    getDefaultProvider,
    isProviderConnected,
    printAccountDetails,
    printNetworkDetails,
    validateAddress
} from "@coti-io/coti-ethers";

import {onboardAccount, setupAccount} from "./util/onboard"
import {dataOnChainExample} from "./examples/dataOnChain"
import {erc20Example} from "./examples/erc20"
import {nativeTransfer} from "./examples/nativeTransfer";
import { onChainDatabaseExample } from "./examples/onChainDatabase";

async function main() {

    const userKey = process.argv[2] 
    if (!userKey) {
        throw new Error("USER_KEY is not found or is null in environment variables");
    }
    else
        console.log("************* Onboarding user ", userKey, " *************")


    const provider =  getDefaultProvider(CotiNetwork.Testnet);
    
    if (!await isProviderConnected(provider))
        throw Error('provider not connected')
    await printNetworkDetails(provider)

    const owner = await onboardAccount(provider, userKey)
    
    await printAccountDetails(provider, owner.address)

    const validAddress = await validateAddress(owner.address)
    if (!validAddress.valid) {
        throw Error('Invalid address')
    }

    
}

main()