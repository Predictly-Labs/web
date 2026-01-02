export const GroupsHeader = () => {
  return (
    <div className="mb-4">
      <div className="relative mb-6">
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            backgroundImage: "url('/assets/main/background/bg-main.png')",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative z-10 flex items-center justify-center gap-4 p-2">
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-medium text-pink-900">
                    Groups
                  </h1>
                </div>
              </div>
              <p className="text-sm sm:text-base lg:text-md text-gray-500 text-center mt-1">
                Join groups and participate in their prediction markets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};