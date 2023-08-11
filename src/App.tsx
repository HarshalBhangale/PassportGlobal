import { Routes, Route } from "react-router-dom";
import { useAccount } from 'wagmi'
import { Layout } from "./components/Layout";
import { LandingPage } from "./pages/Landing";
import { PassportPage } from "./pages/Passport";
import { PassportFormPage } from "./pages/PassportForm";
import { QRScanPage } from "./pages/QRScan";
import { SearchPage } from "./pages/Search";
import { CreatePassportPage } from "./pages/CreatePassport";

export function App() {
  const account = useAccount();
  if (account.isConnected) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<PassportPage />} />
            <Route path="passport-form" element={<PassportFormPage />} />
            <Route path="qr-scan" element={<QRScanPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="create-passport" element={<CreatePassportPage></CreatePassportPage>} />
            <Route path="*" element={<LandingPage />} />
          </Route>
        </Routes>
      </>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<LandingPage />} />
        </Route>
      </Routes>
    )
  }
}
