import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./CreateToken.module.css";
import Container from '@mui/material/Container';

const CreateToken = () => {
  return (
    <>
    <Container maxWidth="sm">
      <Box component={"form"} className="form">
        <TextField id="outlined-basic" label="Token Name" variant="outlined" />
        <TextField id="outlined-basic" label="Token Symbol" variant="outlined" />
        <TextField id="outlined-basic" label="Initail Supply" variant="outlined" />
        <TextField id="outlined-basic" label="Decimals" variant="outlined" />
        <TextField id="outlined-basic" label="Price" variant="outlined" />
        <Button variant="contained" disableElevation>
         Create Token
        </Button>
      </Box>
      </Container>
    </>
  );
};

export default CreateToken;
