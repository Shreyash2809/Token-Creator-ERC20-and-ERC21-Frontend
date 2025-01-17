import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import "./CreateToken.module.css";
import { createTokenHandler } from "../ContractAction/CreateTokenAction";

const CreateToken = () => {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [initialSupply, setInitialSupply] = useState("");
  const [decimals, setDecimals] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called");

    // Log the form data
    console.log("Token Details:", {
      tokenName,
      tokenSymbol,
      initialSupply,
      decimals,
      price,
    });

    try {
      const txHash = await createTokenHandler(
        tokenName,
        tokenSymbol,
        initialSupply,
        decimals,
        price
      );
      console.log("Transaction Hash:", txHash);
    } catch (error) {
      console.error("Error creating token:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" className="form" onSubmit={handleSubmit}>
        <TextField
          id="token-name"
          label="Token Name"
          variant="outlined"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          id="token-symbol"
          label="Token Symbol"
          variant="outlined"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          id="initial-supply"
          label="Initial Supply"
          variant="outlined"
          value={initialSupply}
          onChange={(e) => setInitialSupply(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          id="decimals"
          label="Decimals"
          variant="outlined"
          value={decimals}
          onChange={(e) => setDecimals(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          id="price"
          label="Price"
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          disableElevation
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Create Token
        </Button>
      </Box>
    </Container>
  );
};

export default CreateToken;
