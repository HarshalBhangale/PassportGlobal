import React from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function LandingPage() {

  return (
    <>
      <div className="flex flex-row mb-10">
        <div className="basis-2/3 text-right pt-5">
          <h1 className="text-2xl font-bold mb-2">Travel, Collect and Play <span className="text-green-500">with stamps</span> On <span className="text-purple-500">PassportGlobal</span></h1>
          <div className="inline-block max-w-prose">
            Embrace new adventures, collect unique stamps from every destination,
            and share your travel tales with the world.<br/>
            Your journey, your story. 🌏🎨📲</div>
        </div>
        <div className="basis-1/3 pl-5">
          <img src="https://res.cloudinary.com/diwycpzwa/image/upload/v1691732562/PassportGlobal/landing-hero-stamp.png" alt="Old-fashioned post stamp" />
        </div>
      </div>
      <div className="h-150px flex items-center justify-center mb-10">
        <div className="flex">
          <ConnectButton />
        </div>
      </div>
      <div className="flex flex-row mb-10">
        <div className="basis-1/3 text-right">
          <img src="https://res.cloudinary.com/diwycpzwa/image/upload/v1691734418/PassportGlobal/landing-info-1.png" alt="" className="inline-block" />
        </div>
        <div className="basis-2/3 pl-5">
          <div className="inline-block max-w-prose">🛫 Travel the WorldExplore <span className="text-green-500">hidden gems</span> and renowned landmarks. Every <span className="text-purple-500">journey has a story</span>, and every story starts with a step.</div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="basis-2/3 text-right ">
          <div className="inline-block max-w-prose">🎨 Collect <span className="text-green-500">Unique Stamps</span> From quaint towns to bustling cities, gather stamps that symbolize your experiences and the <span className="text-purple-500">memories you've crafted</span>.</div>
        </div>
        <div className="basis-1/3 pl-5">
          <img src="https://res.cloudinary.com/diwycpzwa/image/upload/v1691734794/PassportGlobal/landing-info-2.png" alt="" className="inline-block" />
        </div>
      </div>
    </>
  );

}