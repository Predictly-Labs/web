"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@/providers/WalletProvider";
import { useAuth } from "@/hooks/useAuth";
import Sidebar from "../../../ui/Sidebar";
import { OnboardingForm } from "./OnboardingForm";
import { DashboardHeader } from "./sections/DashboardHeader";
import { DashboardGrid } from "./sections/DashboardGrid";
import { LoadingState } from "./sections/LoadingState";
import { ConnectWalletState } from "./sections/ConnectWalletState";

export const Dashboard = () => {
  const { connected, address, connect, disconnect } = useWallet();
  const { user, login, logout, isLoading, error, isAuthenticated, getProfile, initializeAuth, token, getSignMessage } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  const handleConnectWallet = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  const handleOnboardingSubmit = async (data: { signature: string; publicKey: string }) => {
    if (!address) return;
    
    try {
      const { message } = await getSignMessage(address);
      console.log('Dashboard - Data received:', data);
      console.log('Dashboard - Message:', message);
      
      await login({
        walletAddress: address,
        signature: data.signature,
        publicKey: data.publicKey,
        message: message
      });
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  const handleLogout = () => {
    logout();
    disconnect();
  };

  useEffect(() => {
    const init = async () => {
      await initializeAuth();
      setIsInitialized(true);
    };
    init();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
  }, [isInitialized, connected, address, isAuthenticated, user, token]);

  useEffect(() => {
    if (isAuthenticated && token && !user) {
      getProfile();
    }
  }, [isAuthenticated, token, user, getProfile]);

  useEffect(() => {
    if (isAuthenticated && token) {
      const interval = setInterval(() => {
        if (!user) {
          getProfile();
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, token, user, getProfile]);

  if (!isInitialized) {
    return <LoadingState message="Loading..." />;
  }

  if (isAuthenticated && token && !user) {
    return <LoadingState message="Loading profile..." />;
  }

  if (isAuthenticated && user && token && user.displayName) {
    return (
      <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
        <Sidebar />
        <div className="max-w-7xl mx-auto relative z-10">
          <DashboardHeader 
            user={user} 
            address={address} 
            onLogout={handleLogout} 
            isAuthenticated={isAuthenticated} 
          />
          <DashboardGrid />
        </div>
      </div>
    );
  }

  if (connected && address && !isAuthenticated && !user && !token) {
    return (
      <OnboardingForm
        walletAddress={address}
        onSubmit={handleOnboardingSubmit}
        onDisconnect={() => {
          disconnect();
        }}
        isLoading={isLoading}
        error={error}
      />
    );
  }

  if (!connected) {
    return (
      <ConnectWalletState 
        onConnect={handleConnectWallet} 
        isLoading={isLoading} 
        error={error} 
      />
    );
  }

  return (
    <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      <Sidebar />
      <div className="max-w-7xl mx-auto relative z-10">
        <DashboardHeader 
          user={user} 
          address={address} 
          onLogout={handleLogout} 
          isAuthenticated={isAuthenticated} 
        />
        <DashboardGrid />
      </div>
    </div>
  );
};