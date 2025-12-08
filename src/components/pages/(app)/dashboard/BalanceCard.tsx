"use client";

export const BalanceCard = () => {
  return (
    <div 
      className="rounded-2xl p-6 text-white h-80 relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/main/background/4.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      
      <div className="relative z-10">
        <div className="absolute top-4 right-4">
          <div className="text-lg font-bold drop-shadow-lg">VISA</div>
        </div>

        <div className="absolute bottom-0 right-0 opacity-20">
          <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
          </svg>
        </div>

        <div className="h-full flex flex-col">
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-4 opacity-90 drop-shadow-lg">Virtual cards</h3>
          
            <div>
              <div className="text-sm opacity-75 mb-1">Total Balance</div>
              <div className="text-3xl font-bold mb-1 drop-shadow-lg">$6,010.29</div>
              <div className="text-sm opacity-75">+4.21% last week</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-white/30 backdrop-blur-sm rounded-lg p-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm opacity-75">Online</div>
                  <div className="font-semibold">72%</div>
                </div>
                <div className="w-12 h-2 bg-white/30 rounded-full overflow-hidden">
                  <div className="w-9 h-full bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="bg-white/30 backdrop-blur-sm rounded-lg p-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm opacity-75">Partner</div>
                  <div className="font-semibold">28%</div>
                </div>
                <div className="w-12 h-2 bg-white/30 rounded-full overflow-hidden">
                  <div className="w-3 h-full bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs opacity-75 mt-4">
            <span>•••• 4852</span>
            <span>09/28</span>
          </div>
        </div>
      </div>
    </div>
  );
};