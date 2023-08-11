import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export function PassportPage() {
  const passport = true; //TODO: Fetch an actual state from the chain
  const navigate = useNavigate();
  useEffect(() => {
    if (!passport) {
      navigate("/passport-form");
    }
  }, [passport])
  return (
    <div className="text-center">
      <div className="relative max-w-92 mx-auto">
        <img src="https://res.cloudinary.com/diwycpzwa/image/upload/v1691740929/PassportGlobal/passport.png" alt="" className="inline-block" />
        <div className="text-black text-center absolute" style={{ left: '0', right: '0', top: '160px' }}>Issued on 11/08/2023</div>
        <div className="text-white text-sm text-center absolute" style={{ left: '0', right: '0', bottom: '30px' }}>
          <div>Kartik Talwar</div>
          <div>Passport Global</div>
          <div>ID: 738992</div>
        </div>
      </div>
      <div className="mt-10">
        <button className="btn bg-black text-white border-purple-500 border-4 w-48">Request a Stamp</button>
      </div>
      {/* TODO */}
      <div className="hidden mt-5">
        <button className="btn bg-black text-white border-green-500 border-4 w-48">Grant a Stamp</button>
      </div>
    </div>
  );

}