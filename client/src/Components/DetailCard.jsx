import { ethers, BigNumber, utils } from "ethers";
import { useLayoutEffect, useState, useContext, useEffect } from "react";
import { getEthRate } from "../Services/Eth";
import heartIconOutline from "../images/heart-outlined.svg";
import heartIconFilled from "../images/heart-filled.svg";
import { updateWishlist } from "../Services/Wishlist";
import { getAccessToken } from "../Util/helpers";
import { Context } from "../Context";
import Swal from "sweetalert2";
import { parseEther } from "ethers/lib/utils";

export default function DetailCard({ product, getProductData }) {
  let token = getAccessToken();

  const { readContract, writeContract } = useContext(Context);

  const [tokenPrice, settokenPrice] = useState(product?.token_price);
  const [noOfTokens, setnoOfTokens] = useState(1);
  const [rates, setRates] = useState({});
  const [first, setfirst] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenSupply, settokenSupply] = useState(BigNumber.from(0));
  console.log(rates);

  const handleNoOfTokens = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value<=50) {
      setfirst(true);
      setnoOfTokens(value);
      settokenPrice(value * product?.token_price);
    }
  };

  useEffect(() => {
    console.log(product);
    settokenPrice(product?.token_price);
    console.log(tokenPrice);
  }, []);


  const tokenDetails = async () => {
    try {
      const contract = await readContract();
      const totalTokenSupply = await contract._idToTokenDetails(
        product?._id
      );
      settokenSupply(totalTokenSupply.tokenSupply);
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const BuyToken = async () => {
    try {
      console.log(rates.USD);
      console.log(rates.ETH);
      const _1dollarToEther = rates.ETH / rates.USD;
      // const num = 0.0005365181048034467;
      // const roundedNum = parseFloat(_1dollarToEther.toFixed(6)); // Round to 6 decimal places and convert back to a number
      // const result = roundedNum.toFixed(6); // Round again to 6 decimal places for display, if needed
      console.log(_1dollarToEther.toFixed(5)); // Output: 0.000054
      // console.log(_1dollarToEther);
      const tokenPriceInEther = _1dollarToEther.toFixed(5) * tokenPrice;
      console.log("value", tokenPriceInEther);
      const contract = await writeContract();
      const _tokendetails = await contract.buyTokens(
        product._id,
        noOfTokens.toString(),
        {
          value: utils.parseEther(tokenPriceInEther.toString()),
          // value: utils.parseEther("0.076"),
          gasLimit: "3000000",
        }
      );
      setLoading(true)
      _tokendetails.wait();
      tokenDetails();
      setLoading(false);
      Swal.fire(
        "Transaction Successful!",
        // `<a href="https://goerli.etherscan.io/tx/${receipt.hash}" target="_blank">Verify your transaction</a>`,
        "success"
      );
    } catch (error) {
      // console.log(error);
      Swal.fire("Transaction Faild!", "Error");
    }
  };

  const ListItem = async () => {
    try {
      const contract = await writeContract();
      const _tokendetails = await contract.listToken(
        "63d79763c9259578fe693a85",
        utils.parseEther("0.021"),
        "1000"
      );
      _tokendetails.wait;
    } catch (error) {
      console.log(error.message);
    }
  };



  // tokeDetails();

  const InvestNow = async (amount) => {
    try {
      const value = BigNumber.from(amount);
      const contract = await writeContract();
      const tx = await contract.transfer(
        "0xf43CB9319aFC0AF6A06618DFbdef9d653dfdf4C8",
        amount
      );
      tx.wait();
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    // console.log(product);
    const getRates = async () => {
      const rate = await getEthRate();
      setRates(rate?.data);
      settokenPrice(product?._token_price);
    };
    getRates();
    tokenDetails()
  }, [JSON.stringify(rates)]);

  const payNow = async () => {
    if (window.ethereum) {
      try {
        console.log("yes");
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        console.log("Sender Account:", await signer.getAddress());
        // Get the form values

        // const ETHAmountValue = (product?.token_price / rates?.USD).toString();
        const ETHAmountValue = "0.000000003";

        // Calculate amount to transfer in wei
        const weiAmountValue = ethers.utils.parseEther(ETHAmountValue); //parseInt(ETHAmountValue) * 10**18

        // Form the transaction request for sending ETH
        const transactionRequest = {
          to: "0x028A252c19E80eEce1066826fc9F99c7c5A39444",
          value: weiAmountValue.toString(),
        };

        // Send the transaction and log the receipt
        const receipt = await signer.sendTransaction(transactionRequest);
        // alert(receipt);
        Swal.fire(
          "Transaction Successful!",
          `<a href="https://goerli.etherscan.io/tx/${receipt.hash}" target="_blank">Verify your transaction</a>`,
          "success"
        );
      } catch (err) {
        // alert(err.message);
        Swal.fire("Transaction Faild!", `${err.message}`, "error");
      }
    }
  };

  //
  const startPayment = async () => {
    try {
      if (!window.ethereum)
        Swal.fire(
          "No Wallet Found!",
          "No crypto wallet found. Please install it.",
          "error"
        );
      // throw new Error("No crypto wallet found. Please install it.");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      await provider.send("eth_requestAccounts", []);

      // ethers.utils.getAddress(addr);
      const receipt = await signer.sendTransaction({
        to: "0x028A252c19E80eEce1066826fc9F99c7c5A39444",
        value: ethers.utils.parseEther("0.000000003"),
      });
      Swal.fire(
        "Transaction Successful!",
        `<a href="https://goerli.etherscan.io/tx/${receipt.hash}" target="_blank">Verify your transaction</a>`,
        "success"
      );
      console.log("receipt", receipt);
      // setTxs([tx]);
    } catch (err) {
      console.log("98 err", err);
      Swal.fire("Transaction Faild!", `${err?.reason}`, "error");
      // setError(err.message);
    }
  };

  // wishlist handler
  const wishlistHandler = async (productId) => {
    const data = await updateWishlist(productId);
    getProductData();
  };

  return (
    <div
      className="card mb-3"
      // style={{ maxWidth: "540px" }}
    >
      <div className="row g-0">
        <div className="col-md-6">
          <div className="img-wrapper p-relative">
            {token !== null && (
              <img
                className="img-fluid p-absolute"
                src={
                  product?.isWishlist == 0 ? heartIconOutline : heartIconFilled
                }
                onClick={() => wishlistHandler(product?._id)}
                alt="Add to wishlist"
              />
            )}
            <img
              src={product?.image}
              className="img-fluid rounded-start w-100 h-100"
              alt="Product"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <div className="top-text d-flex align-items-center justify-content-between">
                  {/* <h3 className="card-title">{product?.title}</h3> */}
                  <div className="card-title">
                    <span className="ml-10">
                      <span>Total Price</span>
                      <h3>USD {product?.total_price}.00$</h3>
                    </span>
                    <span>
                      <span>Token Price</span>
                      <h3>
                        USD {first ? tokenPrice : product?.token_price}.00$
                      </h3>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row py-2">
              <div className="col-4">
                Type: <br /> <b>{product?.market_type}</b>
              </div>
              <div className="col-4">
                Monetization: <br /> <b>{product?.monetization}</b>
              </div>
              <div className="col-4">
                Net Profit: <br /> <b>USD $0.00 p/month</b>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p className="card-text py-2">{product?.description}</p>
              </div>
            </div>
            <div className="row py-2">
              <div className="col-12">
                <input
                  onChange={handleNoOfTokens}
                  type="number"
                  value={noOfTokens}
                  name=""
                  id=""
                  style={{
                    borderColor: "#294378",
                    borderWidth: "5px",
                    width: "80px",
                    borderRadius: "8px",
                    height: "50px",
                  }}
                />
                {loading ? 
                <button
                className="card-text p-2 text-light"
                style={{
                  border: "none",
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                  backgroundColor: "#294378",
                  marginLeft: "-20px",
                  height: "50px",
                }}
                disabled={true}
                // onClick={() => BuyToken()}
              >
                Loading...
              </button>: <button
                  className="card-text p-2 text-light"
                  style={{
                    border: "none",
                    borderTopRightRadius: "8px",
                    borderBottomRightRadius: "8px",
                    backgroundColor: "#294378",
                    marginLeft: "-20px",
                    height: "50px",
                  }}
                  onClick={() => BuyToken()}
                >
                  Processed to Pay
                </button>}
                <div>Token Supply: {" "}{utils.formatEther(tokenSupply)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
