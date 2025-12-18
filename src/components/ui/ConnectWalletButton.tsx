'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Wallet } from 'lucide-react';

interface ConnectWalletButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showIcon?: boolean;
}

export function ConnectWalletButton({
  variant = 'primary',
  size = 'md',
  className = '',
  showIcon = true,
}: ConnectWalletButtonProps) {
  const { login, isLoading, isAuthenticated, user } = useAuth();

  const baseStyles = 'font-medium rounded-full transition-all duration-200 flex items-center justify-center gap-2';
  
  const variantStyles = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-white text-black hover:bg-gray-100 border border-gray-200',
    outline: 'bg-transparent text-black border border-black hover:bg-black hover:text-white',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  // If authenticated, show truncated address
  if (isAuthenticated && user) {
    const displayText = user.displayName || 
      (user.walletAddress ? `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}` : 'Connected');
    
    return (
      <div className={`${baseStyles} ${variantStyles.secondary} ${sizeStyles[size]} ${className}`}>
        {showIcon && <Wallet className="w-4 h-4" />}
        <span>{displayText}</span>
      </div>
    );
  }

  return (
    <button
      onClick={() => login()}
      disabled={isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Connecting...</span>
        </>
      ) : (
        <>
          {showIcon && <Wallet className="w-4 h-4" />}
          <span>Connect Wallet</span>
        </>
      )}
    </button>
  );
}
