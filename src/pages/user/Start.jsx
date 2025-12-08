import { useState } from "react";
import { useNavigate } from "react-router-dom";

import HeaderImage from "../../components/user/HeaderImage";
import SelectDelay from "../../components/user/SelectDelay";
import SelectPhotoMode from "../../components/user/SelectPhotoMode";
import StartButton from "../../components/user/StartButton";

export default function Start() {
  const navigate = useNavigate();

  const [delay, setDelay] = useState(3);       // default 3 detik
  const [photoMode, setPhotoMode] = useState(4); // default 4 photos (number)

  const handleStart = () => {
    navigate("take-photo", {    
      state: {
        delay: delay,           
        photoMode: photoMode,   
      },
    });
  };

  return (
    <div className="min-h-screen h-fit w-full bg-[#3298E0] flex flex-col items-center overflow-x-hidden relative">

      {/* HEADER */}
      <div className="w-full relative z-10">
        <HeaderImage />
      </div>

      {/* REVIEW CARD */}
      <div
        className="
          w-[800px]
          bg-white
          rounded-[32px]
          border-[4px]
          border-black
          shadow-2xl
          overflow-hidden
          relative
          z-20
          -mt-[700px]
        "
      >

        {/* REVIEW BAR */}
        <div
          className="
            bg-[#F9ADB0]
            px-6 py-3
            border-b-[4px] border-black
            rounded-t-[28px]
            relative
            -mt-[4px]
          "
        >
          <h2 className="font-press text-xl tracking-wide">REVIEW</h2>
        </div>

        {/* YELLOW AREA */}
        <div
          className="
            bg-[#FFE97F]
            mx-6 mt-6 mb-10
            rounded-3xl
            border-[4px] border-black
            h-[350px]
            relative overflow-hidden
          "
        >

          {/* STRIP FRAME */}
          <div className="absolute top-6 left-1/2 -translate-x-[150px] rotate-[10deg]">
            <div className="bg-white w-[120px] h-[300px] border-[10px] border-blue-500 rounded-lg shadow-xl overflow-hidden">
              <div className="grid grid-rows-4 gap-3 p-3 h-full">
                <div className="bg-gray-200 rounded"></div>
                <div className="bg-gray-200 rounded"></div>
                <div className="bg-gray-200 rounded"></div>
                <div className="bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>

          {/* POLAROID FRAME */}
          <div className="absolute bottom-6 left-1/2 translate-x-[50px] -rotate-[8deg]">
            <div className="bg-white w-[150px] h-[190px] border-[10px] border-gray-500 rounded-lg shadow-xl">
              <div className="grid grid-cols-2 grid-rows-2 gap-3 p-3 h-full">
                <div className="bg-gray-200 rounded"></div>
                <div className="bg-gray-200 rounded"></div>
                <div className="bg-gray-200 rounded"></div>
                <div className="bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-6 pb-8">
          <SelectDelay onChange={setDelay} />
          <StartButton onClick={handleStart} />
          <SelectPhotoMode onChange={setPhotoMode} />
        </div>
      </div>
    </div>
  );
}
