import { connect, Contract, keyStores, WalletConnection } from "near-api-js";

const CONTRACT_NAME =
  process.env.CONTRACT_NAME || "miami-app.blockhead.testnet";

let config = {
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  contractName: CONTRACT_NAME,
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

export const connectToNEAR = async () => {
  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      config
    )
  );

  window.walletConnection = new WalletConnection(near);

  window.accountId = window.walletConnection.getAccountId();

  window.contract = await new Contract(
    window.walletConnection.account(),
    config.contractName,
    {
      viewMethods: ["get_message"],
      changeMethods: ["set_message"],
    }
  );
};

export function logout() {
  window.walletConnection.signOut();
  // reload page
  window.location.replace(window.location.origin + window.location.pathname);
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(config.contractName);
}
