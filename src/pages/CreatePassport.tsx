import React from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function CreatePassportPage() {

  return (
    <>
      <div className="w-full  bg-indigo-950 flex justify-center"
        style={{ height: "100vh" }}>

        <div className="grid grid-flow-row auto-rows-min">
          <div className="row mt-10 mb-5">
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          </div>
          <div className="row my-5">
            <div className="flex justify-center">
              <h2 className="" style={{ color: "#a9def9", fontSize: "35px" }}>Create Passport</h2>
            </div>
          </div>

          <div className="">
            <div className="max-w-md w-full bg-blue-900 p-6 rounded-xl shadow-md border border-gray-300">
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">Name</label>
                  <input type="text" id="name" name="name" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
                </div>

                <div className="mb-4">
                  <label htmlFor="profile-picture" className="block text-sm font-medium text-white mb-2">Profile Picture</label>
                  <input type="file" id="profile-picture" name="profile-picture" required className="text-sm font-medium text-indigo-600 hover:text-indigo-500" />
                </div>

              </form>
            </div>
          </div>

          <div className="row my-10">
            <div className="flex justify-center">
              <button className="px-10 py-3" style={{ borderRadius: "15px", backgroundColor: "yellow", fontSize: "20px", fontWeight: "bold" }}>Create Passport</button>
            </div>
          </div>
        </div>


      </div>
    </>
  );

}