import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAccount } from 'wagmi';
import { usePassportGlobalGetPassport, usePassportGlobalGetPassportId, usePassportGlobalHasPassport } from '../generated';

export function PassportPage() {
  const account = useAccount();
  const navigate = useNavigate();
  const { data: hasPassport, isLoading: hasPassportLoading } = usePassportGlobalHasPassport({
    args: [account.address!],
  });
  const { data: passport, isLoading: passportLoading } = usePassportGlobalGetPassport({
    args: [account.address!],
  });
  const { data: passportId, isLoading: passportIdLoading } = usePassportGlobalGetPassportId({
    args: [account.address!],
  });
  useEffect(() => {
    if (!hasPassportLoading && !hasPassport) {
      navigate("/create-passport");
    }
  }, [hasPassportLoading, hasPassport]);
  if (!hasPassportLoading) {
    if (!passportLoading) {
      const [name, timestamp, /* bio */] = passport;
      const dateStr = new Date(Number(timestamp) * 1000).toLocaleDateString();
      return (
        <div className="text-center">
          <div className="relative max-w-92 mx-auto">
            <img src="https://res.cloudinary.com/diwycpzwa/image/upload/v1691740929/PassportGlobal/passport.png" alt="" className="inline-block" />
            <div className="text-black text-center absolute" style={{ left: '0', right: '0', top: '150px' }}>Issued on {dateStr}</div>
            <div className="text-white text-center absolute" style={{ left: '0', right: '0', bottom: '33px' }}>
              <div>{name}</div>
              <div>ID: {Number(passportId)}</div>
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
  }
  return <div>Loading...</div>;
}