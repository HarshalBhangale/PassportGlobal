import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Outlet } from "react-router-dom";

export function Layout() {

  return (
    <>
      <h1>Layout</h1>

      <ConnectButton />

      <Outlet />

    </>
  );
}
