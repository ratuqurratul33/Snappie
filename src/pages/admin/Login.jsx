import { useNavigate } from "react-router-dom";
import tvLeft from "../../assets/tv/left.png";
import tvRight from "../../assets/tv/right.png";
import bgLogin from "../../assets/tv/bg-LoginAdmin.png"; // ✅ FIX PATH

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/admin/frame");
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgLogin})` }} // ✅ FIXED Background
    >
      <div className="scale-[0.75] md:scale-[0.9] lg:scale-[1] transition-all duration-300 flex justify-center items-center">
        
        {/* BACKGROUND HITAM FRAME */}
        <div
          className="
            relative w-[1440px] h-[1024px]
            bg-[#1C1C1C] rounded-[80px]
            flex justify-center items-center
            overflow-visible shadow-2xl
          "
        >

          {/* TV KIRI */}
          <img
            src={tvLeft}
            alt="tv-left"
            className="
              absolute bottom-[400px] left-[150px]
              w-[330px] rotate-[-14deg]
              drop-shadow-[0_18px_32px_rgba(0,0,0,0.45)]
              z-[10]
            "
          />

          {/* TV KANAN */}
          <img
            src={tvRight}
            alt="tv-right"
            className="
              absolute bottom-[210px] right-[30px]
              w-[550px] rotate-[6deg]
              drop-shadow-[0_18px_32px_rgba(0,0,0,0.45)]
              z-[50]
            "
          />

          {/* CARD LOGIN */}
          <form
            onSubmit={handleLogin}
            className="
              relative w-[800px] h-[620px]
              bg-white rounded-[35px]
              border-[4px] border-black
              flex flex-col items-center
            "
          >

            {/* HEADER PINK */}
            <div
              className="
                w-full h-[150px]
                bg-[#F9ADB0] rounded-t-[30px]
                border-b-[4px] border-black
                flex flex-col items-center justify-center
              "
            >
              <h1 className="font-pixel text-[72px] text-[#FFE97F] drop-shadow-[4px_4px_0px_#000]">
                SNAPPIE
              </h1>
              <p className="font-pixel text-black text-[20px]">
                Login Admin
              </p>
            </div>

            {/* FORM */}
            <div
              className="
                w-[760px] h-[415px]
                bg-[#FFE98A] mt-[10px]
                rounded-[25px] border-[3px] border-black
                flex flex-col items-center justify-center gap-8
              "
            >
              <input
                type="text"
                placeholder="NAMA AKUN"
                className="
                  w-[435px] h-[68px]
                  rounded-full border-[3px] border-black
                  text-center font-pixel text-[20px]
                  bg-white
                "
                required
              />

              <input
                type="password"
                placeholder="PASSWORD"
                className="
                  w-[435px] h-[68px]
                  rounded-full border-[3px] border-black
                  text-center font-pixel text-[20px]
                  bg-white
                "
                required
              />

              <button
                type="submit"
                className="
                  w-[394px] h-[62px]
                  rounded-full border-[3px] border-black
                  font-pixel text-[22px]
                  bg-[#A7DA70]
                  shadow-[0_5px_0_#000]
                  hover:brightness-95 active:translate-y-[2px]
                "
              >
                MASUK
              </button>

            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
