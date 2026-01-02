export const SubscriptionsHeader = () => {
  return (
    <div className="mb-8">
      <div className="relative mb-6">
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            backgroundImage: "url('/assets/main/background/bg-main.png')",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative z-10 flex items-center justify-center gap-4 p-6">
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-medium text-pink-900">
                  Subscription Plans
                </h1>
              </div>
              <p className="text-sm sm:text-base lg:text-md text-gray-500 text-center max-w-2xl">
                Unlock advanced features and expand your prediction market
                capabilities with our flexible pricing plans
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}