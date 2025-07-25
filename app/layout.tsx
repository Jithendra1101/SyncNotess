import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SyncNotes",
  description: "Notetaking app with real-time collaboration, AI features, and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Header />
  

      <div className="flex min-h-screen">
  {/* Sidebar */}
  <div className="bg-gray-100 p-4">
    <Sidebar />
  </div>

  {/* Main Content */}
  <div className="flex-1 p-6 overflow-y-auto">
    {children}
  </div>
</div>


      </body>
    </html>
    </ClerkProvider>
  );
}
