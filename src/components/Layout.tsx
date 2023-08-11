import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Outlet } from "react-router-dom";

export function Layout() {

  return (
    <>
      <div className="flex">
        <div className="w-full h-150px bg-black flex items-center justify-center" style={{ height: "150px" }}>
          <img src="./assets/PassportGlobal-logos_white.png" alt="Description of Image" style={{ maxHeight: "200px" }} />
        </div>
      </div>

      <div className="w-full h-150px bg-black flex items-center justify-center pb-6">
        <div className="flex">
          <ConnectButton />
        </div>
      </div>
      <Outlet />

    </>
  );
}
