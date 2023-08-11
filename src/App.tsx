import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { LandingPage } from "./pages/Landing";
import { PassportPage } from "./pages/Passport";
import { PassportFormPage } from "./pages/PassportForm";
import { QRScanPage } from "./pages/QRScan";
import { SearchPage } from "./pages/Search";
import { CreatePassportPage } from "./pages/CreatePassport";

export function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<LandingPage />} />
          <Route path="passport" element={<PassportPage />} />
          <Route path="passport-form" element={<PassportFormPage />} />
          <Route path="qr-scan" element={<QRScanPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="create-passport" element={<CreatePassportPage></CreatePassportPage>} />
          <Route path="*" element={<LandingPage />} />
        </Route>
      </Routes>
    </>
  );
}
