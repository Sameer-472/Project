import {
  useAddress
} from "@thirdweb-dev/react";
import { BigNumber, utils } from "ethers";
import { useState, useContext, useEffect } from "react";
import { Context } from "../Context";
import Swal from "sweetalert2";

export default function ViewToken() {
  const zero = BigNumber.from(0);
  const { readContract, writeContract } = useContext(Context);

  const [amount, setAmount] = useState("");
  const [balance, setbalance] = useState("");
  const [totalTokenSupply, settotalTokenSupply] = useState("");
  const [totalTokensMinted, settotalTokenMinted] = useState("");
  const [loading, setloading] = useState(false)
  
  
  
  const address = useAddress();

  const getBalance = async () => {
    try {
      const contract = await readContract();
      console.log(address);
      const balance = await contract.balanceOf(address);
      console.log(utils.formatEther(balance));
      setbalance(utils.formatEther(balance));
    } catch (error) {
      console.log(error);
    }
  };

  const totalSupply = async () => {
    try {
      const contract = await readContract();
      console.log(address);
      const _tokenSupply = await contract.maxTotalSupply();
      console.log(utils.formatEther(_tokenSupply));
      settotalTokenSupply(utils.formatEther(_tokenSupply));
    } catch (error) {
      console.log(error);
    }
  };

  const tokenMinted = async () => {
    try {
      const contract = await readContract();
      console.log(address);
      const _tokenMinted = await contract.totalSupply();
      console.log(utils.formatEther(_tokenMinted));
      settotalTokenMinted(utils.formatEther(_tokenMinted));
    } catch (error) {
      console.log(error);
    }
  };

  const buyTokens = async (amount) => {
    console.log("heelo")
    // try {
    //   const value = 0.00055 * amount;
    //   const contract = await writeContract();
    //   console.log(address);
    //   console.log("value is..",value)
    //   const tx = await contract.buyTokens(amount,{
    //     value: utils.parseEther(value.toString())
    //   });
    //   setloading(true)
    //   await tx.wait()
    //   getBalance();
    //   tokenMinted();
    //   totalSupply();
    //   setloading(false)
    //   Swal.fire(
    //     "Transaction Successful!",
    //     "success"
    //   );
    // } catch (error) {
    //   // console.log(error);
    //   Swal.fire(
    //     "Transaction Faild!",
    //     `${error.message}`,
    //     "error"
    //   );
    // }
  };

  useEffect(() => {
    getBalance();
    totalSupply();
    tokenMinted();
  }, []);

  // const tokenDrop = useContract("0x4FCF41602B58911A676ff3123a6853056a4cA9b1", "token-drop");
  // const { data: tokenSupply } = useTokenSupply(tokenDrop?.contract);
  // const { data: tokenBalance } = useTokenBalance(tokenDrop?.contract, address);
  // const { mutate: claimTokens, isLoading } = useClaimToken(tokenDrop.contract);
  // console.log(address);
  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <table>
          <tr>
            <th>Total Supply:</th>
            <td>
              {totalTokensMinted} / {totalTokenSupply}
            </td>
          </tr>
          <tr>
            <th>Your Balance:</th>
            <td>{balance}.0 MTP</td>
          </tr>
          <tr>
            <th>Token Amount</th>
            <td>
              <input type="number" name="" id="" onChange={(e)=> setAmount(e.target.value)}/>
            </td>
          </tr>
          {loading ? <button
            className="card-text p-2 text-light"
            style={{ border: "none", backgroundColor: "#294378" }}
            onClick={()=>buyTokens(BigNumber.from(amount))}
          >
            Loading ...
          </button>: <button
            className="card-text p-2 text-light"
            style={{ border: "none", backgroundColor: "#294378" }}
            onClick={()=>buyTokens(BigNumber.from(amount))}
          >
            Buy Token
          </button>}
        </table>
      </div>
    </>
  );
}

{
  /* <h1>View Token</h1> */
}
{
  /* <h2>Your Address: {address == undefined ? "Wallet Disconnected" : address}</h2> */
}
{
  /* <h5>Total Supply of Token "{tokenSupply?.name}" with Symbol "{tokenSupply?.symbol}": {tokenSupply?.displayValue}</h5> */
}
// <h5>Total Supply: {tokenSupply?.displayValue} {tokenSupply?.symbol}</h5>
// {/* <h5>Your Balance for the Token "{tokenBalance?.name}" with Symbol "{tokenBalance?.symbol}": {tokenBalance?.displayValue}</h5> */}
// <h5>Your Token Balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}</h5>
// <input
//   type="number"
//   value={amount}
//   onChange={(e) => {
//     setAmount(e.target.value);
//   }}
// />
// <button onClick={() => claimTokens({ amount, to: address })}>Claim Token</button>
