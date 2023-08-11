import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { usePassportGlobalGetPassport, usePassportGlobalHasPassport } from '../generated';

export function PassportPage() {
  const navigate = useNavigate();
  const hasPassport = usePassportGlobalHasPassport();
  const passport = usePassportGlobalGetPassport();
  useEffect(() => {
    if (hasPassport.isFetched && !hasPassport.data) {
      navigate("/create-passport");
    }
  }, [hasPassport.isFetched, hasPassport.data]);
  if (hasPassport.isFetched && hasPassport.data && passport.isFetched) {
    const [name, timestamp, /* bio */] = passport.data;
    const dateStr = new Date(Number(timestamp) * 1000).toLocaleDateString();
    return (
      <div className="text-center">
        <div className="relative max-w-92 mx-auto">
          <img src="https://res.cloudinary.com/diwycpzwa/image/upload/v1691740929/PassportGlobal/passport.png" alt="" className="inline-block" />
          <div className="text-black text-center absolute" style={{ left: '0', right: '0', top: '150px' }}>Issued on {dateStr}</div>
          <div className="text-white text-center absolute" style={{ left: '0', right: '0', bottom: '33px' }}>
            <div>{name}</div>
            <div>ID: xxxxxxxx</div>
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
  return <div>Loading...</div>;
}