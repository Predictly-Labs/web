'use client';

import { PrivyProvider as PrivyAuthProvider } from '@privy-io/react-auth';

interface Props {
  children: React.ReactNode;
}

const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
const isPrivyEnabled = PRIVY_APP_ID && PRIVY_APP_ID !== 'your_privy_app_id_here' && PRIVY_APP_ID.length > 10;

export function PrivyProvider({ children }: Props) {
  // Skip Privy if no valid App ID is configured
  if (!isPrivyEnabled) {
    console.warn('[Privy] No valid App ID configured. Running in demo mode without Privy auth.');
    return <>{children}</>;
  }

  return (
    <PrivyAuthProvider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ['wallet', 'email'],
        appearance: {
          theme: 'dark',
          accentColor: '#6366f1',
          logo: '/assets/logo.png',
        },
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'users-without-wallets',
          },
        },
      }}
    >
      {children}
    </PrivyAuthProvider>
  );
}
