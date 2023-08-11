import { Outlet } from "react-router-dom";
import { Header } from './Header';

import { useAccount } from 'wagmi';
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Layout() {
  const account = useAccount();
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4">
        {
          account.isConnected &&
          <div className="m-5" style={{ float: "right", right: "15px" }}>
            <ConnectButton />
          </div>
        }
        <Outlet />
      </div>
    </div>
  );
}
