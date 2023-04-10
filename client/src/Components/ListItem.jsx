import React , {useState , useContext} from "react";
import {
  TextField,
  Box,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import styled from "@emotion/styled";
import { Card } from "@mui/material";
import ImageTwoToneIcon from "@mui/icons-material/ImageTwoTone";
import "./ListItem.css";
import { AddProduct } from "././../Services/Product";
import { Context } from "../Context";
import axios from "axios";
import { ethers, BigNumber, utils } from "ethers";
import { getEthRate } from "../Services/Eth";
import Swal from "sweetalert2";





const MyCard = styled(Card)`
  border-color: 50px solid orange;
`;

const ListItem = () => {
  const [age, setAge] = React.useState("");
  const [formInput, setformInput] = useState({
    title: "",
    total_price: "",
    market_type: "monetization",
    description: "",
  });

  const { readContract, writeContract } = useContext(Context);
  const [loading, setLoading] = useState(false)


  const ListItem = async (tokenId , tokenPrice , noOfTokens) => {
    try {
      const contract = await writeContract();
      const _tokendetails = await contract.listToken(
        tokenId,
        utils.parseEther(tokenPrice),
        noOfTokens
      );
      setLoading(true)
      _tokendetails.wait;
      setLoading(false);
      Swal.fire(
        "Items listed Successfully!",
        // `<a href="https://goerli.etherscan.io/tx/${receipt.hash}" target="_blank">Verify your transaction</a>`,
        "success"
      );
    } catch (error) {
      Swal.fire("Item Listed Failed!", "Error");
      console.log(error.message);
    }
  };


  
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      let { data } = await axios.post('http://localhost:5000/api/v1/products/add' , formInput);
      console.log(data.data._id);
      const response = await getEthRate();
      const rates = response?.data;
      const _1dollarToEther = rates.ETH / rates.USD;
      // console.log(_1dollarToEther);
      // console.log(data.data.token_price);
      const tokenPriceInEther = _1dollarToEther * data.data.token_price;
      console.log("token Price in ether", tokenPriceInEther.toFixed(5));
      await ListItem(data.data._id , tokenPriceInEther.toFixed(5) , data.data.no_of_tokens.toString());
      setLoading(false);
      return data;
  
    } catch (error) {
      alert(error.response.message, "error");
      console.log(error);
    }
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          // textAlign: "start",
          justifyContent: "center",
          // backgroundColor: "#191C1F",
          color: "black",
          margin: 10,
        }}
      >
        <h1 style={{ textAlign: "start", color: "black" }}>List your Item</h1>
        <form action="" onSubmit={onSubmit}>
          <Box>
            <Box
              id="createBox"
              sx={{
                display: "flex",
                // alignItems: "center",
                flexDirection: "column",
                // textAlign: "start",
                justifyContent: "flex-start",
              }}
            >
              <label>Select any image</label>
              <>
                <MyCard
                  id="card"
                  component="label"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ImageTwoToneIcon sx={{ fontSize: "200px" }} />
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    // onChange={(e)=> setformInput({...formInput , image: e.target.files})}
                  />
                </MyCard>
                {/* <Button
                  sx={{ width: "fit-content", mt: 2, backgroundColor: "green" }}
                  variant="contained"
                  component="label"
                  // onChange={onChange}
                  required
                >
                  <input hidden accept="image/*" multiple type="file" />
                  Change Image
                </Button> */}
              </>

              <p id="label">Name</p>
              <pre id="label">The name of the item's</pre>
              <input
                type="text"
                placeholder="tile of the item"
                id="inputField"
                required
                onChange={(e) =>
                  setformInput({ ...formInput, title: e.target.value })
                }
              />
              <p id="label">Discription</p>
              <pre id="label">  
                The description will be included on the item's detail page
                underneath its image.
              </pre>
              <input
                type="text"
                placeholder="provide a details description of your item."
                id="inputField"
                required
                onChange={(e) =>
                  setformInput({ ...formInput, description: e.target.value })
                }
              />
              <p id="label">Total Price</p>
              <pre id="label">Provide the total price of the item in USD.</pre>
              <input
                type="Number"
                placeholder="Price in USD"
                id="inputField"
                onChange={(e) =>
                  setformInput({ ...formInput, total_price: e.target.value })
                }
                required
                step="any"
              />

              {
                loading ? 
                <Button
                variant="contained"
                sx={{ width: "150px", mt: 3 }}
                disabled= {true}
              >
                Loading ..
              </Button> : 
              <Button
              variant="contained"
              sx={{ width: "150px", mt: 3 }}
              type="submit"
            >
              List Item
            </Button>
              }
            </Box>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default ListItem;
