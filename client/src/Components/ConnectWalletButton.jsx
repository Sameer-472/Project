import { ConnectWallet } from "@thirdweb-dev/react";


export default function ConnectWalletButton() {
 
  
  return (
    <div>
      <ConnectWallet
        className="nav-link"
        colorMode="light"
       accentColor="#294378"
      />
    </div>
  );
};