import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/providers/WalletProvider";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

if (typeof window !== 'undefined') {
  require("@/utils/suppressWalletErrors");
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Predictly",
  description: "Prediction markets for you and your friends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <WalletProvider>
            <AuthProvider>
              {children}
              <Toaster richColors position="bottom-right" />
            </AuthProvider>
          </WalletProvider>
      </body>
    </html>
  );
}
