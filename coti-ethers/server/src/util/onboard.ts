import {getAccountBalance, Provider, Wallet} from "@coti-io/coti-ethers"
import {getMyWallet, getWallet, setEnvValue} from "./general-utils";

export async function setupAccount(provider: Provider) {
  const wallet = getWallet(provider)
  if (await getAccountBalance(wallet.address, provider) === BigInt("0")) {
    throw new Error(`Please use faucet to fund account ${wallet.address}`)
  }

  const toAccount = async (wallet: Wallet, userKey: string | undefined) => {
    if (userKey) {
      wallet.setAesKey(userKey)
      return wallet
    }

    console.log("************* Onboarding user ", wallet.address, " *************")
    await wallet.generateOrRecoverAes()
    console.log("************* Onboarded! created user key and saved into .env file *************")

    setEnvValue("USER_KEY", wallet.getUserOnboardInfo()?.aesKey!)
    return wallet
  }

  return toAccount(wallet, process.env.USER_KEY)
}


export async function onboardAccount(provider: Provider, key: string) {
  const wallet =  getMyWallet(provider, key)
  console.log("************* Onboarding user ", wallet.address, " *************")
  console.log("************* wallet PK:  " + wallet.privateKey);

  if (await getAccountBalance(wallet.address, provider) === BigInt("0")) {
    throw new Error(`Please use faucet to fund account ${wallet.address}`)
  }

    await wallet.generateOrRecoverAes()
    console.log("******* wallet AES "+ wallet.getUserOnboardInfo()?.aesKey);
    setEnvValue("USER_KEY", wallet.getUserOnboardInfo()?.aesKey!)
    setEnvValue("ADDRESS", wallet.address)

    
    console.log("************* Onboarded! created user key and saved into .env file *************")


  const toAccount = async (wallet: Wallet, userKey: string | undefined) => {
    if (userKey) {
      wallet.setAesKey(userKey)
      return wallet
    }

    
    return wallet
  }

  return toAccount(wallet, process.env.USER_KEY)
}
