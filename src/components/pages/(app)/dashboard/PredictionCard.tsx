"use client";

export const PredictionCard = () => {
  return (
    <div
      className="rounded-4xl p-6 relative overflow-hidden h-185 w-100"
      style={{
        backgroundImage: "url('/assets/main/background/eth-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0"></div>

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-start justify-between mb-8">
          <h3 className="text-xl font-medium text-black/80">
            Prediction Market
          </h3>
        </div>

        <div className="flex-1 flex items-center justify-center mb-12"></div>
        {/* <div className="bg-white/15 backdrop-blur-lg rounded-3xl border border-white/20 p-8 space-y-6 -mx-2"> */}
        {/* <div className="space-y-2">
            <h4 className="text-2xl font-medium text-slate-800">Create your prediction</h4>
            <p className="text-sm text-gray-600 font-medium">Create your prediction with your friends group</p>
          </div> */}

        <button className="mb-4 cursor-pointer w-full bg-black text-slate-800 py-4 rounded-full font-medium hover:bg-white/35 transition-all duration-300 flex items-center justify-center gap-3">
          <span className="font-medium text-xl text-white">
            Explore Markets
          </span>
          <div className="bg-white/10 text-white rounded-full p-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>
        {/* </div> */}
      </div>
    </div>
  );
};
