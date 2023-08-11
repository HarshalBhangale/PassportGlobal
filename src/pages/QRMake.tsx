import { useNavigate } from "react-router-dom";
import { Locator } from '../components/Locator';

export function QRMakePage() {
  const navigate = useNavigate();
  return (
    <>
      <Locator />
      <div className="text-center mt-10">
        <button className="btn bg-yellow-400 text-black" onClick={() => navigate('/')}>Go Back</button>
      </div>
    </>
  );

}