import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, darkTheme, Theme } from "@rainbow-me/rainbowkit";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { chains, config } from "./wagmi";


const rainbowKitTheme: Theme = darkTheme({
  accentColor: '#FACC15',
  accentColorForeground: 'black',
  borderRadius: 'small',
  fontStack: 'system',
  overlayBlur: 'small',
});

/**
 * Root providers and initialization of app
 * @see https://reactjs.org/docs/strict-mode.html
 * @see https://wagmi.sh/react/WagmiConfig
 * @see https://www.rainbowkit.com/docs/installation
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} theme={rainbowKitTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
);
