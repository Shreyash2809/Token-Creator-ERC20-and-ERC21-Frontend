import {EthersProvider} from "../../src/TokenCreation/ConnectWallet";
import { ethers } from "ethers";
import {CREATETOKENCONTRACTADDRESS} from "../../src/ContractAction/ContractDependency";
import {CreateTokenABI} from "../../src/ContractAction/AbiCreateToken";
console.log("EthersProvider1234:", EthersProvider);
export const createTokenHandler = async (
    tokenName,
    tokenSymbol,
    initialSupply,
    decimals,
    price
  ) => {
    try {
      if (!EthersProvider) {
        console.error("EthersProvider is not initialized");
        return;
      }
  
      const signer = EthersProvider.getSigner();
      const contract = new ethers.Contract(
        CREATETOKENCONTRACTADDRESS,
        CreateTokenABI,
        signer
      );
  
      console.log("Contract instance created:", contract);
  
      // Convert values for transaction
      const priceInWei = ethers.utils.parseUnits(price.toString(), "ether"); // v5 syntax
      const supply = ethers.BigNumber.from(initialSupply); // v5 syntax
  
      const createTokenTx = await contract.creteToken(
        tokenName,
        tokenSymbol,
        supply,
        decimals,
        priceInWei
      );
  
      console.log("Transaction sent, waiting for confirmation...");
      const receipt = await createTokenTx.wait();
  
      console.log("Transaction confirmed:", receipt);
      return receipt.transactionHash;
    } catch (error) {
      console.error("Error creating token:", error);
      throw error;
    }
  };

createTokenHandler();
