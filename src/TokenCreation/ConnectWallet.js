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
    {
      id: 42161,
      token: "ARB-ETH",
      label: "Arbitrum One",
      rpcUrl: "https://rpc.ankr.com/arbitrum",
    },
    {
      id: "0xa4ba",
      token: "ARB",
      label: "Arbitrum Nova",
      rpcUrl: "https://nova.arbitrum.io/rpc",
    },
    {
      id: "0x2105",
      token: "ETH",
      label: "Base",
      rpcUrl: "https://mainnet.base.org",
    },
  ],
});

const ConnectWallet = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [ethersProvider, setEthersProvider] = useState(null);

  useEffect(() => {
    if (wallet) {
      // ethers v6 uses 'new ethers.BrowserProvider'
      setEthersProvider(new ethers.BrowserProvider(wallet.provider, "any"));
    } else {
      setEthersProvider(null);
    }
  }, [wallet]);

  return (
    <div>
      <Button variant="outlined" size="small"
        disabled={connecting}
        onClick={() => {
          if (wallet) {
            // Handle disconnect
            disconnect(wallet);
          } else {
            // Handle connect
            connect();
          }
        }}
      >
        {connecting ? "connecting..." : wallet ? "disconnect" : "connect"}
      </Button>

      {/* Optional: Display some wallet information */}
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
