import React, { useEffect, useState } from "react";
import { init, useConnectWallet } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import { ethers } from "ethers";
import Button from "@mui/material/Button";

// Initialize injected wallet module
const injected = injectedModule();

const infuraKey = "<INFURA_KEY>";
const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`;

// Initialize Web3 Onboard
init({
  wallets: [injected],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl,
    },
  ],
});

let EthersProvider;

const ConnectWallet = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [ethersProvider, setEthersProvider] = useState(null);

  useEffect(() => {
    if (wallet) {
      const provider = new ethers.providers.Web3Provider(wallet.provider); // v5 syntax
      setEthersProvider(provider);
      EthersProvider = provider; // Export for external use
      console.log("EthersProvider set:", EthersProvider);
    } else {
      setEthersProvider(null);
    }
  }, [wallet]);

  return (
    <div>
      <Button
        variant="outlined"
        size="small"
        disabled={connecting}
        onClick={() => {
          if (wallet) {
            disconnect(wallet);
          } else {
            connect();
          }
        }}
      >
        {connecting ? "connecting..." : wallet ? "disconnect" : "connect"}
      </Button>

      {wallet && (
        <div>
          <p>Connected to: {wallet.label}</p>
          <p>Wallet address: {wallet.accounts[0].address}</p>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
export { EthersProvider };
