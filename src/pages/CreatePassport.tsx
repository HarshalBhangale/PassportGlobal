import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useWaitForTransaction } from 'wagmi';
import { ProcessingMessage } from '../components/ProcessingMessage';
import { usePassportGlobalCreatePassport, usePreparePassportGlobalCreatePassport } from '../generated';

export function CreatePassportPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const { config } = usePreparePassportGlobalCreatePassport({
    args: [name, bio],
  });
  const { data, write: createPassport, isLoading: isCreating } = usePassportGlobalCreatePassport({
    ...config,
    // onSuccess: () => {},
  });
  const { isLoading: isWaiting } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => navigate('/'),
  });
  console.log(isCreating, isWaiting);
  if (isWaiting) {
    return <ProcessingMessage hash={data?.hash} />;
  }
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="grid grid-flow-row auto-rows-min">
          <div className="row my-5">
            <div className="flex justify-center">
              <h2 className="text-2xl">Create a Passport</h2>
            </div>
          </div>
          <div>
            <div className="max-w-md w-full p-6">
              <form>
                <div className="form-control mb-4">
                  <input type="text" placeholder="Name…" value={name} required className="input" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-control mb-4">
                  <textarea placeholder="A few words about you…" value={bio} required className="textarea" onChange={(e) => setBio(e.target.value)}></textarea>
                </div>
                <div className="form-control mb-4">
                  <label htmlFor="profile-picture" className="label">Profile Picture</label>
                  <input type="file" required className="file-input" />
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="text-center mb-4">
              {isCreating && <div><ProcessingMessage hash={data?.hash} /></div>}
              <div>
                Gas fee: <span>{config.request?.gas?.toString() ?? 'N/A'}</span>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="btn bg-yellow-500 text-black" disabled={ isCreating || !config.request} onClick={createPassport}>Create Passport</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}